import SongCard from "../components/SongCard"
import renderer from 'react-test-renderer'
import { Song } from '../helpers/types'
import { MockedProvider } from "@apollo/client/testing";
import { GET_AVG_REVIEW_SCORE } from "../helpers/queries";
import { BrowserRouter } from "react-router-dom";

const dummySong: Song = {
    songID: 0,
    songName: "Oops!...I Did It Again",
    artistName: "Britney Spears",
    imageURL: "https://upload.wikimedia.org/wikipedia/en/2/24/Britney_Spears_-_Oops%2"
}

// reviewAvgScoreBySongID
const mocks = [{
    request: {
        query: GET_AVG_REVIEW_SCORE,
        variables: {
            songID: dummySong.songID
        }
    },
    result: {
        data: {
            reviewAvgScoreBySongID: [
                {
                    __typename: 'avgscore',
                    avgScore: 3.5
                }

            ]
        }
    }
}];

it('renders when passed a song', () => {
    const tree = renderer.create((<BrowserRouter><MockedProvider mocks={mocks} addTypename={false}><SongCard song={dummySong} /></MockedProvider></BrowserRouter>)).toJSON();
    expect(tree).toMatchSnapshot();
});
