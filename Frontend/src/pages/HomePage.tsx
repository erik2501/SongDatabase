import { useEffect, useState } from 'react';
import Searchbar from '../components/Searchbar';
import SongTable from '../components/SongTable';
import { gql, useLazyQuery } from '@apollo/client';
import { debounce } from '../helpers/utils';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ScrollButton from '../components/ScrollButton';

const PAGE_SIZE = 10;

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

    const maxPages = Math.ceil((data?.songSearchCount ?? 1) / PAGE_SIZE);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setOffset((value-1)*PAGE_SIZE)
    }

    return (
        <div className='flexColCenterCenter'>

            <Searchbar setOffset={setOffset} searchWord={searchWord} setSearchWord={setSearchWord}/>
            <SongTable PAGE_SIZE={PAGE_SIZE} offset={offset} searchWord={searchWord} />
            <ScrollButton/>
            <Stack spacing={2}>
                <Pagination count={maxPages} page={offset/PAGE_SIZE + 1} onChange={handleChange} variant="outlined" color="primary" />
            </Stack>
        </div>
    )
}
export default HomePage;
