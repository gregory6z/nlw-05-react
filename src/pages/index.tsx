import { GetStaticProps } from 'next'
import { api } from '../services/api'
import Image from 'next/image'
import { format, parseISO } from 'date-fns'
import fr from 'date-fns/locale/fr'
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString'
import styles from './home.module.scss'
import Link from 'next/link'

type Episode = {
  id: string;
  title: string;
  members: string;
  publishedAt: string;
  thumbnail: string;
  duration: number;
  durationAsString: number;
  url: string;


}
type HomeProps = {
  lastestEpisodes: Episode[]
  allEpisodes: Episode[]
}

export default function Home({ lastestEpisodes, allEpisodes }: HomeProps) {
  return (
    <div className={styles.homepage}>
      <section className={styles.lastestEpisodes}>
        <h2>Derniers épisodes</h2>

        <ul>
          {lastestEpisodes.map(episode => {
            return (
              <li key={episode.id}>
                <Image
                  width={192}
                  height={192}
                  src={episode.thumbnail}
                  alt={episode.title}
                  objectFit="cover"
                />
                <div className={styles.episodeDetails}>

                  <Link href={`/episodes/${episode.id}`}>
                    <a>{episode.title}</a>
                  </Link>

                  <p>{episode.members}</p>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationAsString}</span>
                </div>

                <button type='button'>
                  <img src="/play-green.svg" alt="commencer" />
                </button>

              </li>
            )
          })}
        </ul>
      </section>
      <section className={styles.allEpisodes}>
        <h2>Tous les épisodes</h2>

        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Membres</th>
              <th>Date</th>
              <th>Duration</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allEpisodes.map(episode => {
              return (
                <tr key={episode.id}>
                  <td style={{ width: 72 }}>
                    <Image
                      width={120}
                      height={120}
                      src={episode.thumbnail}
                      alt={episode.title}
                      objectFit={'cover'}
                    />
                  </td>
                  <td>

                    <Link href={`/episodes/${episode.id}`}>
                      <a>{episode.title}</a>
                    </Link>

                  </td>
                  <td>{episode.members}</td>
                  <td style={{ width: 110 }}>{episode.publishedAt}</td>
                  <td>{episode.durationAsString}</td>
                  <td>
                    <button type="button">
                      <img src="/play-green.svg" alt="play" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>


        </table>

      </section>

    </div>


  )
}
export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd Mmm yy', { locale: fr }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      url: episode.file.url,
    }
  })

  const lastestEpisodes = episodes.slice(0, 2)
  const allEpisodes = episodes.slice(2, episodes.length)

  return {
    props: {
      lastestEpisodes,
      allEpisodes
    },
    revalidate: 60 * 60 * 8,
  }
}