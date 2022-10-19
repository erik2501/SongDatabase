import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import SongCard from '../components/SongCard';
import { Song } from '../helpers/types';
import ErrorPage from './ErrorPage';

// const GET_ALL_SONGS =  gql`
//     query GetSongs {
//         song {
//             songID
//             songName
//             artistName
//         }
//     }
// `;

const GET_SONGS_PAGINATED = gql`
    query GetSongsPaginated ($skip: Int! $amount: Int! ) {
        songs_paginated (skip: $skip amount: $amount) {
            songID
            songName
            artistName
        }
    }
`;

const PAGE_SIZE = 20;

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
    const offsetLS = parseInt(sessionStorage.getItem('offset') ?? '');
    
    const [offset, setOffset] = useState<number>(() => isNaN(offsetLS) ? 0 : offsetLS);

    const [songs, setSongs] = useState<Song[]>([]);
    const { loading, error, data } = useQuery(GET_SONGS_PAGINATED, { variables: { skip: offset, amount: PAGE_SIZE } });

    useEffect(() => {
        if (!isNaN(offsetLS)) {
            setOffset(offsetLS);
        }
    },[])

    useEffect(() => {
        sessionStorage.setItem('offset', offset.toString());
    },[offset])

    useEffect(() => {
        if (data){
            setSongs(data.songs_paginated);
        }
    },[data])

    if (loading) return <ErrorPage message='Loading...'/>;
    if (error) return <ErrorPage message={`Error! ${error.message}`}/>;  

    let pageNumber = offset/PAGE_SIZE + 1
    const maxPages = Math.ceil(2000 / PAGE_SIZE); // have to get size of songs schema from database

    return (
        <div className='flexColCenterCenter'>

            <div className='page-manager'>
                <button disabled={(pageNumber==1)} onClick={() => setOffset(offset-PAGE_SIZE)}>Last </button>
                <h2>Page {pageNumber}</h2>
                <button disabled={(pageNumber==maxPages)} onClick={() => setOffset(offset+PAGE_SIZE)}>Next </button>
            </div>

            {songs.map( (song, index) => {
                return(
                    <SongCard key={index} song={song}/>
                )
            })}

            <div className='page-manager'>
                <button disabled={(pageNumber==1)} onClick={() => setOffset(offset-PAGE_SIZE)}>Last </button>
                <h2>Page {pageNumber}</h2>
                <button disabled={(pageNumber==maxPages)} onClick={() => setOffset(offset+PAGE_SIZE)}>Next </button>
            </div>
        </div>
    )
}
export default HomePage;
