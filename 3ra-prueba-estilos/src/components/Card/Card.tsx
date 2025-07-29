//import "./Styles.css"
//import styles from './Card.module.css';
import styles from './Card.module.scss';

const Card = () => {
    return (
        <div className={styles.card}>
            <img src="https://i.pinimg.com/1200x/a1/73/28/a17328784d491ab1c5cd02507325bd9a.jpg" alt="" />
            <h2>Card Title</h2>
            <p>This is a simple card component.</p>
            <button>Ver más</button>
        </div>
    );
}

export default Card;