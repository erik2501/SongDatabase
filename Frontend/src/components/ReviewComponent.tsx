import { Box, Rating, TextField } from '@mui/material';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../helpers/queries';


// this component is for a user to write a review to a specific song, 
// where the props is the specific song the component is connected to
export default function ReviewComponent({ songID }: { songID: number }) {

    // these are the variables for each field for the review, and the message is an error message
    const [star, setStar] = useState<number | null>()
    const [userName, setUserName] = useState<string>()
    const [description, setDescription] = useState<string>()
    const [message, setMessage] = useState<string>("");

    // this is the mutation that adds a review to the db
    const [createReview, { loading }] = useMutation(CREATE_REVIEW);
// handles the submit button, by setting the variables if they are filled out, and displaying message if not
    const handleSubmit = () => {
        if (userName && star) {
            setMessage("")
            createReview({ variables: { userName: userName, star: star, description: description, songID: songID } });
            setUserName(undefined)
            setStar(undefined)
            window.location.reload()
        } else {
            setMessage('Fill inn name and stars')
        }
    }

    if (loading) return <h1>'Submitting...'</h1>;

    return (
        <div className="reviewBox">
            <h3>Add review:</h3>

            <Box>
                <TextField
                    id="userName"
                    label="Name"
                    variant="outlined"
                    onChange={(e) => setUserName(e.target.value)} 
                    data-testid="username"/>
            </Box>
            <Box>
                <Rating
                    name="star"
                    onChange={(event, newValue) => {
                        setStar(newValue);
                    }}
                    data-testid="star"
                />
            </Box>
            <Box>
                <TextField
                    id="filled-multiline-static"
                    label="Description"
                    multiline
                    rows={4}
                    variant="outlined"
                    onChange={(e) => setDescription(e.target.value)}
                    data-testid="description"
                />
            </Box>
            <button onClick={() => handleSubmit()} data-testid="submit">
                Submit review
            </button>
            <p>{message}</p>
        </div>
    )
}
