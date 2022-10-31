import ScrollButton from "../components/ScrollButton"
import renderer from 'react-test-renderer'


it('scrollbutton renders', () => {
    const tree = renderer.create((<ScrollButton />)).toJSON();
    expect(tree).toMatchSnapshot();
});
