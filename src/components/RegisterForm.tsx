import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        fullName,
        email,
        password,
      });
      console.log(response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration error", error);
      alert("Error registering");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded-md hover:scale-[1.02] transition ease-in-out duration-500 delay-10 transition"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded-md hover:scale-[1.02] transition ease-in-out duration-500 delay-10 transition"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded-md hover:scale-[1.02] transition ease-in-out duration-500 delay-10 transition"
      />
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded-md bg-[#94d8df]/80 hover:bg-[#94d8df] hover:scale-[1.02] transition ease-in-out duration-500 delay-10 transition"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
