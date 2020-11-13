import Head from 'next/head'
import styles from '../styles/Home.module.css'

const ENDPOINT = `https://rickandmortyapi.com/api/character/`;



export async function getServerSideProps() {
  const res = await fetch(ENDPOINT)
  const data = await res.json();
  return {
    props: {
      data
    }
  }
}


export default function Home({ data }) {
  const { results = [] } = data;
  console.log('data', data);
  return (
    <div className="contaier">
      <h1>Wubba Lubba Dub Dub!</h1>
      <p>Rick and Morty mini Wiki</p>

      <ul className="grid">
      {results.map(result => {
      const { id, name, image} = result;
      return(
        <li className="card" key={id}>
          <a href="#">
            <img src={image} alt={`${name} Thumbnail`} />
            <h3>{name}</h3>
          </a>
        </li>
      ) 
      })}
      </ul>
      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        a {
          color: inherit;
          text-decoration: none;
        }
        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 800px;
          margin-top: 3rem;
        }
        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }
        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }
        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }
        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }
        
    `}</style>
    </div>
  )
}
