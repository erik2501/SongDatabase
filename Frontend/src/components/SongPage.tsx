import { useParams } from "react-router-dom";
import SongDetails from './SongDetails';


const SongPage = () => { // {songID}: {songID: number}

    const { songID } = useParams<"songID">();
	const songIDInt = parseInt(songID ?? "");

    if (isNaN(songIDInt)) {
		throw new Error("Missing parameter ID")
	}

	return <SongDetails songID={songIDInt} />
}

export default SongPage;