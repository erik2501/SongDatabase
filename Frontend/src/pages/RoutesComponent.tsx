import { Routes as ReactRouterRoutes, Route } from "react-router-dom";
import RootLayout from "./RootLayout";
import HomePage from "../pages/HomePage";
import SongPage from './SongPage';
import ErrorPage from "./ErrorPage";
// this page routes all the component to the right url
const RoutesComponent = () => (
	<ReactRouterRoutes>
		<Route path="/" element={<RootLayout />}>
			<Route index element={<HomePage />} />
			<Route path="/song/:songID" element={<SongPage />} />
			<Route path="*" element={<ErrorPage message='This url does not exist.'/>} />
		</Route>
	</ReactRouterRoutes>
)

export default RoutesComponent;