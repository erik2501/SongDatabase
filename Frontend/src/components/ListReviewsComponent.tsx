import { gql, useQuery } from '@apollo/client';
import ReviewCard from './ReviewCard';

const GET_REVIEWS = gql`
    query GetReviews ($songID: Int!, $amount: Int!) {
        reviewsBySongID (songID: $songID, amount: $amount) {
            userName
            star
            description
            songID
        }
    }
    `

export default function ListReviews({ songID }: { songID: number }) {

    const { loading, error, data } = useQuery(GET_REVIEWS, { variables: { songID: songID, amount: 10 } });

    if (loading) return <h1>Loading...</h1>
    if (error) return <h1>`Error! ${error.message}`</h1>;

    return (
        <div>
            {
                data.reviewsBySongID?.map( (review: { userName: string; star: number; description: string; }, index: number) => (
                    <ReviewCard userName={review.userName} star={review.star} description={review.description} key={index} />
                ))
            }
        </div>

    )
}