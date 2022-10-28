import Card from "@mui/material/Card";
import Rating from "@mui/material/Rating";
import StarIcon from '@mui/icons-material/Star';
import internal from "stream";

interface reviewProp {
    userName: string,
    star: number,
    description: string,
}

export default function ReviewCard(props: reviewProp) {
    return (
        <div>
            <Card variant="outlined">
                <h5>{props.userName}</h5>
                <Rating name="read-only" value={props.star} readOnly emptyIcon={<StarIcon fontSize="inherit" />}/>
                <p>{props.description}</p>
            </Card>
        </div>
    )
}