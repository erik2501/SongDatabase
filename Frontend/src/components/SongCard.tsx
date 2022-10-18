import { Song } from '../helpers/types';
import { useNavigate } from 'react-router-dom';

const SongCard = ({song}: {song: Song}) => {


    const nav = useNavigate();
    const updateNav = () => {
        nav('/song/' + song.songID);
    };


    return(
        <div>
            <button className='songCard' onClick={() => updateNav()}>
                <p>{'Song: ' + song.songName}</p>
                <p>{'Artist: ' + song.artistName}</p>
            </button>
        </div>
        
    )
}

export default SongCard;