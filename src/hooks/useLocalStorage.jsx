import { useState } from "react";

export function useLocalStorage(key, initialValue = null) {
	const [value, setValue] = useState(() => {
		const jsonValue = localStorage.getItem(key);

		if (jsonValue !== null && jsonValue !== "undefined") return JSON.parse(jsonValue);

		localStorage.setItem(key, JSON.stringify(initialValue));

		return initialValue;
	});

	const setStoredValue = (newValue) => {
		setValue(newValue);
		localStorage.setItem(key, JSON.stringify(newValue));
	};

	return [value, setStoredValue];
}
