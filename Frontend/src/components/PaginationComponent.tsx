import { useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useLazyQuery } from '@apollo/client';
import { debounce } from '../helpers/utils';
import { useRecoilValue, useRecoilState } from 'recoil';
import { offsetAtom, yearAtom, searchWordAtom, pageSizeAtom } from '../shared/globalState';
import { GET_COUNT } from '../helpers/queries';


const debounceGetLength = debounce((fetchFunc: () => void) => fetchFunc())

const PaginationComponent = () => {
// these are the variables from the state manager so we can fetch the right data
    const searchWord = useRecoilValue(searchWordAtom);
    const [offset, setOffset] = useRecoilState(offsetAtom);
    const year = useRecoilValue(yearAtom);
    const pageSize = useRecoilValue(pageSizeAtom);

    const [fetchCount, { data }] = useLazyQuery(GET_COUNT)

// the number of pages from the number of songs that are to be displayed
    const maxPages = Math.ceil((data?.songSearchCount ?? 1) / pageSize);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setOffset((value - 1) * pageSize)
    }


    useEffect(() => {
        debounceGetLength(() => fetchCount({ variables: { searchWord: searchWord, year: year } }))
    }, [searchWord, year])

    if (maxPages < 2) return null;

    return (
        <Stack spacing={2}>
            <Pagination count={maxPages} page={offset / pageSize + 1} onChange={handleChange} variant="outlined" color="primary" />
        </Stack>
    )
}

export default PaginationComponent;