import NavigationBar from "../components/shared/NavigationBar";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../contexts/useAuth";
import { useEffect, useState } from "react";
import { useFetch, axiosFetch } from "../hooks/useFetch";
import { Card, Button } from "flowbite-react";
import { timeToString } from "../utils/timeConvert";
import MainContainer from "../components/shared/MainContainer";

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
			<NavigationBar />

			<MainContainer>
				<div className="flex flex-col gap-6">
					<h1 className="block w-full text-4xl font-bold">Track</h1>

					<TrackForm auth={auth} />

					{loading && <div>Loading...</div>}

					{error && <div>Error: {error}</div>}

					{result &&
						result.data &&
						Array.isArray(result.data) &&
						result.data.map((scan, i) => <TrackCard key={i} data={scan} />)}
				</div>
			</MainContainer>
		</>
	);
}

function TrackForm({ auth }) {
	const [name, setName] = useState({});

	const handleChange = (e) => {
		setName({ ...name, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { result, error } = await axiosFetch("POST", `/user/${auth?.id}/track`, {
			headers: {
				Authorization: auth?.token
			},
			data: name
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
		<Card className="w-full cursor-pointer">
			<form onSubmit={handleSubmit} className="w-full flex gap-2 justify-between">
				<input onChange={handleChange} name="name" type="text" className="w-full rounded-md" />

				<Button type="submit">Create</Button>
			</form>
		</Card>
	);
}

function TrackCard({ data }) {
	return (
		<Link to={`/track/${data.id}`}>
			<Card className="w-full cursor-pointer">
				<h5 className="text-3xl font-bold tracking-wide">{data.name}</h5>

				<div className="mt-10">
					<p className="font-semibold text-gray-600">{timeToString(data.createdAt)}</p>

					<p className="text-gray-600">{data.id}</p>
				</div>
			</Card>
		</Link>
	);
}
