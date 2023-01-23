import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
export default function header(props) {

    function favFunc(nome, condicao) {
        if (condicao.includes('iconFavD')) {
            sessionStorage.setItem(nome, nome)
            setIconFav(styles.iconFavA)
        } else {
            sessionStorage.removeItem(nome)
            setIconFav(styles.iconFavD)
        }
    }

    const [iconFav, setIconFav] = useState(styles.iconFavD)
    useEffect(() => {
        typeof sessionStorage !== "undefined" && sessionStorage.getItem(props.name) ? setIconFav(styles.iconFavA) : setIconFav(styles.iconFavD)
    }, [])



    return (
        <div className={styles.prodPai}>
            <div className={styles.aligner}>
                <div className={styles.divProdImg}>
                    <img className={styles.prodImg} src={props.imgURL} alt="desc" />
                </div>
                <i className={iconFav} onClick={e => favFunc(props.name, e.target.className)}></i>
                <span className={styles.prodName}>{props.name}</span>
                <div><span className={styles.precoAntigo}>{props.oPrice}</span><span className={styles.precoNovo}>{props.nPrice}</span></div>
                <span className={styles.prodAval}>Avaliações: {props.rating}</span>
            </div>
        </div>
    )
}