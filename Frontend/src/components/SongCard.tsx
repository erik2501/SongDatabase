import { Song } from '../helpers/types';
import { useNavigate } from 'react-router-dom';

const SongCard = ({song}: {song: Song}) => {

    const nav = useNavigate();

    return(
        <a className='songCardContainer' onClick={() => nav('/song/' + song.songID)}>
            <div className='songCard'>
                <img className='albumcoverImage' src={song.imageURL}></img>
                <div className='textbox'>
                    <h2>{song.songName}</h2>
                    <p>{'Artist: ' + song.artistName}</p>
                </div>
            </div>
        </a>
    )
}

export default SongCard;