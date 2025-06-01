import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });

      const { user_id, name } = response.data;

      // Store user data locally (can also use context or redux)
      localStorage.setItem("user_id", user_id);
      localStorage.setItem("name", name);
      // Inside handleSubmit
      setLoading(true);
      // Example: storing user ID after login
      localStorage.setItem("userId", response.data.user_id); // Adjust based on your response structure

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error", error);
      // after success or error
      setLoading(false);
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded-md hover:scale-[1.02] transition ease-in-out duration-500 delay-10"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded-md hover:scale-[1.02] transition ease-in-out duration-500 delay-10"
      />
      <button
        type="submit"
        className="w-full bg-[#94d8df]/80 hover:bg-[#94d8df] hover:scale-[1.02] transition ease-in-out duration-500 delay-10 text-white py-2 rounded-md transition"
      >
        Login!
      </button>
    </form>
  );
};

export default LoginForm;
