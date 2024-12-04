import { HomeIcon, EyeOpenIcon, CounterClockwiseClockIcon, LayersIcon } from "@radix-ui/react-icons";
import { Link } from "react-router";

export default function Navbar() {
	return (
		<div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
			<div className="grid h-full max-w-lg grid-cols-4 mx-auto">
				<Link
					to="/"
					className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
				>
					<HomeIcon className="h-full w-fit p-5" />
					<span className="sr-only">Home</span>
				</Link>

				<Link
					to="/scan"
					className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
				>
					<EyeOpenIcon className="h-full w-fit p-5" />
					<span className="sr-only">Home</span>
				</Link>

				<Link
					to="/history"
					className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
				>
					<CounterClockwiseClockIcon className="h-full w-fit p-5" />
					<span className="sr-only">Home</span>
				</Link>

				<Link
					to="/track"
					className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
				>
					<LayersIcon className="h-full w-fit p-5" />
					<span className="sr-only">Home</span>
				</Link>
			</div>
		</div>
	);
}
