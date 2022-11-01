import { Song } from '../helpers/types';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import { useQuery } from '@apollo/client';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { GET_AVG_REVIEW_SCORE } from '../helpers/queries';


// this component shows a song on the homepage, it fetches the average score of a song to display this value
const SongCard = ({ song }: { song: Song }) => {

    const { data } = useQuery(GET_AVG_REVIEW_SCORE, { variables: { songID: song.songID } })

    const nav = useNavigate();

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down(730))
// this is to be able to move on the page with the tad, and enter button
    const onKeyUp = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
        if (e.key === "Enter") nav('/song/' + song.songID);
    }

    return (
        <a className='songCardContainer' onClick={() => nav('/song/' + song.songID)} onKeyUp={(e) => onKeyUp(e)}>
            <div className='songCard' tabIndex={0}>
                <img className='albumcoverImage' src={song.imageURL}></img>
                <div className='textbox'>
                    {!matches ?
                        <h2>{song.songName}</h2> : <p className='smallh2'>{song.songName}</p>
                    }
                    <p>{'Artist: ' + song.artistName}</p>
                </div>
                <div className='avgScoreContainer'>

                    {data && data.reviewAvgScoreBySongID.length > 0 &&
                        <Rating
                            name="text-feedback"
                            value={data.reviewAvgScoreBySongID[0].avgScore}
                            readOnly
                            precision={0.1}
                            emptyIcon={<StarIcon fontSize="inherit" />}
                        />}
                </div>
            </div>
        </a>
    )
}

export default SongCard;