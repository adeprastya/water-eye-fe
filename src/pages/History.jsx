import NavigationBar from "../components/shared/NavigationBar";
import { useFetch } from "../hooks/useFetch";
import { useAuth } from "../contexts/useAuth";
import { Card } from "flowbite-react";
import { timeToString } from "../utils/timeConvert";
import { Modal } from "flowbite-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function History() {
	const navigate = useNavigate();
	const { auth } = useAuth();
	const { loading, result, error } = useFetch("GET", `/user/${auth?.id}/scans`, {
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
			<NavigationBar />

			<section className="w-full min-h-dvh flex flex-col justify-start items-center bg-slate-100 text-slate-700">
				<div className="w-full px-4 py-2 sm:p-20 sm:py-4 lg:px-40 lg:py-6 flex flex-col gap-6">
					<h1 className="block w-full text-4xl font-bold">History</h1>

					{loading && <div>Loading...</div>}

					{error && <div>Error: {error}</div>}

					{result &&
						result.data &&
						Array.isArray(result.data) &&
						result.data.map((scan, i) => <ScanCard key={i} data={scan} />)}
				</div>
			</section>
		</>
	);
}

export function ScanCard({ data }) {
	const [openModal, setOpenModal] = useState(false);

	return (
		<>
			{/* Toggle */}
			<Card
				onClick={() => setOpenModal(true)}
				className={`${data.result.color != "not-water" && "cursor-pointer"} w-full`}
				imgSrc={data.image}
				horizontal
			>
				<div>
					<h6 className="font-semibold text-2xl">{data.result.color}</h6>

					<p className="font-semibold text-lg">{data.result.confidence}</p>
				</div>

				<p className="font-semibold text-xs text-gray-500">{timeToString(data.createdAt)}</p>

				<p className="text-xs text-gray-500">{data.id}</p>
			</Card>

			{/* Modal */}
			{data.result.color != "not-water" && (
				<Modal show={openModal} onClose={() => setOpenModal(false)}>
					<Modal.Header>
						<p className="text-3xl">{data.result.color}</p>
						<p>{data.result.confidence}</p>

						<div className="flex gap-4 mt-4">
							<p
								className={`px-4 py-1 rounded-full text-sm leading-relaxed ${
									data.result.label.consume ? "bg-green-300" : "bg-red-300"
								}`}
							>
								consume
							</p>
							<p
								className={`px-4 py-1 rounded-full text-sm leading-relaxed ${
									data.result.label.bath ? "bg-green-300" : "bg-red-300"
								}`}
							>
								bath
							</p>
							<p
								className={`px-4 py-1 rounded-full text-sm leading-relaxed ${
									data.result.label.wash ? "bg-green-300" : "bg-red-300"
								}`}
							>
								wash
							</p>
							<p
								className={`px-4 py-1 rounded-full text-sm leading-relaxed ${
									data.result.label.irrigation ? "bg-green-300" : "bg-red-300"
								}`}
							>
								irrigation
							</p>
						</div>
					</Modal.Header>

					<Modal.Body>
						<div className="space-y-6">
							<div>
								<p className="font-semibold">Analysis</p>
								<p className="leading-relaxed text-gray-600">{data.result.analysis}</p>
							</div>

							<div>
								<p className="font-semibold">Recommendation</p>
								<p className="leading-relaxed text-gray-600">{data.result.recommendation}</p>
							</div>

							<div>
								<p className="font-semibold">References</p>
								{Array.isArray(data.result.reference) &&
									data.result.reference.map((ref, i) => (
										<a key={i} href={ref} className="text-blue-600">
											{ref}
										</a>
									))}
							</div>
						</div>
					</Modal.Body>

					<Modal.Footer></Modal.Footer>
				</Modal>
			)}
		</>
	);
}
