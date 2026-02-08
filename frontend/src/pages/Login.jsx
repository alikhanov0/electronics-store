import { Link } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const submit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const res = await api.post("/auth/login", data);
    localStorage.setItem("token", res.data.token);
    window.location.href = "/products";
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <form
        onSubmit={submit}
        className="bg-white p-6 rounded-lg shadow w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Login</h2>

        <input name="email" placeholder="Email" className="border p-2 w-full" />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
        />

        <button className="bg-black text-white py-2 rounded hover:bg-gray-800 transition">
          Login
        </button>

        <p className="text-center text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
