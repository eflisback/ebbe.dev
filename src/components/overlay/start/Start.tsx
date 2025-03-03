import styles from './Start.module.scss'

export const Start = () => {
    return (
        <div className={`${styles.overlay} ${styles.start}`}>
            <div className={styles.header}>
                <div>Logo</div>
                <div>Socials</div>
            </div>
        </div>
    )
}