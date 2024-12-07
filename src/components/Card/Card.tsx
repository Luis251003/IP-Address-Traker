import { isAxiosError } from 'axios';
import styles from './Card.module.css'

interface Props{
    data: DataDTO|null;
}

const Card = ({data}:Props) =>{
    if(isAxiosError(data)){
        return (
            <div className={`${styles.card} ${styles.card__error}`}>
                <div className={styles.card__info}>
                    <h3 className={styles.card__title}>Error de Servidor</h3>
                    <p className={styles.card__text}>No fue posible establecer conexión con el servidor</p>
                </div>
            </div>
        )
    }
    return(
        <div className={styles.card}>
            <div className={styles.card__info}>
                <h3 className={styles.card__title}>ip address</h3>
                <p className={styles.card__text}>{data?.ip}</p>
            </div>
            <div className={styles.card__info}>
                <h3 className={styles.card__title}>location</h3>
                <p className={styles.card__text}>{`${data?.location.region}, ${data?.location.country} ${data?.location.postalCode!==undefined ? data?.location.postalCode : ""}`}</p>
            </div>
            <div className={styles.card__info}>
                <h3 className={styles.card__title}>time zone</h3>
                <p className={styles.card__text}>{`UTC ${data?.location.timezone}` }</p>
            </div>
            <div className={styles.card__info}>
                <h3 className={styles.card__title}>isp</h3>
                <p className={styles.card__text}>{!data?.isp ? 'Desconocido' : data?.isp}</p>
            </div>
        </div>
    )
}
export default Card;