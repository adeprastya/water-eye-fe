import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { axiosFetch } from "../hooks/useFetch";
import { useAuth } from "../contexts/useAuth";

export default function Signin() {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		email: "",
		password: ""
	});
	const { setAuth } = useAuth();

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { result, error, loading } = await axiosFetch("POST", "/auth/signin", {
			headers: { "Content-Type": "application/json" },
			data: form
		});

		if (error) {
			alert(error.message);
		}

		if (result) {
			alert(result.message);
			setAuth(result.data);
			navigate("/");
		}
	};

	return (
		<section className="bg-gray-50 dark:bg-gray-900">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
					<img
						className="w-8 h-8 mr-2"
						src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
						alt="logo"
					/>
					WATER EYE
				</a>

				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Create an account
						</h1>

						<form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
							<div>
								<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Your email
								</label>
								<input
									onChange={handleChange}
									type="email"
									name="email"
									id="email"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="johndoe@example.com"
									required=""
								/>
							</div>

							<div>
								<label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Password
								</label>
								<input
									onChange={handleChange}
									type="password"
									name="password"
									id="password"
									placeholder="••••••••"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									required=""
								/>
							</div>

							<button
								type="submit"
								className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
							>
								Login
							</button>

							<p className="text-sm font-light text-gray-500 dark:text-gray-400">
								Dont have an account?{" "}
								<Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
									Register here
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
