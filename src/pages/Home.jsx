import Navbar from "../components/shared/Navbar";
import { useFetch, axiosFetch } from "../hooks/useFetch";
import { useAuth } from "../contexts/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Home() {
	const navigate = useNavigate();
	const { auth, signOut } = useAuth();
	const { loading, result, error } = useFetch("GET", `/user/${auth?.id}`, {
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

	const handlePremium = async () => {
		const { result, error } = await axiosFetch("PATCH", `/user/${auth?.id}/upgrade`, {
			headers: { Authorization: auth?.token }
		});

		if (error) {
			alert(error.message);
		}

		if (result) {
			alert(result.message);
			window.location.reload();
		}
	};

	return (
		<>
			<Navbar />

			{loading && <div>Loading...</div>}
			{error && <div>Error: {error}</div>}

			{result && (
				<section className="w-full sm:w-8/12 min-h-dvh mx-auto px-4 py-8 pb-24 flex flex-col gap-8 text-gray-700">
					<h1 className="text-3xl font-bold">Home</h1>

					<div className="min-h-64 p-6 rounded-md flex flex-col gap-6 bg-blue-200">
						<div className="flex justify-between">
							<img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" className="w-20" />

							<p className="font-semibold text-base">
								Remaining scan: {result.data.isPremium ? "Unlimited" : 20 - result.data.dailyScanHits}
							</p>
						</div>

						<div className="">
							<h1 className="font-semibold text-2xl">{result.data.name}</h1>

							<p className="text-base text-gray-600">{result.data.email}</p>
						</div>

						<p className="text-lg">{result.data.isPremium ? "Premium Tier" : "Free Tier"}</p>
					</div>

					<button
						onClick={handlePremium}
						className="min-h-40 p-6 rounded-md bg-gradient-to-br from-cyan-300 via-blue-400 to-purple-400 text-xl flex items-center justify-center"
					>
						<p className="font-semibold text-2xl">Get Premium Now</p>
					</button>

					<button
						onClick={signOut}
						type="button"
						className="self-start mt-auto text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center"
					>
						Logout
						<svg
							className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 14 10"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M1 5h12m0 0L9 1m4 4L9 9"
							/>
						</svg>
					</button>
				</section>
			)}
		</>
	);
}
