import Searchbar from '../components/Searchbar';
import SongTable from '../components/SongTable';
import ScrollButton from '../components/ScrollButton';
import PaginationComponent from '../components/PaginationComponent';

// this page shows all the components on the homepage
const HomePage = () => {

    return (
        <div className='flexColCenterCenter'>
            <Searchbar />
            <SongTable />
            <ScrollButton />
            <PaginationComponent />
        </div>
    )
}
export default HomePage;
