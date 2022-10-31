import ScrollButton from "../components/ScrollButton"
import renderer from 'react-test-renderer'
import { render, screen } from '@testing-library/react';


it('scrollbutton renders', () => {
    const tree = renderer.create((<ScrollButton />)).toJSON();
    expect(tree).toMatchSnapshot();
});
