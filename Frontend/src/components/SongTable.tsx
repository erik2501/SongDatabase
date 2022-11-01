import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Song } from "../helpers/types";
import ErrorPage from "../pages/ErrorPage";
import SongCard from "./SongCard";
import { debounce } from "../helpers/utils";
import { useRecoilValue } from 'recoil';
import { offsetAtom, yearAtom, searchWordAtom, orderAtom } from '../shared/globalState';
import { GET_SEARCH } from "../helpers/queries";


const PAGE_SIZE = 10;

// bruker debounce funksjonen vår 
const debounceFetch = debounce((fetchFunc: () => void) => fetchFunc())


const SongTable = () => {

    const searchWord = useRecoilValue(searchWordAtom);
    const offset = useRecoilValue(offsetAtom);
    const year = useRecoilValue(yearAtom);
    const order = useRecoilValue(orderAtom);

    const [songs, setSongs] = useState<Song[]>([]);
    const [fetchSongs, { loading, error, data }] = useLazyQuery(GET_SEARCH);

    useEffect(() => {
        if (data) {
            setSongs(data.songSearch);
        }
    }, [data])

    useEffect(() => {
        debounceFetch(() => fetchSongs({ variables: { skip: offset, amount: PAGE_SIZE, searchWord: searchWord, year: year, order: order } }))
    }, [searchWord, year])

    useEffect(() => {
        fetchSongs({ variables: { skip: offset, amount: PAGE_SIZE, searchWord: searchWord, year: year, order: order } })
    }, [offset, order])

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