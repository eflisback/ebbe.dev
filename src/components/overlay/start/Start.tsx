import styles from './Start.module.scss'

export const Start = () => {
    return (
        <div className={`${styles.overlay} ${styles.start}`}>
            <div className={styles.header}>
                <div className={styles.logo}>
                    <span>ebbe</span>
                    .
                    <span className={styles.gradientText}>dev</span>
                </div>
                <div>Socials</div>
            </div>
        </div>
    )
}