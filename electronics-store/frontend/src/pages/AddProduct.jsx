import api from "../api/axios";
import { useState } from "react";
import { getKztToUsdRate } from "../services/currencyService";

export default function AddProduct() {
  const [currency, setCurrency] = useState("USD");

  const submit = async (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target));
    let price = Number(formData.price);

    if (currency === "KZT") {
      try {
        const rate = await getKztToUsdRate();
        price = Math.ceil(price * rate);
      } catch (e) {
        alert("Currency service unavailable");
        return;
      }
    }

    await api.post("/products", {
      name: formData.name,
      category: formData.category,
      imageUrl: formData.imageUrl,
      description: formData.description,
      price,
    });

    window.location.href = "/products";
  };

  return (
    <div className="flex justify-center mt-20">
      <form
        className="bg-white p-6 rounded shadow w-96 space-y-4"
        onSubmit={submit}
      >
        <h2 className="text-xl font-bold">Add Product</h2>

        <input name="name" placeholder="Name" className="border p-2 w-full" />
        <input
          name="category"
          placeholder="Category"
          className="border p-2 w-full"
        />
        <input
          name="imageUrl"
          placeholder="Image URL"
          className="border p-2 w-full"
        />

        <input name="price" placeholder="Price" className="border p-2 w-full" />

        <div className="flex gap-4">
          <label>
            <input
              type="radio"
              checked={currency === "USD"}
              onChange={() => setCurrency("USD")}
            />{" "}
            USD
          </label>

          <label>
            <input
              type="radio"
              checked={currency === "KZT"}
              onChange={() => setCurrency("KZT")}
            />{" "}
            KZT
          </label>
        </div>
        <textarea
          name="description"
          placeholder="Description"
          className="border p-2 w-full"
        />

        <button className="bg-black text-white py-2 w-full">Add product</button>
      </form>
    </div>
  );
}
