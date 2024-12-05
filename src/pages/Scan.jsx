import { useState, useEffect } from "react";
import Navbar from "../components/shared/Navbar";
import { FileInput, Label } from "flowbite-react";
import { axiosFetch } from "../hooks/useFetch";
import { useAuth } from "../contexts/useAuth";
import { useNavigate } from "react-router";

export default function Scan() {
	const { auth } = useAuth();
	const navigate = useNavigate();
	const [selectedFile, setSelectedFile] = useState(null);
	const [previewImage, setPreviewImage] = useState(null);
	const [result, setResult] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!auth || auth === "undefined") {
			navigate("/signin");
		}

		if (error) {
			alert(error.message);

			if (error.status === 401) {
				navigate("/signin");
			}
		}
	}, [error, auth]);

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		setSelectedFile(file);

		// Generate image preview
		if (file) {
			setPreviewImage(URL.createObjectURL(file));
		} else {
			setPreviewImage(null);
		}

		setResult(null);
	};

	const handleUpload = async () => {
		if (!selectedFile) {
			alert("Please select a file first!");
			return;
		}

		const formData = new FormData();
		formData.append("image", selectedFile);

		const { result, error } = await axiosFetch("POST", `/user/${auth.id}/scans`, {
			headers: { Authorization: auth.token, "Content-Type": "multipart/form-data" },
			data: formData
		});

		if (error) {
			setError(error);
		}

		setResult(result);
	};

	return (
		<>
			<Navbar />

			<section className="w-full sm:w-8/12 min-h-dvh mx-auto px-4 py-8 pb-24 flex flex-col gap-8 text-gray-700">
				<h1 className="font-bold text-3xl">Scan</h1>
				<p>Upload your water image to get the result</p>

				<div className="flex w-full items-center justify-center">
					<Label
						htmlFor="dropzone-file"
						className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
					>
						<div className="flex flex-col items-center justify-center pb-6 pt-5">
							<svg
								className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 20 16"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
								/>
							</svg>
							<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
								<span className="font-semibold">Click to upload</span> or drag and drop
							</p>
							<p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or JPEG</p>
						</div>
						<FileInput id="dropzone-file" className="hidden" onChange={handleFileChange} />
					</Label>
				</div>

				{previewImage && (
					<div className="mt-4">
						<h2 className="font-bold text-lg">Selected Image:</h2>
						<img
							src={previewImage}
							alt="Selected Preview"
							className="mt-2 w-full rounded-lg border border-gray-300 shadow-md"
						/>
					</div>
				)}

				<button
					onClick={handleUpload}
					className="mt-4 w-full rounded-lg bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 disabled:opacity-50"
					disabled={!selectedFile}
				>
					Scan Image
				</button>

				{result && (
					<div className="mt-8 p-4 rounded-lg bg-gray-100 text-gray-700">
						<h2 className="font-bold text-lg">Result:</h2>
						<pre className="whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
					</div>
				)}
			</section>
		</>
	);
}
