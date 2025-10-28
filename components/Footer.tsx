import styles from './Footer.module.css'

export const FooterContent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.linksContainer}>
        <a 
          href="https://github.com/luckyyaduvanshiofficial/codai" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.link}
        >
          Main Project
        </a>
        <span className={styles.separator}>•</span>
        <a 
          href="https://github.com/luckyyaduvanshiofficial/codai-web" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.link}
        >
          Website
        </a>
        <span className={styles.separator}>•</span>
        <a 
          href="https://github.com/luckyyaduvanshiofficial/codai-docs" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.link}
        >
          Documentation
        </a>
      </div>
      <span className={styles.copyright}>
        MIT {new Date().getFullYear()} © <a 
          href="https://luckyyaduvanshiofficial.github.io" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.authorLink}
        >
          Lucky Yaduvanshi Official
        </a>
      </span>
    </div>
  )
}
