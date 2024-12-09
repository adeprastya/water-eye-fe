import { useState, useEffect } from "react";
import NavigationBar from "../components/shared/NavigationBar";
import { FileInput, Label, Button } from "flowbite-react";
import { axiosFetch } from "../hooks/useFetch";
import { useAuth } from "../contexts/useAuth";
import { useNavigate } from "react-router";
import logo from "../assets/images/logo.png";
import ScanResultCard from "../components/shared/ScanResultCard";
import MainContainer from "../components/shared/MainContainer";

export default function Scan() {
	const { auth } = useAuth();
	const navigate = useNavigate();
	const [selectedFile, setSelectedFile] = useState(null);
	const [previewImage, setPreviewImage] = useState(null);
	const [result, setResult] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

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

		setLoading(true);

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

		setLoading(false);
	};

	return (
		<>
			<NavigationBar />

			<MainContainer>
				<div className="relative z-0 flex flex-col gap-6">
					<h1 className="block w-full text-4xl font-bold">Scan</h1>

					<p>Upload your water image to see the result</p>

					{/* File input/Dropzone container */}
					<div className="h-96 sm:h-64 grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-2 gap-10">
						{/* File input/Dropzone */}
						<Label
							htmlFor="dropzone-file"
							className="cursor-pointer flex flex-col items-center justify-center rounded-md border-2 border-dashed border-primary-500 bg-gray-50 hover:bg-primary-100"
						>
							<div className="flex flex-col items-center justify-center pb-6 pt-5">
								<UploadSvg />
								<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">Click or Drag and Drop here</p>
								<p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or JPEG</p>
							</div>
							<FileInput id="dropzone-file" className="hidden" onChange={handleFileChange} />
						</Label>

						{/* Image preview */}
						<img
							src={previewImage ? previewImage : logo}
							alt="Selected Image"
							className={`object-cover size-full max-h-64 rounded-md border-2 border-primary-400 bg-primary-100 ${
								previewImage ? "" : "opacity-20"
							}`}
						/>
					</div>

					{/* Scan button */}
					<Button
						onClick={handleUpload}
						className="text-white bg-primary-500 disabled:opacity-60"
						disabled={!selectedFile || loading}
					>
						Scan Image
					</Button>

					{error && <p className="text-red-500">{error.message}</p>}

					{result && <ScanResultCard data={result.data} />}
				</div>
			</MainContainer>
		</>
	);
}

export function UploadSvg() {
	return (
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
	);
}
