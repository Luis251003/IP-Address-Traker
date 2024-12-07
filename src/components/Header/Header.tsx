import styles from './Header.module.css'
import button from '../../assets/images/icon-arrow.svg'
import { useState } from 'react'

interface Props{
    ip:string,
    setIp: (ip:string) => void
}

const Header = ({ip,setIp}:Props) =>{

    //Campo IP Temporal
    const [input,setInput]= useState(ip);
    const [error, setError] = useState('');

    // Validar dirección IP
    const isValidIp = (ip: string): boolean => {
        const ipRegex = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;
        return ipRegex.test(ip);
    };

    //Ejecutar Submit
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isValidIp(input)) {
            setError('');
            setIp(input);
        } else {
            setError('Ingresa una dirección IP válida');
        }
    };

    return(
        <header className={styles.header}>
            <h1 className={styles.title}>IP Address Tracker</h1>
            
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.input__container}>
                    <input className={styles.input} type="text" value={input} onChange={(e)=>{setInput(e.target.value)}} placeholder='Search for any IP address or domain'/>
                    <button className={styles.button} type="submit">
                        <img src={button} alt="" />
                    </button>
                </div>
                {error && <p className={styles.error}>{error}</p>}
            </form>


        </header>
    )
}

export default Header