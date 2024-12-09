import Bg from "./Bg";

export default function MainContainer({ children }) {
	return (
		<section className="relative w-full min-h-dvh bg-slate-100 text-slate-700 px-4 py-24 sm:px-20 lg:px-72">
			<Bg />
			{children}
		</section>
	);
}
