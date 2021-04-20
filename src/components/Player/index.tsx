import styles from './styles.module.scss'

export function Player() {
  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="Jouer maintenant" />
        <strong>Jouer maintenant</strong>
      </header>

      <div className={styles.emptyPlayer}>
        <strong>Sélectionnez un podcast à écouter </strong>
      </div>

      <footer className={styles.empty}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>
            <div className={styles.emptySlider} />
          </div>
          <span>00:00</span>
        </div>

        <div className={styles.buttons}>
          <button type="button">
            <img src="/shuffle.svg" alt="mélanger" />
          </button>
          <button type="button">
            <img src="/play-previous.svg" alt="jouer précédent" />
          </button>
          <button type="button" className={styles.playButton}>
            <img src="/play.svg" alt="jouer" />
          </button>
          <button type="button">
            <img src="/play-next.svg" alt="jouer suivant" />
          </button>
          <button type="button">
            <img src="/repeat.svg" alt="répéter" />
          </button>
        </div>
      </footer>
    </div>
  )
}