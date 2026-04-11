import { useState } from "react";
import { useNavigate } from "react-router";
import { Lock, User, KeyRound, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { login } from "../utils/auth";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload on enter
    if (login(username, password)) {
      navigate("/startJourney"); // ✅ Redirects to your module hub!
    } else {
      setError("Invalid credentials (hint: admin / admin123)");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md p-8 bg-white border border-gray-100 shadow-xl rounded-2xl"
      >
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-blue-100 rounded-full text-blue-600">
            <Lock className="size-8" />
          </div>
        </div>

        <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Username Input */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <User className="size-5" />
              </div>
              <input
                type="text"
                placeholder="Enter admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <KeyRound className="size-5" />
              </div>
              <input
                type="password"
                placeholder="Enter admin123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-3 text-sm text-red-700 bg-red-50 rounded-lg"
            >
              <AlertCircle className="size-4 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 mt-4 text-white font-semibold bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md transition-colors"
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};