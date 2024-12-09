import NavigationBar from "../components/shared/NavigationBar";
import { useFetch } from "../hooks/useFetch";
import { useAuth } from "../contexts/useAuth";
import { Card } from "flowbite-react";
import { timeToString } from "../utils/timeConvert";
import { Modal } from "flowbite-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import ScanResultCard from "../components/shared/ScanResultCard";
import MainContainer from "../components/shared/MainContainer";

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

			<MainContainer>
				<div className="relative z-0 space-y-6">
					<h1 className="block w-full text-4xl font-bold">History</h1>

					{loading && <div>Loading...</div>}

					{error && <div>Error: {error}</div>}

					<div className="flex flex-wrap justify-center md:justify-start gap-6">
						{result && Array.isArray(result.data) && result.data.length > 0 ? (
							result.data.map((scan, i) => <ScanCard key={i} data={scan} />)
						) : (
							<h2 className="block w-full text-2xl font-semibold">
								Your history is empty, start scanning to see Your history
							</h2>
						)}
					</div>
				</div>
			</MainContainer>
		</>
	);
}

export function ScanCard({ data }) {
	const [openModal, setOpenModal] = useState(false);

	return (
		<>
			{/* Main Card/Toggle */}
			<Card
				onClick={() => setOpenModal(true)}
				className="overflow-clip cursor-pointer w-72 sm:w-80 md:w-72"
				renderImage={() => (
					<img src={data.image} alt={data.id} className="w-full aspect-video object-cover" loading="lazy" />
				)}
			>
				<div>
					<h6 className="font-bold text-3xl tracking-wide">{data.result.color}</h6>

					<p className="text-lg">
						Confidence <span className="font-semibold">{data.result.confidence}</span>
					</p>
				</div>

				<p className="font-semibold text-sm text-gray-600">{timeToString(data.createdAt)}</p>

				<p className="text-sm text-gray-600 truncate">{data.id}</p>
			</Card>

			{/* Modal */}
			<Modal show={openModal} onClose={() => setOpenModal(false)}>
				<Modal.Header>{data.id.slice(0, 11) + "..."}</Modal.Header>

				<Modal.Body>
					<ScanResultCard data={data.result} />
				</Modal.Body>
			</Modal>
		</>
	);
}
