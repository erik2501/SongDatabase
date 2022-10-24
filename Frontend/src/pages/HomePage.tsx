import { useEffect, useState } from 'react';
import Searchbar from '../components/Searchbar';
import SongTable from '../components/SongTable';
import { gql, useLazyQuery } from '@apollo/client';
import { debounce } from '../helpers/utils';

const PAGE_SIZE = 20;

const GET_COUNT = gql`
    query ( $searchWord: String ){
        songSearchCount( searchWord: $searchWord )
    }
`;

const debounceSearch = debounce((fetchFunc: () => void) => fetchFunc()) 

const HomePage = () => {

    const offsetLS = parseInt(sessionStorage.getItem('offset') ?? '');
    const [offset, setOffset] = useState<number>(() => isNaN(offsetLS) ? 0 : offsetLS);
    const [searchWord, setSearchWord] = useState<string>(sessionStorage.getItem('searchWord') ?? '');

    const [fetchCount, {loading, error, data}] = useLazyQuery(GET_COUNT)

    useEffect(() => {
        sessionStorage.setItem('searchWord', searchWord);
    },[searchWord])


    useEffect(() => {
        sessionStorage.setItem('offset', offset.toString());
    },[offset])

    useEffect(() => {
        debounceSearch(() => fetchCount({ variables: { searchWord: searchWord } }))
        
    }, [searchWord])


    let pageNumber = offset/PAGE_SIZE + 1
    const maxPages = Math.ceil((data?.songSearchCount ?? 1) / PAGE_SIZE);

    return (
        <div className='flexColCenterCenter'>

            <Searchbar setOffset={setOffset} searchWord={searchWord} setSearchWord={setSearchWord}/>
            <SongTable PAGE_SIZE={PAGE_SIZE} offset={offset} searchWord={searchWord} />

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
