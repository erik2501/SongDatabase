import { gql } from '@apollo/client';


export const GET_REVIEWS = gql`
    query GetReviews ($songID: Int!, $amount: Int!) {
        reviewsBySongID (songID: $songID, amount: $amount) {
            userName
            star
            description
            songID
        }
    }
    `

export const GET_COUNT = gql`
    query ( $searchWord: String, $year: Int ){
        songSearchCount( searchWord: $searchWord, year: $year )
    }
`;

export const CREATE_REVIEW = gql`
    mutation addReviewForSong($userName: String!, $star: Int!, $description: String!, $songID: Int!) {
        addReview(userName: $userName, star: $star, description: $description, songID: $songID) {
            userName
            star
            description
            songID
        }
    }`

export const GET_AVG_REVIEW_SCORE = gql`
    query ( $songID: Int ){
        reviewAvgScoreBySongID( songID:$songID ) {
        avgScore
        }
    }
`;

export const GET_SONG_BY_SONGID = gql`
    query GetSong ($songID: Int!) {
        songBySongID (songID: $songID) {
            songID
            songName
            artistName
            durationMS
            year
            energy
            imageURL
        }
    }
`;

export const GET_SEARCH = gql`
    query Get_Search ($searchWord: String, $skip: Int, $amount:Int, $year: Int, $order: Int){
        songSearch(skip: $skip, amount:$amount, searchWord: $searchWord, year: $year, order: $order ) {
            songID
            artistName
            songName
            imageURL
        }
    }
`;

export const GET_DISTINCT_YEARS = gql`
    query {
        getDistinctYears
    }
`;