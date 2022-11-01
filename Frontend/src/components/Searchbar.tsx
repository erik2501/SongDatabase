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
    // offset er verdien som styrer hvor pagineringen skal starte.
    const [offset, setOffset] = useRecoilState(offsetAtom);
    const [year, setYear] = useRecoilState(yearAtom);
    // order er variabelen som brukes i spørring for å spesisere sorterings-rekkefølgen man vil ha. -1 tilsvarer baklengs (nyest-eldst), 0 tilsvarer forlengs (eldst-nyest).
    const [order, setOrder] = useRecoilState(orderAtom);

    const { data } = useQuery(GET_DISTINCT_YEARS);

    // grunnen til at vi setter offset til 0 i alle disse funksjonene er at da vil pagineringen gå tilbake til første side når søkeresultatet endrer seg
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
                    {data?.getDistinctYears.map( (year: number, index: number) => {
                        return <MenuItem key={index} value={year}>{year}</MenuItem>
                    })}
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