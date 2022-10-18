import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { useEffect, useState } from 'react';
import SongCard from '../components/SongCard';
import { Song } from '../helpers/types';


const HomePage = () => {

    const [songs, setSongs] = useState<Song[]>([]);

    const client = new ApolloClient({
        uri: 'http://localhost:3001/songs',
        cache: new InMemoryCache(),
    });

    client
    .query({
        query: gql`
        query GetSongs {
            song {
            songID
            songName
            artistName
            }
        }
        `,
    })
    .then((result) => setSongs(result.data.song))
    .catch(err => console.log(err));


    return (
        <div className='flexColCenter'>
            <h2>Homepage</h2>
            {songs.slice(0,40).map( (song, index) => {
                return(
                    <SongCard key={index} song={song}/>
                )
            })}
        </div>
    )
}
export default HomePage;
