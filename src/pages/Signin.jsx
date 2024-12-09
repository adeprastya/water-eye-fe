import { useState } from "react";
import { Link } from "react-router";
import { axiosFetch } from "../hooks/useFetch";
import { useAuth } from "../contexts/useAuth";
import { Button, Label, TextInput, Card } from "flowbite-react";
import logo from "../assets/images/logo.png";
import Bg from "../components/shared/Bg";

export default function Signin() {
	const { signIn } = useAuth();
	const [form, setForm] = useState({
		email: "",
		password: ""
	});

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { result, error } = await axiosFetch("POST", "/auth/signin", {
			headers: { "Content-Type": "application/json" },
			data: form
		});

		if (error) {
			alert(error.message);
		}

		if (result) {
			alert(result.message);

			signIn(result.data);
		}
	};

	return (
		<section className="relative w-full min-h-dvh flex flex-col items-center justify-center gap-8 bg-slate-100 text-slate-700">
			<Bg />

			<Card className="relative w-full max-w-md flex p-4 z-0">
				{/* Logo */}
				<div className="mb-8 flex items-center justify-center gap-2 sm:gap-4">
					<img className="size-6 sm:size-8" src={logo} alt="logo" />

					<h1 className="text-xl sm:text-2xl font-bold text-slate-600 tracking-tight">Water Eye</h1>
				</div>

				<h1 className="mb-4 text-2xl sm:text-3xl font-bold">Login to your account</h1>

				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<div>
						<div className="mb-2 block">
							<Label htmlFor="email" value="Email" />
						</div>
						<TextInput
							onChange={handleChange}
							id="email"
							name="email"
							type="email"
							placeholder="example@mail.com"
							required
						/>
					</div>

					<div>
						<div className="mb-2 block">
							<Label htmlFor="password" value="Password" />
						</div>
						<TextInput
							onChange={handleChange}
							id="password"
							name="password"
							type="password"
							placeholder="••••••"
							required
						/>
					</div>

					<Button type="submit" className="mt-4 bg-primary-500">
						Submit
					</Button>

					<p className="text-sm">
						Dont have an account?{" "}
						<Link to="/signup" className="text-primary-600 underline">
							Register here
						</Link>
					</p>
				</form>
			</Card>
		</section>
	);
}
