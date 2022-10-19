import { useNavigate } from 'react-router-dom';

const ErrorPage = ({message}: {message: string}) => {

    const nav = useNavigate();

    return (
        <div className="flexColCenterCenter">
            <button onClick={() => nav('/')}>Back to songsearch</button>
            <h2>{message}</h2>
        </div>
    )
}

export default ErrorPage;