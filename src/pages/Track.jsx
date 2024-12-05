import { useNavigate } from "react-router";
import Navbar from "../components/shared/Navbar";
import { useAuth } from "../contexts/useAuth";
import { useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { Card } from "flowbite-react";
import { timeToString } from "../utils/timeConvert";

export default function Track() {
	const { auth } = useAuth();
	const navigate = useNavigate();
	const { loading, result, error } = useFetch("GET", `/user/${auth?.id}/track`, {
		headers: { Authorization: auth?.token }
	});

	useEffect(() => {
		if (auth == null || auth == "undefined") {
			navigate("/signin");
		}

		if (error) {
			alert(error.message);

			if (error.status === 401) {
				navigate("/signin");
			}
		}
	}, [error, auth]);

	return (
		<>
			<Navbar />

			{loading && <div>Loading...</div>}
			{error && <div>Error: {error}</div>}

			{result && (
				<section className="w-full sm:w-8/12 min-h-dvh mx-auto px-4 py-8 mb-24 flex flex-col gap-8 text-gray-700">
					<h1 className="text-3xl font-bold">Track</h1>

					{result.data && Array.isArray(result.data) && result.data.map((scan, i) => <TrackCard key={i} data={scan} />)}
				</section>
			)}
		</>
	);
}

export function TrackCard({ data }) {
	return (
		<Card className="w-full cursor-pointer">
			<h5 className="text-2xl font-bold tracking-tight">{data.name}</h5>

			<div className="mt-10">
				<p className="font-semibold text-xs text-gray-500">{timeToString(data.createdAt)}</p>

				<p className="text-xs text-gray-500">{data.id}</p>
			</div>
		</Card>
	);
}
