import { Dispatch, SetStateAction } from "react";

interface SearchWordProps {
    setOffset: Dispatch<SetStateAction<number>>;
    searchWord: string;
    setSearchWord: Dispatch<SetStateAction<string>>;
    filter: string;
    setFilter: Dispatch<SetStateAction<string>>;
}


const Searchbar = ({ setOffset, searchWord, setSearchWord, filter, setFilter }: SearchWordProps) => {

    const handleSearch = (value: string) => {
        setSearchWord(value);
        console.log('setter offset til 0')
        setOffset(0);
    } 

    const changeFilter = (value: string) => {
        setFilter(value)
        setOffset(0);
    }

    return (
        <form className="searchbar">
            <label>
                <input type="text" value={searchWord} onChange={e => handleSearch(e.target.value)} name="search" placeholder="Search.."></input>
                <select name="filter" value={filter} onChange={e => changeFilter(e.target.value)}>
                    <option value="Any">Any</option>
                    <option value="Song">Song</option>
                    <option value="Artist">Artist</option>
                </select>
            </label>
        </form>
    )
}

export default Searchbar;