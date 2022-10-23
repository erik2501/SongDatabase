import { Dispatch, SetStateAction } from "react";

interface SearchWordProps {
    searchWord: string;
    setSearchWord: Dispatch<SetStateAction<string>>;
    filter: string;
    setFilter: Dispatch<SetStateAction<string>>;
}


const Searchbar = ({searchWord, setSearchWord, filter, setFilter}: SearchWordProps) => {

    const handleSearch = (value: string) => {
        setSearchWord(value);
    } 

    const changeFilter = (value: string) => {
        setFilter(value)
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