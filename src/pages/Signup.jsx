import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { axiosFetch } from "../hooks/useFetch";
import { Button, Label, TextInput, Card } from "flowbite-react";
import logo from "../assets/images/logo.png";
import Bg from "../components/shared/Bg";

export default function Signup() {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		name: "",
		email: "",
		password: ""
	});

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { result, error } = await axiosFetch("POST", "/auth/signup", {
			headers: { "Content-Type": "application/json" },
			data: form
		});

		if (error) {
			alert(error.message);
		}

		if (result) {
			alert(result.message);
			navigate("/signin");
		}
	};

	return (
		<section className="relative w-full min-h-dvh flex flex-col items-center justify-center gap-8 bg-slate-100 text-slate-700">
			<Bg />

			<Card className="relative z-0 w-full max-w-md flex p-4">
				{/* Logo */}
				<div className="mb-6 flex items-center justify-center gap-2 sm:gap-4">
					<img className="size-6 sm:size-8" src={logo} alt="logo" />

					<h1 className="text-xl sm:text-2xl font-bold text-slate-600 tracking-tight">Water Eye</h1>
				</div>

				<h1 className="mb-4 text-2xl sm:text-3xl font-bold">Create an account</h1>

				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<div>
						<div className="mb-2 block">
							<Label htmlFor="name" value="Name" />
						</div>
						<TextInput onChange={handleChange} id="name" name="name" type="text" placeholder="John Doe" required />
					</div>

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
						Create
					</Button>

					<p className="text-sm">
						Already have account?{" "}
						<Link to="/signin" className="text-primary-600 underline">
							Login here
						</Link>
					</p>
				</form>
			</Card>
		</section>
	);
}
