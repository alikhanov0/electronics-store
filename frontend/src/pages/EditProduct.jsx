import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function EditProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api.get("/products").then((res) => {
      const found = res.data.find((p) => p._id === id);
      setProduct(found);
    });
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    data.price = Number(data.price);

    await api.put(`/products/${id}`, data);
    window.location.href = "/products";
  };

  if (!product) return <p className="mt-20 text-center">Loading...</p>;

  return (
    <div className="flex justify-center mt-20">
      <form
        onSubmit={submit}
        className="bg-white p-6 rounded-lg shadow w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold">Edit Product</h2>

        <input
          name="name"
          defaultValue={product.name}
          className="border p-2 w-full"
        />
        <input
          name="category"
          defaultValue={product.category}
          className="border p-2 w-full"
        />
        <input
          name="price"
          defaultValue={product.price}
          className="border p-2 w-full"
        />
        <input
          name="imageUrl"
          defaultValue={product.imageUrl}
          className="border p-2 w-full"
        />

        <textarea
          name="description"
          defaultValue={product.description}
          className="border p-2 w-full"
        />

        <button className="bg-black text-white py-2 rounded hover:bg-gray-800 transition">
          Save changes
        </button>
      </form>
    </div>
  );
}
