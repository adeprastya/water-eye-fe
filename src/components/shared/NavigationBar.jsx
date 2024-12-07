import { HomeIcon, EyeOpenIcon, CounterClockwiseClockIcon, LayersIcon } from "@radix-ui/react-icons";
import { Link } from "react-router";
import { Navbar, Button } from "flowbite-react";
import logo from "../../assets/images/logo.png";
import { useAuth } from "../../contexts/useAuth";

export default function NavigationBar() {
	const { signOut } = useAuth();

	return (
		<Navbar fluid rounded className="shadow fixed top-0 right-0 left-0 z-50">
			<Navbar.Brand className="gap-3">
				<img className="size-6 sm:size-8" src={logo} alt="logo" />

				<h1 className="text-xl sm:text-2xl font-bold text-slate-600 tracking-tight">Water Eye</h1>
			</Navbar.Brand>

			<Navbar.Toggle />

			<Navbar.Collapse>
				<Link
					to="/"
					className="p-2 rounded-md inline-flex items-center gap-2 group font-normal text-base hover:bg-primary-100"
				>
					<HomeIcon className="size-5 opacity-60" />
					Home
				</Link>

				<Link
					to="/scan"
					className="p-2 rounded-md inline-flex items-center gap-2 group font-normal text-base hover:bg-primary-100"
				>
					<EyeOpenIcon className="size-5 opacity-60" />
					Scan
				</Link>

				<Link
					to="/history"
					className="p-2 rounded-md inline-flex items-center gap-2 group font-normal text-base hover:bg-primary-100"
				>
					<CounterClockwiseClockIcon className="size-5 opacity-60" />
					History
				</Link>

				<Link
					to="/track"
					className="p-2 rounded-md inline-flex items-center gap-2 group font-normal text-base hover:bg-primary-100"
				>
					<LayersIcon className="size-5 opacity-60" />
					Track
				</Link>

				{/* Sign Out Button */}
				<Button onClick={signOut} outline color="failure">
					Sign Out
				</Button>
			</Navbar.Collapse>
		</Navbar>
	);
}
