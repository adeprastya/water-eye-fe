import { AuthContextProvider } from "./useAuth";

export default function ContextProvider({ children }) {
	return <AuthContextProvider>{children}</AuthContextProvider>;
}
