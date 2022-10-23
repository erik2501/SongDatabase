import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Song } from "../helpers/types";
import ErrorPage from "../pages/ErrorPage";
import SongCard from "./SongCard";

const GET_SEARCH = gql`
    query Get_Search ($filter: String, $searchWord: String, $skip: Int, $amount:Int){
        songSearch(skip: $skip, amount:$amount, filter: $filter, searchWord: $searchWord ) {
            songID
            artistName
            songName
        }
    }
`;

interface IProps {
    PAGE_SIZE: number;
    offset: number;
    searchWord: string;
    filter: string;
}

const SongTable = ({PAGE_SIZE, offset, searchWord, filter }: IProps) => {

    const [songs, setSongs] = useState<Song[]>([]);
    const { loading, error, data } = useQuery(GET_SEARCH, {variables: { skip: offset, amount: PAGE_SIZE, filter: filter, searchWord: searchWord} });

    useEffect(() => {
        if (data){
            setSongs(data.songSearch);
        }
    },[data])

    if (error) return <ErrorPage message={`Error! ${error.message}`}/>;

    return (
        <div className="flexColCenterCenter">
            {/* {loading ? 'Loading..' : ''} */}
            {(songs.length === 0) ? 'No songs were found.' : 
            songs.map( (song, index) => {
                return(
                    <SongCard key={index} song={song}/>
                )
            })}
        </div>
    )
}

export default SongTable;