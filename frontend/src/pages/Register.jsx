import api from "../api/axios";

export default function Register() {
  const submit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    await api.post("/auth/register", data);
    window.location.href = "/login";
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <form
        onSubmit={submit}
        className="bg-white p-6 rounded-lg shadow w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Register</h2>

        <input
          name="username"
          placeholder="Username"
          className="border p-2 w-full"
        />

        <input name="email" placeholder="Email" className="border p-2 w-full" />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
        />

        <button className="bg-black text-white py-2 rounded hover:bg-gray-800 transition">
          Create account
        </button>
      </form>
    </div>
  );
}
