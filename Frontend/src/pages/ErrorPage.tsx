import { useNavigate } from 'react-router-dom';

const ErrorPage = ({message}: {message: string}) => {

    const nav = useNavigate();

    const backToHome = () => {
        nav('/')
        window.location.reload()
    }
    
    return (
        <div className="flexColCenterCenter">
            <button onClick={() => backToHome()}>Back to songsearch</button>
            <h2>{message}</h2>
        </div>
    )
}

export default ErrorPage;