import { useState, useEffect } from "react";

const AppStaff = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    document.title = "SmartCampus | Personnel";
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Stocker l'état de connexion dans le stockage local
        localStorage.setItem("isLoggedIn", true);
        location.reload();
      } else {
        setUsername("");
        setPassword("");
        setError("Identifiant ou mot de passe incorrect");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      setError("Une erreur s'est produite lors de la connexion");
    }
  };

  const handleLogout = () => {
    // Supprimer l'état de connexion du stockage local
    localStorage.removeItem("isLoggedIn");
  };

  if (isLoggedIn) {
    return (
      <div className="flex justify-center pt-10 text-xl">
        <div>
          <h1>Bienvenue sur la page du staff</h1>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center mt-40">
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-xs"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>
          <div className="mb-8">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Nom d'utilisateur:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-8">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Mot de passe:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Se connecter
            </button>
            {error && (
              <div className="text-red-500 text-sm text-center pl-4">
                {error}
              </div>
            )}
          </div>
        </form>
      </div>
    );
  }
};

export default AppStaff;
