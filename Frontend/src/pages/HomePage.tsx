import { useEffect, useState } from 'react';
import Searchbar from '../components/Searchbar';
import SongTable from '../components/SongTable';

const PAGE_SIZE = 20;

const HomePage = () => {

    const offsetLS = parseInt(sessionStorage.getItem('offset') ?? '');
    const [offset, setOffset] = useState<number>(() => isNaN(offsetLS) ? 0 : offsetLS);
    const [searchWord, setSearchWord] = useState<string>(sessionStorage.getItem('searchWord') ?? '');
    const [filter, setFilter] = useState<string>(sessionStorage.getItem('filter') ?? 'Any');

    useEffect(() => {
        sessionStorage.setItem('searchWord', searchWord);
        sessionStorage.setItem('filter', filter);
        setOffset(0);
    },[searchWord,filter])


    useEffect(() => {
        sessionStorage.setItem('offset', offset.toString());
    },[offset])


    let pageNumber = offset/PAGE_SIZE + 1
    const maxPages = Math.ceil(2000 / PAGE_SIZE); // have to get size of songs schema from database

    return (
        <div className='flexColCenterCenter'>

            <Searchbar searchWord={searchWord} setSearchWord={setSearchWord} filter={filter} setFilter={setFilter}/>
            <SongTable PAGE_SIZE={PAGE_SIZE} offset={offset} searchWord={searchWord} filter={filter}/>

            <div className='page-manager'>
                <button style={{ visibility: pageNumber-2 <= 0 ? 'hidden' : 'visible'}}  onClick={() => setOffset(offset-2*PAGE_SIZE)}>{pageNumber-2} </button>
                <button style={{ visibility: pageNumber-1 <= 0 ? 'hidden' : 'visible'}} onClick={() => setOffset(offset-PAGE_SIZE)}>{pageNumber-1} </button>
                <button style={{ backgroundColor: 'gray', opacity: '0.7', cursor: 'default'}}>{pageNumber} </button>
                <button style={{ visibility: pageNumber+1 > maxPages ? 'hidden' : 'visible'}} onClick={() => setOffset(offset+PAGE_SIZE)}>{pageNumber+1} </button>
                <button style={{ visibility: pageNumber+2 > maxPages ? 'hidden' : 'visible'}} onClick={() => setOffset(offset+2*PAGE_SIZE)}>{pageNumber+2} </button>
            </div>
        </div>
    )
}
export default HomePage;
