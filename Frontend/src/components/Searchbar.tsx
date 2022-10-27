import { Dispatch, SetStateAction, useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface SearchWordProps {
    setOffset: Dispatch<SetStateAction<number>>;
    searchWord: string;
    setSearchWord: Dispatch<SetStateAction<string>>;
    year: number;
    setYear: Dispatch<SetStateAction<number>>
}

const Searchbar = ({ setOffset, searchWord, setSearchWord, year, setYear }: SearchWordProps) => {


    const handleSearch = (value: string) => {
        setSearchWord(value);
        console.log('setter offset til 0')
        setOffset(0);
    } 


    const handleYearChange = (event: SelectChangeEvent) => {
        setYear(parseInt(event.target.value) ?? 0);
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
            <TextField id="outlined-basic" label="Search song or artist" variant="outlined" value={searchWord} onChange={e => handleSearch(e.target.value)}/>
            
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={year}
                    label="Year"
                    onChange={handleYearChange}
                    defaultValue='0'
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
        </Box>
    )
}

export default Searchbar;