import { useEffect, useState } from "react";
import axios from "axios";

export function useFetch(method, url, { headers = {}, data = {} } = {}) {
	const [loading, setLoading] = useState(true);
	const [result, setResult] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		let isMounted = true;

		const fetchData = async () => {
			setLoading(true);
			try {
				const res = await axios({
					method,
					url: import.meta.env.VITE_API_URL + url,
					headers,
					data
				});

				if (isMounted) {
					setResult(res.data);
					setError(null);
				}
			} catch (err) {
				if (isMounted) {
					setError(err.response ? err.response.data : err.message);
				}
			} finally {
				if (isMounted) {
					setLoading(false);
				}
			}
		};

		fetchData();

		return () => {
			isMounted = false;
		};
	}, [method, url, headers, data]);

	return { result, loading, error };
}

export const axiosFetch = async (method, url, { headers = {}, data = {} } = {}) => {
	const result = {
		loading: true,
		result: null,
		error: null
	};

	try {
		const res = await axios({
			method,
			url: import.meta.env.VITE_API_URL + url,
			headers,
			data
		});
		result.result = res.data;
	} catch (error) {
		result.error = error.response ? error.response.data : error.message;
	} finally {
		result.loading = false;
	}

	return result;
};
