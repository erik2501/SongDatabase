import ReviewCard from "../components/ReviewCard"
import renderer from 'react-test-renderer'


it('renders when passed name and rating and description', () => {
    const tree = renderer.create((<ReviewCard userName='snapshotTestName' star={1} description="bra" />)).toJSON();
    expect(tree).toMatchSnapshot();
});

