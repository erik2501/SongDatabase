import { useParams } from "react-router-dom";
import SongDetails from './SongDetails';
import { useNavigate } from 'react-router-dom';


const SongPage = () => { // {songID}: {songID: number}

    const { songID } = useParams<string>();
	
	const songIDInt = parseInt(songID ?? "");
	
	const nav = useNavigate()

	if (isNaN(songIDInt)) {
		return (
			<div>
				<button onClick={() => nav('/')}>Back to songsearch</button>
				<h1>It seems the url has been altered.<br></br>Make sure what comes after '/song/' is a number.</h1>
			</div>
			
		)
	}

	return (
		<div className="songPage">
			<button onClick={() => nav('/')}>Back to songsearch</button>
			<SongDetails songID={songIDInt} />
		</div>
	)
}

export default SongPage;