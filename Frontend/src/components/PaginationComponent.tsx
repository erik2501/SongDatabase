import { useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useLazyQuery } from '@apollo/client';
import { debounce } from '../helpers/utils';
import { useRecoilValue, useRecoilState } from 'recoil';
import { offsetAtom, yearAtom, searchWordAtom } from '../shared/globalState';
import { GET_COUNT } from '../helpers/queries';

const PAGE_SIZE = 10;

const debounceGetLength = debounce((fetchFunc: () => void) => fetchFunc())

const PaginationComponent = () => {

    const searchWord = useRecoilValue(searchWordAtom);
    const [offset, setOffset] = useRecoilState(offsetAtom);
    const year = useRecoilValue(yearAtom);

    const [fetchCount, { data }] = useLazyQuery(GET_COUNT)


    const maxPages = Math.ceil((data?.songSearchCount ?? 1) / PAGE_SIZE);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setOffset((value - 1) * PAGE_SIZE)
    }


    useEffect(() => {
        debounceGetLength(() => fetchCount({ variables: { searchWord: searchWord, year: year } }))
    }, [searchWord, year])

    if (maxPages < 2) return null;

    return (
        <Stack spacing={2}>
            <Pagination count={maxPages} page={offset / PAGE_SIZE + 1} onChange={handleChange} variant="outlined" color="primary" />
        </Stack>
    )
}

export default PaginationComponent;