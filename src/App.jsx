import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Scan from "./pages/Scan";
import History from "./pages/History";
import Track from "./pages/Track";

import { BrowserRouter, Routes, Route } from "react-router";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/signin" element={<Signin />} />
				<Route path="/signup" element={<Signup />} />

				<Route path="/" element={<Home />} />
				<Route path="/scan" element={<Scan />} />
				<Route path="/history" element={<History />} />
				<Route path="/track" element={<Track />} />
			</Routes>
		</BrowserRouter>
	);
}
