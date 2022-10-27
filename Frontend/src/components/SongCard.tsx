import { Song } from '../helpers/types';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';

const SongCard = ({song}: {song: Song}) => {

    const nav = useNavigate();

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down(730))
    return(
        <a className='songCardContainer' onClick={() => nav('/song/' + song.songID)}>
            <div className='songCard'>
                <img className='albumcoverImage' src={song.imageURL}></img>
                <div className='textbox'>
                    {!matches ? 
                       <h2>{song.songName}</h2> : <p className='smallh2'>{song.songName}</p>
                }
                    <p>{'Artist: ' + song.artistName}</p>
                </div>
            </div>
        </a>
    )
}

export default SongCard;