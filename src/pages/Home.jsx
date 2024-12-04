import Navbar from "../components/shared/Navbar";
import { useFetch } from "../hooks/useFetch";
import { useAuth } from "../contexts/useAuth";

export default function Home() {
	const { auth } = useAuth();
	const { loading, result, error } = useFetch("GET", `/user/${auth.id}`, {
		headers: { Authorization: auth.token }
	});

	return (
		<>
			<Navbar />

			{loading && <div>Loading...</div>}
			{error && <div>Error: {error}</div>}

			{result &&
				Object.keys(result.data).map((key) => {
					if (typeof result.data[key] === "object") {
						return <p key={key}>{key + ": " + JSON.stringify(result.data[key])}</p>;
					}

					return <p key={key}>{key + ": " + result.data[key]}</p>;
				})}
		</>
	);
}
