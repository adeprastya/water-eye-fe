import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate } from "react-router";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
	console.log("__AuthContextProvider Running...");
	const [auth, setAuth] = useLocalStorage("watereye-auth");
	const navigate = useNavigate();

	const signIn = (authData) => {
		setAuth(authData);
		navigate("/");
	};

	const signOut = () => {
		setAuth(null);
		navigate("/signin");
	};

	return <AuthContext.Provider value={{ auth, signIn, signOut }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	return useContext(AuthContext);
}
