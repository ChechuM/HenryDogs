import './Error.css';
import errorImg from './412.jpg';

export default function Error() {
    return (
        <div>
            <img src={errorImg} alt='What are you doing here?' />
        </div>
    )
}