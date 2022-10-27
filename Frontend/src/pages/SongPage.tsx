import { useParams } from "react-router-dom";
import SongDetails from '../components/SongDetails';
import { useNavigate } from 'react-router-dom';
import ErrorPage from "./ErrorPage";


const SongPage = () => {

    const { songID } = useParams<string>();
	
	const songIDInt = parseInt(songID ?? "");
	
	const nav = useNavigate()

	if (isNaN(songIDInt)) {
		return (
			<div>
				<ErrorPage message="It seems the url has been altered. Make sure what comes after '/song/' is a number."/>
			</div>
		)
	}

	return (
		<div className="flexColCenterCenter">
			<a onClick={() => nav('/')}><button>Back to songsearch</button></a>
			<SongDetails songID={songIDInt} />
		</div>
	)
}

export default SongPage;