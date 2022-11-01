import Card from "@mui/material/Card";
import Rating from "@mui/material/Rating";
import StarIcon from '@mui/icons-material/Star';
import { reviewProp } from "../helpers/types";

// this card diplays a review with information from the properties sent from the parent node
export default function ReviewCard(props: reviewProp) {
    return (
        <div>
            <Card variant="outlined" style={{paddingBottom: '15px'}}>
                <h5>{props.userName}</h5>
                <Rating name="read-only" value={props.star} readOnly emptyIcon={<StarIcon fontSize="inherit" />}/>
                <p>{props.description}</p>
            </Card>
        </div>
    )
}