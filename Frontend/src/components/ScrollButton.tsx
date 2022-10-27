import {FaArrowCircleUp} from 'react-icons/fa';


const ScrollButton = () => {

    const handleScrollUp = () => {
        window.scrollTo( { left: 0, top: 0, behavior: 'smooth' } )
    }

    return(
        <FaArrowCircleUp onClick={handleScrollUp} className='button4'></FaArrowCircleUp>
    );
}

export default ScrollButton;
