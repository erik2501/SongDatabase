import { useParams } from "react-router-dom";
import SongDetails from '../components/SongDetails';
import { useNavigate } from 'react-router-dom';
import ErrorPage from "./ErrorPage";

// this page displays all the specific information about a song
const SongPage = () => {

	// Bruker url-parameteret til å hente songID
	const { songID } = useParams<string>();

	const songIDInt = parseInt(songID ?? "");

	const nav = useNavigate()

	if (isNaN(songIDInt)) {
		return (
			<div>
				<ErrorPage message="It seems the url has been altered. Make sure what comes after '/song/' is a number." />
			</div>
		)
	}

	return (
		<div className="flexColCenterCenter">
			<a onClick={() => nav('/')}><button data-testid="backtosearch">Back to songsearch</button></a>
			<SongDetails songID={songIDInt} />
		</div>
	)
}

export default SongPage;