import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export function useFetch(method, url, { headers = {}, data = {} } = {}) {
	const [loading, setLoading] = useState(true);
	const [result, setResult] = useState(null);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		console.log("__useFetch Running...");

		axios({
			method,
			url: import.meta.env.VITE_API_URL + url,
			headers,
			data
		})
			.then((res) => {
				setResult(res.data);
			})
			.catch((err) => {
				if (err.response.status === 401) {
					navigate("/signin");
				}
				setError(err.response ? err.response.data : err.message);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [method, url]);

	return { result, loading, error };
}

export const axiosFetch = async (method, url, { headers = {}, data = {} } = {}) => {
	const result = {
		result: null,
		error: null
	};

	try {
		console.log("__axiosFetch Running...");

		const res = await axios({
			method,
			url: import.meta.env.VITE_API_URL + url,
			headers,
			data
		});
		result.result = res.data;
	} catch (error) {
		result.error = error.response ? error.response.data : error.message;

		if (error.response.status === 401) {
			window.location.href = "/signin";
		}
	}
	return result;
};
	