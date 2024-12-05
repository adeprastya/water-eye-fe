import Navbar from "../components/shared/Navbar";
import { useFetch } from "../hooks/useFetch";
import { useAuth } from "../contexts/useAuth";
import { Card } from "flowbite-react";
import { timeToString } from "../utils/timeConvert";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";

export default function History() {
	const { auth } = useAuth();
	const { loading, result, error } = useFetch("GET", `/user/${auth.id}/scans`, {
		headers: { Authorization: auth.token }
	});

	return (
		<>
			<Navbar />

			{loading && <div>Loading...</div>}
			{error && <div>Error: {error}</div>}

			{result && (
				<section className="w-full sm:w-8/12 min-h-dvh mx-auto px-4 py-8 mb-24 flex flex-col gap-8 text-gray-700">
					{result.data &&
						Array.isArray(result.data) &&
						result.data.map((scan, i) => <ScanCard key={i} scan={scan} i={i} />)}
				</section>
			)}
		</>
	);
}

export function ScanCard({ scan, i }) {
	const [openModal, setOpenModal] = useState(false);

	return (
		<>
			{/* Toggle */}
			<Card key={i} onClick={() => setOpenModal(true)} className="max-w-sm" imgSrc={scan.image} horizontal>
				<div>
					<h6 className="font-semibold text-2xl">{scan.result.color}</h6>

					<p className="font-semibold text-lg">{scan.result.confidence}</p>
				</div>

				<p className="font-semibold text-xs text-gray-500">{timeToString(scan.createdAt)}</p>

				<p className="text-xs text-gray-500">{scan.id}</p>
			</Card>

			{/* Modal */}
			<Modal show={openModal} onClose={() => setOpenModal(false)}>
				<Modal.Header>
					<p className="text-3xl">{scan.result.color}</p>
					<p>{scan.result.confidence}</p>

					<div className="flex gap-4 mt-4">
						<p
							className={`px-4 py-1 rounded-full text-sm leading-relaxed ${
								scan.result.label.consume ? "bg-green-300" : "bg-red-300"
							}`}
						>
							consume
						</p>
						<p
							className={`px-4 py-1 rounded-full text-sm leading-relaxed ${
								scan.result.label.bath ? "bg-green-300" : "bg-red-300"
							}`}
						>
							bath
						</p>
						<p
							className={`px-4 py-1 rounded-full text-sm leading-relaxed ${
								scan.result.label.wash ? "bg-green-300" : "bg-red-300"
							}`}
						>
							wash
						</p>
						<p
							className={`px-4 py-1 rounded-full text-sm leading-relaxed ${
								scan.result.label.irrigation ? "bg-green-300" : "bg-red-300"
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
							<p className="leading-relaxed text-gray-600">{scan.result.analysis}</p>
						</div>

						<div>
							<p className="font-semibold">Recommendation</p>
							<p className="leading-relaxed text-gray-600">{scan.result.recommendation}</p>
						</div>

						<div>
							<p className="font-semibold">References</p>
							{Array.isArray(scan.result.reference) &&
								scan.result.reference.map((ref, i) => (
									<a key={i} href={ref} className="text-blue-600">
										{ref}
									</a>
								))}
						</div>
					</div>
				</Modal.Body>

				<Modal.Footer></Modal.Footer>
			</Modal>
		</>
	);
}
