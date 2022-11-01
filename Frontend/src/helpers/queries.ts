import { gql } from '@apollo/client';

// get all reviews connected to a specific song
export const GET_REVIEWS = gql`
    query GetReviews ($songID: Int!, $amount: Int!) {
        reviewsBySongID (songID: $songID, amount: $amount) {
            userName
            star
            description
            songID
        }
    }
`;
// get the number of songs with a specific year and search word
export const GET_COUNT = gql`
    query ( $searchWord: String, $year: Int ){
        songSearchCount( searchWord: $searchWord, year: $year )
    }
`;
// this is a mutation that creates a review in the db
export const CREATE_REVIEW = gql`
    mutation addReviewForSong($userName: String!, $star: Int!, $description: String!, $songID: Int!) {
        addReview(userName: $userName, star: $star, description: $description, songID: $songID) {
            userName
            star
            description
            songID
        }
    }
`;
// gets the average review score of all the reviews to a specific song
export const GET_AVG_REVIEW_SCORE = gql`
    query ( $songID: Int ){
        reviewAvgScoreBySongID( songID:$songID ) {
        avgScore
        }
    }
`;
// gets the information of a specific song from songID
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
// gets the songs that can have a specific date, searchword and the right songs for the specific offset and order(pagiantion)
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
// this gets all the distinct years of the songs of the database to display in the searchbar
export const GET_DISTINCT_YEARS = gql`
    query {
        getDistinctYears
    }
`;