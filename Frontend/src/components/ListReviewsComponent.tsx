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
                data.reviewsBySongID?.map((r: { userName: string; star: number; description: string; }) => (
                    <ReviewCard userName={r.userName} star={r.star} description={r.description} key={r.userName + r.description} />
                ))
            }
        </div>

    )
}