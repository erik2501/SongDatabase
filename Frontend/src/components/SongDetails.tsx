import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { SongAllData } from '../helpers/types';
import ListReviews from './ListReviewsComponent';
import ReviewCard from './ReviewCard';
import ReviewComponent from './ReviewComponent';
import { Card, CardContent, Box, Typography, CardMedia } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import TimerIcon from '@mui/icons-material/Timer';
import { GET_SONG_BY_SONGID } from '../helpers/queries';




const SongDetails = ({ songID }: { songID: number }) => {

    const [song, setSong] = useState<SongAllData>();
    const { loading, error, data } = useQuery(GET_SONG_BY_SONGID, { variables: { songID: songID } });

    useEffect(() => {
        if (data) {
            setSong(data.songBySongID[0])
        }
    }, [data])

    if (loading) return <h1>Loading...</h1>
    if (error) return <h1>`Error! ${error.message}`</h1>;
    if (!song) return <h1>Could not find this song.</h1>

    return (


        <div className='songDetails'>
            <Card sx={{ display: 'flex', marginRight: 15 }}>
                <CardMedia
                    component="img"
                    sx={{ height: 300 }}
                    image={song.imageURL}
                    alt="Live from space album cover"
                />
                <Box style={{ paddingLeft: '20px' }}>
                    <Box sx={{ display: 'flex', width: '200px', marginTop: '12%' }}>
                        <MusicNoteIcon></MusicNoteIcon>
                        <Typography>{song?.songName}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', width: '200px', marginTop: '12%' }}>
                        <PersonIcon></PersonIcon>
                        <Typography>{song?.artistName}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', width: '200px', marginTop: '12%' }}>
                        <CalendarMonthIcon></CalendarMonthIcon>
                        <Typography>{song?.year}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', width: '200px', marginTop: '12%' }}>
                        <TimerIcon></TimerIcon>
                        <Typography>{Math.floor(song?.durationMS / (1000 * 60))}:{Math.round((song?.durationMS / 1000) % (60))}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', width: '200px', marginTop: '12%' }}>
                        <ElectricBoltIcon></ElectricBoltIcon>
                        <Typography>{song?.energy}</Typography>
                    </Box>
                </Box>
            </Card>
            <ReviewComponent songID={songID} />
            <div className="reviewList">
                <ListReviews songID={songID} />
            </div>
        </div>

    )
}

export default SongDetails;