import {FaArrowCircleUp} from 'react-icons/fa';

// this is a button to scroll to the top, it is part of the universal design
const ScrollButton = () => {

    const handleScrollUp = () => {
        window.scrollTo( { left: 0, top: 0, behavior: 'smooth' } )
    }

    return(
        <FaArrowCircleUp onClick={handleScrollUp} className='button4'></FaArrowCircleUp>
    );
}

export default ScrollButton;
