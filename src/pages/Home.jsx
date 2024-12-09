import NavigationBar from "../components/shared/NavigationBar";
import { useFetch, axiosFetch } from "../hooks/useFetch";
import { useAuth } from "../contexts/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button, Badge, Modal, TextInput } from "flowbite-react";
import logo from "../assets/images/logo.png";
import MainContainer from "../components/shared/MainContainer";
import DeleteModal from "../components/shared/DeleteModal";

export default function Home() {
	const navigate = useNavigate();
	const { auth } = useAuth();
	const { loading, result, error } = useFetch("GET", `/user/${auth?.id}`, {
		headers: { Authorization: auth?.token }
	});
	const [delModal, setDelModal] = useState(false);
	const [editModal, setEditModal] = useState(false);

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

	const handleDelete = async () => {
		const { result, error } = await axiosFetch("DELETE", `/user/${auth?.id}`, {
			headers: { Authorization: auth?.token }
		});

		if (error) {
			alert(error.message);
		}

		if (result) {
			alert(result.message);
			navigate("/signin");
		}
	};

	const handleUpdate = async (form) => {
		const { result, error } = await axiosFetch("PATCH", `/user/${auth?.id}`, {
			headers: { Authorization: auth?.token, "Content-Type": "application/json" },
			data: form
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

			<MainContainer>
				<div className="relative z-0 space-y-6">
					<h1 className="block w-full text-4xl font-bold">Home</h1>

					{loading && <div>Loading...</div>}

					{error && <div>Error: {error}</div>}

					{result && (
						<div className=" grid gap-6 sm:gap-x-4 grid-cols-1 sm:grid-cols-2">
							{/* User Card */}
							<div className="sm:col-span-2 w-full p-6 border-2 border-primary-500 rounded-md shadow-md flex flex-col gap-6 bg-slate-50">
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
										{result.data.isPremium ? "Unlimited" : 10 - result.data.dailyScanHits}
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

							{/* Options Card */}
							<div className="w-full p-6 rounded-md shadow-md flex flex-col gap-6 bg-slate-200">
								<h3 className="text-xl font-semibold">Options</h3>

								<Button onClick={() => setEditModal(true)} color="blue" className="bg-primary-500">
									RENAME
								</Button>

								<Button onClick={() => setDelModal(true)} color="failure" className="bg-red-500">
									DELETE
								</Button>

								<DeleteModal
									data={result.data.name}
									openModal={delModal}
									setOpenModal={setDelModal}
									handleFn={handleDelete}
								/>

								<UpdateModal
									data={result.data.name}
									openModal={editModal}
									setOpenModal={setEditModal}
									handleFn={handleUpdate}
								/>
							</div>
						</div>
					)}
				</div>
			</MainContainer>
		</>
	);
}

function UpdateModal({ data, openModal, setOpenModal, handleFn }) {
	const [form, setForm] = useState({ name: data });

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	return (
		<Modal onClick={(e) => e.stopPropagation()} show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
			<Modal.Header />

			<Modal.Body>
				<h3 className="text-lg text-center">Change and Save</h3>

				<div className="my-4 w-full flex gap-2">
					<TextInput
						onChange={handleChange}
						id="name"
						name="name"
						type="text"
						value={form.name}
						required
						className="w-full"
					/>

					<Button onClick={() => handleFn(form)} className="w-fit bg-primary-500">
						Save
					</Button>
				</div>
			</Modal.Body>
		</Modal>
	);
}
