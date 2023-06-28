import Card from '../Card/Card';
import './Cards.css';
import { useSelector } from 'react-redux';
import loadingDog from '../../img/loadingDog.gif';

export default function Cards(props) {
    const dogShown = useSelector(store => store.dogShown)
    const loading = useSelector(state => state.loading)

    // Paginado
    const { currentPg } = props;
    const { ITEMS_PER_PAGE } = props;

    let min = currentPg * ITEMS_PER_PAGE
    let max = min + ITEMS_PER_PAGE

    return (
        <div>
            {(!loading) ? <div>
                <div className="divCards">
                    {
                        (dogShown.length) ? // rederizado condicional activado!

                            dogShown.map((d, i) => {
                                if (i >= min && i < max) {
                                    return < Card
                                        id={d.id}
                                        name={d.name}
                                        image={d.image}
                                        temperament={d.temperament}
                                        weight={d.weight}
                                    />
                                }
                            })
                            : <div>
                                <h1> Hummm ...</h1>
                                <img src='https://media.tenor.com/GTS2P-7x_ssAAAAM/funny-dog.gif' alt='what?' />
                                <h2>I'm sorry, that doesn't exist</h2>
                            </div>
                    }
                </div>
                {/* fin divCards */}
            </div>
                : <div>
                    <img src={loadingDog} alt='Loading resources' />
                    <p>{loading}</p>
                </div>

            }

        </div>
    )
}