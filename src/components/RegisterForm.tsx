import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/register", {
        name,
        email,
        password,
      });

      console.log("Registration successful:", response.data);

      localStorage.setItem("user_id", response.data.user_id);
      localStorage.setItem("name", name);
      // Example: storing user ID after login
      localStorage.setItem("userId", response.data.user_id); // Adjust based on your response structure

      navigate("/dashboard");
    } catch (error: any) {
      console.error("Registration error", error);

      if (error.response?.status === 422) {
        alert("Validation error. Please check your inputs.");
      } else {
        alert("Error registering. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded-md hover:scale-[1.02] transition ease-in-out duration-500"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded-md hover:scale-[1.02] transition ease-in-out duration-500"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded-md hover:scale-[1.02] transition ease-in-out duration-500"
      />
      <button
        type="submit"
        className="w-full bg-[#94d8df]/80 text-white py-2 rounded-md hover:bg-[#94d8df] hover:scale-[1.02] transition ease-in-out duration-500"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
