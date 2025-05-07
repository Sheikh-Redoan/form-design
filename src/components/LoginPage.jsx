import { useState } from "react";
import axios from "axios";


const LoginPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [apiEndpoint, setApiEndpoint] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!apiEndpoint) {
      alert("Please enter an API endpoint");
      return;
    }
    console.log("Sending to:", apiEndpoint);
    console.log("Payload:", { name, email });
    setIsLoading(true);
    try {
      await axios.post(
        apiEndpoint,
        {  name, email },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Data submitted successfully!");
    } catch (error) {
      console.error("Submission failed:", error);
      let errorMessage = "Server error";
      if (error.response) {
        // Server responded with status code 4xx/5xx
        errorMessage = error.response.data?.error || error.response.statusText;
      } else if (error.request) {
        // No response received
        errorMessage = "No response from server";
      }
      alert(`Error: ${errorMessage}`);
    }
    setIsLoading(false);
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center ${
        darkMode
          ? "bg-gradient-to-br from-[#670d10] to-[#092756]"
          : "bg-gradient-to-br from-blue-50 to-blue-100"
      }`}
    >
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 text-4xl cursor-pointer focus:outline-none"
      >
        {darkMode ? "🌞" : "🌙"}
      </button>

      <div className="container flex flex-col items-center justify-center min-h-screen p-4">
        <div className="login-header mb-8">
          <h1
            className={`text-3xl font-bold ${
              darkMode ? "text-[#217093]" : "text-gray-800"
            } text-center`}
          >
            User Data
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`w-full max-w-md p-8 rounded-lg shadow-xl ${
            darkMode ? "bg-gray-800/20" : "bg-white/90"
          }`}
        >
          <div className="inputGroup mb-6">
            <input
              type="text"
              id="name"
              placeholder="Name"
              required
              className={`w-full h-12 px-4 rounded border-2 ${
                darkMode
                  ? "bg-gray-700/30 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-200 text-gray-800 placeholder-gray-500"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="inputGroup mb-6">
            <input
              type="email"
              id="email"
              placeholder="Email"
              required
              className={`w-full h-12 px-4 rounded border-2 ${
                darkMode
                  ? "bg-gray-700/30 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-200 text-gray-800 placeholder-gray-500"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="inputGroup">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full h-12 rounded font-semibold transition-colors ${
                darkMode
                  ? "bg-[#217093] text-white hover:bg-[#1a5a7a]"
                  : "bg-[#4eb8dd] text-white hover:bg-[#3da4c7]"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>

        <div className="mt-8 w-full max-w-md">
          <input
            type="text"
            placeholder="API Endpoint"
            value={apiEndpoint}
            onChange={(e) => setApiEndpoint(e.target.value)}
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
