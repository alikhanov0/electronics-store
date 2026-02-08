import { useCurrency } from "../context/CurrencyContext";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { currency, rate } = useCurrency();

  const price =
    currency === "USD" ? product.price : Math.ceil(product.price * rate);

  const remove = async () => {
    if (!confirm("Delete this product?")) return;
    await api.delete(`/products/${product._id}`);
    window.location.reload();
  };

  return (
    <div className="bg-white rounded shadow">
      <img
        src={product.imageUrl || "https://via.placeholder.com/300"}
        className="h-40 w-full object-contain"
      />

      <div className="p-4">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-lg font-bold mt-2">
          {price} {currency}
        </p>

        <div className="flex gap-2 mt-4">
          <Link
            to={`/edit-product/${product._id}`}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Edit
          </Link>
          <button
            onClick={remove}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
