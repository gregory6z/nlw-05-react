import format from 'date-fns/format'
import fr from 'date-fns/locale/fr'
import styles from './styles.module.scss'

export function Header() {
  const currentDate = format(new Date(), 'EEEE , d MMMM', {
    locale: fr
  })
  return (
    <header className={styles.headerContainer}>
      <img src="/logo.svg" alt="podecastr" />

      <p> Le meilleur pour toi d'écouter, toujours</p>
      <span>{currentDate}</span>
    </header>
  )
}