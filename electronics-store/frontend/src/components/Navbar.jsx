import { Link, useNavigate } from "react-router-dom";
import { useCurrency } from "../context/CurrencyContext";

export default function Navbar() {
  const { currency, setCurrency, loading } = useCurrency();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/products" className="text-xl font-bold">
          ElectroStore
        </Link>

        {token && (
          <div className="flex items-center gap-6 text-sm">
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

            {loading && <span className="text-gray-400">Loading rate…</span>}

            <Link to="/products">Products</Link>
            <Link to="/add-product">Add Product</Link>
            <Link to="/profile">Profile</Link>

            <button onClick={logout} className="bg-red-600 px-3 py-1 rounded">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
