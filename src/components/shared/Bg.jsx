export default function Bg() {
	return (
		<div className="fixed w-screen h-full overflow-clip">
			<div className="fixed top-0 left-0 -translate-x-3/4 -translate-y-1/2  w-[80vw] aspect-square rounded-full bg-sky-500 opacity-35" />
			<div className="fixed top-0 left-0 -translate-x-1/2 -translate-y-3/4  w-[80vw] aspect-square rounded-full bg-cyan-500 opacity-35" />

			<div className="fixed bottom-0 right-0 translate-x-3/4 translate-y-1/2  w-[80vw] aspect-square rounded-full bg-sky-500 opacity-35" />
			<div className="fixed bottom-0 right-0 translate-x-1/2 translate-y-3/4  w-[80vw] aspect-square rounded-full bg-cyan-500 opacity-35" />
		</div>
	);
}
