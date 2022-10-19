import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import SongCard from '../components/SongCard';
import { Song } from '../helpers/types';

const GET_ALL_SONGS =  gql`
        query GetSongs {
            song {
                songID
                songName
                artistName
            }
        }
    `;

const HomePage = () => {

    //const [songs, setSongs] = useState<Song[]>([]);

    // const client = new ApolloClient({
    //     uri: 'http://localhost:3001/songs',
    //     cache: new InMemoryCache(),
    // });

        // useEffect(() => {
    //     client
    //     .query({
    //         query: gql`
    //         query GetSongs {
    //             song {
    //             songID
    //             songName
    //             artistName
    //             }
    //         }
    //         `,
    //     })
    //     .then((result) => setSongs(result.data.song))
    //     .catch(err => console.log(err));
    // },[])

    const [songs, setSongs] = useState<Song[]>([]);
    const { loading, error, data } = useQuery(GET_ALL_SONGS);

    useEffect(() => {
        if (data){
            setSongs(data.song);
        }
    },[data])

    
    if (loading) return <h1>'Loading...'</h1>;
    if (error) return <h1>`Error! ${error.message}`</h1>;

    return (
        <div className='flexColCenter'>
            <h2>Songs</h2>
            {songs.map( (song, index) => {
                return(
                    <SongCard key={index} song={song}/>
                )
            })}
        </div>
    )
}
export default HomePage;
