import { Song } from '../helpers/types';
import { useNavigate } from 'react-router-dom';

const SongCard = ({song}: {song: Song}) => {

    const nav = useNavigate();

    return(
        <div className='songCardContainer'>
            <button className='songCard' onClick={() => nav('/song/' + song.songID)}>
                <p>{'Song: ' + song.songName}</p>
                <p>{'Artist: ' + song.artistName}</p>
            </button>
        </div>
    )
}

export default SongCard;