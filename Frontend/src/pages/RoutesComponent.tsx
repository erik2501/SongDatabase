import { Routes as ReactRouterRoutes, Route } from "react-router-dom";
import RootLayout from "./RootLayout";
import HomePage from "../pages/HomePage";
import SongPage from '../components/SongPage';

const RoutesComponent = () => (
	<ReactRouterRoutes>
		<Route path="/" element={<RootLayout />}>
			<Route index element={<HomePage />} />
			<Route path="/song/:songID" element={<SongPage />} />
			<Route path="*" element={<h1>Path not resolved</h1>} />
		</Route>
	</ReactRouterRoutes>
)

export default RoutesComponent;