import { Rating, TextField } from '@mui/material';
// import { ObjectId } from 'mongoose';
import { useState } from 'react';
import { start } from 'repl';
import { gql, useMutation } from '@apollo/client';


const CREATE_REVIEW = gql`
    mutation addReviewForSong($userName: String!, $star: Int!, $description: String!, $songID: Int!) {
        addReview(userName: $userName, star: $star, description: $description, songID: $songID) {
            userName
            star
            description
            songID
        }
    }`

export default function ReviewComponent({ songID }: { songID: number }) {

    const [star, setStar] = useState<number | null>()
    const [userName, setUserName] = useState<string>()
    const [description, setDescription] = useState<string>()
    const [message, setMessage] = useState<string>("");

    const [createReview, { data, loading, error }] = useMutation(CREATE_REVIEW);

    console.log("username", userName)
    console.log("star", star)

    const handleSubmit = () => {
        if (userName && star) {

            setMessage("")
            console.log("creating review")
            createReview({ variables: { userName: userName, star: star, description: description, songID: songID } });
            setUserName(undefined)
            setStar(undefined)
        } else {
            setMessage('Fill inn name and stars')
        }
    }

    if (loading) return <h1>'Submitting...'</h1>;
    // if (error) return <h1>`Submission error! ${error.message}`</h1>;

    return (
        <div className="reviewBox">
            <h3>Add review:</h3>

            <div>
                <TextField
                    id="userName"
                    label="Name"
                    variant="filled"
                    onChange={(e) =>
                        setUserName(e.target.value)} />
            </div>
            <div>
                <Rating
                    name="star"
                    onChange={(event, newValue) => {
                        setStar(newValue);
                    }}
                />
            </div>
            <div>
                <TextField
                    id="filled-multiline-static"
                    label="Description"
                    multiline
                    rows={4}
                    variant="filled"
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <button
                onClick={() => handleSubmit()}
            >
                Submit review
            </button>
            <p>{message}</p>
        </div>
    )
}
