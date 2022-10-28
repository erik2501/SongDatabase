import { gql, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Song } from "../helpers/types";
import ErrorPage from "../pages/ErrorPage";
import SongCard from "./SongCard";
import { debounce } from "../helpers/utils";
import { useRecoilValue } from 'recoil';
import { offsetAtom, yearAtom, searchWordAtom } from '../shared/globalState';

const GET_SEARCH = gql`
    query Get_Search ($searchWord: String, $skip: Int, $amount:Int, $year: Int){
        songSearch(skip: $skip, amount:$amount, searchWord: $searchWord, year: $year ) {
            songID
            artistName
            songName
            imageURL
        }
    }
`;

const PAGE_SIZE = 10;

const debounceFetch = debounce((fetchFunc: () => void) => fetchFunc()) 


const SongTable = () => {

    const searchWord = useRecoilValue(searchWordAtom);
    const offset = useRecoilValue(offsetAtom);
    const year = useRecoilValue(yearAtom);

    // console.log('offset:', offset)
    // console.log('searchWord:', searchWord)
    // console.log('year:', year)

    const [songs, setSongs] = useState<Song[]>([]);
    const [fetchSongs, { loading, error, data }] = useLazyQuery(GET_SEARCH);

    useEffect(() => {
        if (data){
            setSongs(data.songSearch);
        }
    },[data])

    useEffect(() => {
        debounceFetch(() => fetchSongs({ variables: { skip: offset, amount: PAGE_SIZE, searchWord: searchWord, year: year } }))
    }, [searchWord, offset, year])

    if (error) return <ErrorPage message={`Error! ${error.message}`}/>;

    return (
        <div className="flexColCenterCenter" data-testid="songtable">
            <div style={{height: '20px'}}>
                {loading ? 'Loading..' : ''}
            </div>
            {(songs.length === 0 && !loading) ? 'No songs were found.' : 
            songs.map( (song, index) => {
                return(
                    <SongCard key={index} song={song} data-testid={index}/>
                )
            })}
        </div>
    )
}

export default SongTable;