import Card from '../Card/Card';
import './Cards.css';
import { useSelector } from 'react-redux';

export default function Cards(props) {
    const dogShown = useSelector(store => store.dogShown)
    // Paginado
    const { currentPg } = props;
    const { ITEMS_PER_PAGE } = props;

    let min = currentPg * ITEMS_PER_PAGE
    let max = min + ITEMS_PER_PAGE
    return (
        <div className="divCards">
            {
                dogShown.map((d, i) => {
                    if (i >= min && i <= max) {
                        return < Card
                            id={d.id}
                            name={d.name}
                            image={d.image}
                            temperament={d.temperament}
                            weight={d.weight}
                        />
                    }
                })
            }
        </div>
    )
}