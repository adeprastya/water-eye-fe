import NavigationBar from "../components/shared/NavigationBar";
import MainContainer from "../components/shared/MainContainer";
import ScanResultCard from "../components/shared/ScanResultCard";
import { UploadSvg } from "./Scan";
import { ScanCard } from "./History";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { FileInput, Label, Button } from "flowbite-react";
import { useAuth } from "../contexts/useAuth";
import { useFetch, axiosFetch } from "../hooks/useFetch";
import logo from "../assets/images/logo.png";

export default function SubTrack() {
	const { id } = useParams();
	const { auth } = useAuth();
	const navigate = useNavigate();
	const { loading, result, error } = useFetch("GET", `/user/${auth?.id}/track/${id}`, {
		headers: { Authorization: auth?.token }
	});
	const {
		loading: parentLoading,
		result: parentResult,
		error: parentError
	} = useFetch("GET", `/user/${auth?.id}/track`, {
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

		if (parentError) {
			alert(parentError.message);

			if (parentError.status === 401) {
				navigate("/signin");
			}
		}
	}, [error, auth]);

	const [parent, setParent] = useState();
	useEffect(() => {
		if (parentResult && parentResult.data) {
			setParent(parentResult.data.find((track) => track.id == id));
		}
	}, [id, parentResult]);

	return (
		<>
			<NavigationBar />

			<MainContainer>
				{loading && parentLoading && <div>Loading...</div>}

				{error && parentError && <div>Error: {`${error}, ${parentError}`}</div>}

				{result && (
					<div className="relative z-0 space-y-6">
						{parent && <h1 className="text-3xl font-bold">Track {parent.name}</h1>}

						<p>Upload your water image to see the result</p>

						<TrackScan id={id} />

						<h2 className="pt-10 text-2xl font-semibold">Result Track:</h2>

						<div className="flex flex-wrap justify-center md:justify-start gap-6">
							{Array.isArray(result.data) && result.data.length > 0 ? (
								result.data
									.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
									.map((scan) => <ScanCard key={scan.id} data={scan} />)
							) : (
								<h6 className="text-lg font-semibold">Track history still empty</h6>
							)}
						</div>
					</div>
				)}
			</MainContainer>
		</>
	);
}

export function TrackScan({ id }) {
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

		const { result, error } = await axiosFetch("POST", `/user/${auth.id}/track/${id}`, {
			headers: { Authorization: auth.token, "Content-Type": "multipart/form-data" },
			data: formData
		});

		if (error) {
			setError(error);
		}

		setResult(result);
	};

	return (
		<div className="flex flex-col gap-8">
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
			<Button onClick={handleUpload} className="text-white bg-primary-500 disabled:opacity-60" disabled={!selectedFile}>
				Scan Image
			</Button>

			{result && <ScanResultCard data={result.data} />}
		</div>
	);
}
