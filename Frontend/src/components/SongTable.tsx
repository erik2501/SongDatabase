import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Song } from "../helpers/types";
import ErrorPage from "../pages/ErrorPage";
import SongCard from "./SongCard";
import { debounce } from "../helpers/utils";
import { useRecoilValue } from 'recoil';
import { offsetAtom, yearAtom, searchWordAtom, orderAtom, pageSizeAtom } from '../shared/globalState';
import { GET_SEARCH } from "../helpers/queries";


// definerer debounce funksjonen vår 
const debounceFetch = debounce((fetchFunc: () => void) => fetchFunc())

// This component displays the songs on the homepage. 
const SongTable = () => {

    // We are using Recoil State Management to get the filtering variables possibly set in the searchbar 
    // and the offset set in pagination
    const searchWord = useRecoilValue(searchWordAtom);
    const offset = useRecoilValue(offsetAtom);
    const year = useRecoilValue(yearAtom);
    const order = useRecoilValue(orderAtom);
    const pageSize = useRecoilValue(pageSizeAtom);

    // this query gets the songs with the users specified filtering
    const [songs, setSongs] = useState<Song[]>([]);
    const [fetchSongs, { loading, error, data }] = useLazyQuery(GET_SEARCH);

    useEffect(() => {
        if (data) {
            setSongs(data.songSearch);
        }
    }, [data])

    // when user changes searchword, this debounce function will fetch filtered songs 500 milliseconds after first input change
    useEffect(() => {
        debounceFetch(() => fetchSongs({ variables: { skip: offset, amount: pageSize, searchWord: searchWord, year: year, order: order } }))
    }, [searchWord])

    // when the user changes page, order or year the songs are being fetched immediately.
    useEffect(() => {
        fetchSongs({ variables: { skip: offset, amount: pageSize, searchWord: searchWord, year: year, order: order } })
    }, [offset, order, year])

    if (error) return <ErrorPage message={`Error! ${error.message}`} />;

    return (
        <div className="flexColCenterCenter" data-testid="songtable">
            <div style={{ height: '20px' }}>
                {loading ? 'Loading..' : ''}
            </div>
            {(songs.length === 0 && !loading) ? 'No songs were found.' :
                songs.map((song, index) => {
                    return (
                        <SongCard key={index} song={song} data-testid={index} />
                    )
                })}
        </div>
    )
}

export default SongTable;