import { Dispatch, SetStateAction } from "react";

interface SearchWordProps {
    setOffset: Dispatch<SetStateAction<number>>;
    searchWord: string;
    setSearchWord: Dispatch<SetStateAction<string>>;
}


const Searchbar = ({ setOffset, searchWord, setSearchWord }: SearchWordProps) => {

    const handleSearch = (value: string) => {
        setSearchWord(value);
        console.log('setter offset til 0')
        setOffset(0);
    } 

    return (
        <form className="searchbar">
            <label>
                <input type="text" value={searchWord} onChange={e => handleSearch(e.target.value)} name="search" placeholder="Search.."></input>
            </label>
        </form>
    )
}

export default Searchbar;