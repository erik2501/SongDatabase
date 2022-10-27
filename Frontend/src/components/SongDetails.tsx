import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { SongAllData } from '../helpers/types';
import ListReviews from './ListReviewsComponent';
import ReviewCard from './ReviewCard';
import ReviewComponent from './ReviewComponent';

const GET_SONG_BY_SONGID = gql`
    query GetSong ($songID: Int!) {
        songBySongID (songID: $songID) {
            songID
            songName
            artistName
            durationMS
            year
            energy
            imageURL
        }
    }
`;

const SongDetails = ({ songID }: { songID: number }) => {

    const [song, setSong] = useState<SongAllData>();
    const { loading, error, data } = useQuery(GET_SONG_BY_SONGID, { variables: { songID: songID } });

    useEffect(() => {
        if (data) {
            setSong(data.songBySongID[0])
        }
    }, [data])

    if (loading) return <h1>Loading...</h1>
    if (error) return <h1>`Error! ${error.message}`</h1>;
    if (!song) return <h1>Could not find this song.</h1>

    return (
        <div>
            <div className='songDetails'>
                <div className="song-info">
                    <img className='imgDetails' src={song.imageURL}></img>
                    <div className='textbox'>
                        <h1>{song?.songName} </h1>
                        <p>Artist: {song?.artistName}</p>
                        <p>Year: {song?.year}</p>
                        <p>Duration: {Math.floor(song?.durationMS / (1000*60))}:{Math.round((song?.durationMS/1000) % (60))}</p>
                        <p>Energy: {song?.energy}</p>
                    </div>
                </div>
                <ReviewComponent songID={songID} />
            </div>
            <div className="reviewList">
                <ListReviews songID={songID} />
            </div>
        </div>
    )
}

export default SongDetails;