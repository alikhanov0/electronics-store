import Navbar from "./components/Navbar";
import AppRouter from "./router/AppRouter";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <AppRouter />
      </main>
    </div>
  );
}
