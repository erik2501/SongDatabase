import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useRecoilState } from 'recoil';
import { offsetAtom, yearAtom, searchWordAtom, orderAtom } from '../shared/globalState';
import { Button } from "@mui/material";
import { useQuery } from '@apollo/client';
import { GET_DISTINCT_YEARS } from "../helpers/queries";


const Searchbar = () => {

    const [searchWord, setSearchWord] = useRecoilState(searchWordAtom);
    const [offset, setOffset] = useRecoilState(offsetAtom);
    const [year, setYear] = useRecoilState(yearAtom);
    const [order, setOrder] = useRecoilState(orderAtom);

    // const { error, data } = useQuery(GET_DISTINCT_YEARS);


    const handleSearch = (value: string) => {
        setSearchWord(value);
        setOffset(0);
    }

    const handleYearChange = (event: SelectChangeEvent) => {
        setYear(parseInt(event.target.value) ?? 0);
        setOffset(0);
    }

    const handleOrderChange = (event: SelectChangeEvent) => {
        setOrder(parseInt(event.target.value) ?? 0);
        setOffset(0);
    }

    const handleClear = () => {
        setSearchWord('');
        setYear(0);
        setOffset(0);
        setOrder(-1);
    }

    return (

        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField id="outlined-basic" label="Search for song or artist" variant="outlined" value={searchWord} onChange={e => handleSearch(e.target.value)} data-testid="searchbar" />

            <FormControl fullWidth>
                <InputLabel id="year-select-label">Year</InputLabel>
                <Select
                    labelId="year-select-label"
                    id="year-select"
                    label="Year"
                    onChange={handleYearChange}
                    value={year.toString() ?? 0}
                    data-testid="selectYear"
                >
                    <MenuItem value={0}>All years</MenuItem>
                    <MenuItem value={1998}>1998</MenuItem>
                    <MenuItem value={1999}>1999</MenuItem>
                    <MenuItem value={2000}>2000</MenuItem>
                    <MenuItem value={2001}>2001</MenuItem>
                    <MenuItem value={2002}>2002</MenuItem>
                    <MenuItem value={2003}>2003</MenuItem>
                    <MenuItem value={2004}>2004</MenuItem>
                    <MenuItem value={2005}>2005</MenuItem>
                    <MenuItem value={2006}>2006</MenuItem>
                    <MenuItem value={2007}>2007</MenuItem>
                    <MenuItem value={2008}>2008</MenuItem>
                    <MenuItem value={2009}>2009</MenuItem>
                    <MenuItem value={2010}>2010</MenuItem>
                    <MenuItem value={2011}>2011</MenuItem>
                    <MenuItem value={2012}>2012</MenuItem>
                    <MenuItem value={2013}>2013</MenuItem>
                    <MenuItem value={2014}>2014</MenuItem>
                    <MenuItem value={2015}>2015</MenuItem>
                    <MenuItem value={2016}>2016</MenuItem>
                    <MenuItem value={2017}>2017</MenuItem>
                    <MenuItem value={2018}>2018</MenuItem>
                    <MenuItem value={2019}>2019</MenuItem>
                    <MenuItem value={2020}>2020</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="order-select-label">Order</InputLabel>
                <Select
                    labelId="order-select-label"
                    id="order-select"
                    label="Order"
                    onChange={handleOrderChange}
                    value={order.toString() ?? -1}
                    data-testid="selectOrder"
                >
                    <MenuItem value={-1}>Newest first</MenuItem>
                    <MenuItem value={0}>Oldest first</MenuItem>
                </Select>
            </FormControl>

            <Button variant="contained" onClick={handleClear} data-testid="clearbutton" sx={{ height: 56}}>Clear</Button>
        </Box>
    )
}

export default Searchbar;