import Card from "@mui/material/Card";
import Rating from "@mui/material/Rating";
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
                <Rating value={props.star} />
                <p>{props.description}</p>
            </Card>
        </div>
    )
}