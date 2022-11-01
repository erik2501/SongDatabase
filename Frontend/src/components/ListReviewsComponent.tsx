import { useQuery } from '@apollo/client';
import ReviewCard from './ReviewCard';
import { GET_REVIEWS } from '../helpers/queries';

// this is a component that fetches the 10 last reviews from the db and displays them with info 
export default function ListReviews({ songID }: { songID: number }) {

    // this query gets the last 10 reviews of a specific song
    const { loading, error, data } = useQuery(GET_REVIEWS, { variables: { songID: songID, amount: 10 } });

    if (loading) return <h1>Loading...</h1>
    if (error) return <h1>`Error! ${error.message}`</h1>;

    return (
        <div>
            {
                data.reviewsBySongID?.map((review: { userName: string; star: number; description: string; }, index: number) => (
                    <ReviewCard userName={review.userName} star={review.star} description={review.description} key={index} />
                ))
            }
        </div>

    )
}