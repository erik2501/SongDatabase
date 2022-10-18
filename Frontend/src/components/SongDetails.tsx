import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { SongAllData } from '../helpers/types';
import { useNavigate } from 'react-router-dom';

const GET_SONG_BY_SONGID = gql`
    query GetSong ($songID: Int!) {
        songBySongID (songID: $songID) {
            songID
            songName
            artistName
            durationMS
            year
            energy
        }
    }
`;

const SongDetails= ({songID}: {songID: number}) => {

    const [song, setSong] = useState<SongAllData>();
    const { loading, error, data } = useQuery(GET_SONG_BY_SONGID, { variables: { songID: songID } });
    const nav = useNavigate()
    
    useEffect(() => {
        if (data) {
            setSong(data.songBySongID[0])
        }
    },[data])

    if (loading) return <h1>'Loading...'</h1>;
    if (error) return <h1>`Error! ${error.message}`</h1>;

    return (
        <div>
            <button onClick={() => nav('/')}>Back to all songsearch</button>
            <h1>Song: {song?.songName} </h1>
            <p>Artist: {song?.artistName}</p>
            <p>Year: {song?.year}</p>
            <p>Duration: {song?.durationMS}</p>
            <p>Energy: {song?.energy}</p>
        </div>
    )
}

export default SongDetails;