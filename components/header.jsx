import styles from '@/styles/Home.module.css'
export default function header() {
    return(
        <div className={styles.header}>
          <img className={styles.logo} src="/logo-yc-icon.svg" alt="Logo YouCom" />
          <svg style={{cursor:"pointer"}} viewBox="0 0 24 24" width="24" height="24" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          <span style={{marginLeft:"5px", cursor:"pointer"}}>todas as categorias</span>
          <i className={styles.iconLogin}></i>
          <span style={{marginRight: "35px", cursor:"pointer"}}>entre ou cadastre-se</span>
          <i className={styles.iconFav}></i>
          <i className={styles.iconCart}></i>
        </div>
    )
}