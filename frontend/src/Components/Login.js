import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Utlis.js/UserContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useUser();

  const url = "http://localhost:8080/api/auth/login"

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter both username and password.");
    } else {
      
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
      }).then((resp)=>{
        if(resp.status === 200){
          resp.json().then(data=>{
            login(data.token)
            navigate('/dashboard')
          })
          
          return;
        }
        resp.json().then(data=>setError(data['message']))

      })
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    setDefaultLoginDetails();
  }, []);

  const setDefaultLoginDetails = () => {
    if (!localStorage.getItem("userDetails")) {
      const userDetails = { username: "Lokesh", password: "Lokesh" };
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
    }
  };

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    if (error) setError(""); // Reset error when user starts typing
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/premium-photo/ppt-cover-science-technology-black-background-generative-ai_802140-79.jpg')",
      }}
    >
      <div className="bg-black bg-opacity-50 p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-3xl text-white font-semibold text-center mb-6">
          Login to Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-white text-lg font-medium mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleChange(setUsername)}
              placeholder="Enter username"
              className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-white text-lg font-medium mb-2"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={handleChange(setPassword)}
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-3 cursor-pointer text-white"
            >
              {showPassword ? (
                <i className="fa fa-eye-slash" aria-hidden="true"></i>
              ) : (
                <i className="fa fa-eye" aria-hidden="true"></i>
              )}
            </span>
          </div>
          <p className="text-red-500">{error}</p>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-orange-400 text-white text-lg font-semibold hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-600"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
