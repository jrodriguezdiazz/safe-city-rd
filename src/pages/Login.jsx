import { useState } from "react";
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: call your auth service
    // on success:
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
      <div className="absolute inset-0 bg-[url('/assets/grid-bg.png')] bg-cover opacity-30" />
      <div className="relative z-10 w-full max-w-sm">
        <div className="text-center mb-8">
          <img src="/assets/logo-blue.png" alt="SafeCity RD" className="mx-auto mb-4 h-12" />
          <h1 className="text-2xl font-semibold">Inicia sesión en tu cuenta</h1>
          <p className="text-sm mt-2">
            No tienes una cuenta?{" "}
            <Link to="/register" className="text-blue-400 hover:underline">
              Regístrate
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl shadow-lg p-6 space-y-4">
          <div className="flex items-center bg-gray-700 rounded-lg px-3 py-2">
            <FiMail className="text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-transparent flex-1 text-white placeholder-gray-500 outline-none"
            />
          </div>

          <div className="flex items-center bg-gray-700 rounded-lg px-3 py-2">
            <FiLock className="text-gray-400 mr-2" />
            <input
              type={showPwd ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-transparent flex-1 text-white placeholder-gray-500 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPwd(!showPwd)}
              className="text-gray-400 ml-2 focus:outline-none"
            >
              {showPwd ? <FiEye /> : <FiEyeOff />}
            </button>
          </div>

          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-gray-400 hover:underline">
              Olvidaste tu contraseña?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-medium transition"
          >
            Inicia Sesión
          </button>
        </form>
      </div>
    </div>
  );
}
