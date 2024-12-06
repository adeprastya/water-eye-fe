import NavigationBar from "../components/shared/NavigationBar";
import { useFetch, axiosFetch } from "../hooks/useFetch";
import { useAuth } from "../contexts/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Button, Badge } from "flowbite-react";
import logo from "../assets/images/logo.png";

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
			<NavigationBar />

			<section className="w-full min-h-dvh flex flex-col justify-start items-center bg-slate-100 text-slate-700">
				<div className="w-full px-4 py-2 sm:p-20 sm:py-4 lg:px-40 lg:py-6 flex flex-wrap gap-6">
					<h1 className="block w-full text-4xl font-bold">Home</h1>

					{loading && <div>Loading...</div>}

					{error && <div>Error: {error}</div>}

					{result && (
						<>
							{/* User Card */}
							<div className="w-full p-6 border-2 border-primary-500 rounded-md shadow-md flex flex-col gap-6 bg-slate-50">
								<div className="flex justify-between items-start">
									<img src={logo} alt="" className="w-20 rounded-full" />

									<Badge size="sm" color={result.data.isPremium ? "success" : "warning"}>
										{result.data.isPremium ? "PREMIUM" : "FREE"}
									</Badge>
								</div>

								<div className="">
									<h1 className="font-semibold text-2xl">{result.data.name}</h1>

									<p className="text-slate-600">{result.data.email}</p>
								</div>

								<p className="text-slate-600">
									Remaining scan:{" "}
									<span className="font-semibold text-slate-700">
										{result.data.isPremium ? "Unlimited" : 20 - result.data.dailyScanHits}
									</span>
								</p>
							</div>

							{/* Upgrade/Premium Button */}
							<Button
								onClick={handlePremium}
								className="w-full py-16 rounded-md shadow-md bg-gradient-to-br from-cyan-300 via-blue-400 to-purple-400 flex items-center justify-center"
							>
								<p className="font-semibold text-2xl tracking-wide">Get Premium Now !</p>
							</Button>

							{/* Sign Out Button */}
							<Button
								className="fixed bottom-4 left-0 mx-4 sm:mx-20 lg:mx-40 bg-red-500"
								onClick={signOut}
								color="failure"
							>
								Sign Out !
							</Button>
						</>
					)}
				</div>
			</section>
		</>
	);
}
