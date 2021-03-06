import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';
import Link from 'next/link'
import { faEllipsisH, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
  const { info, results: defaultResults = [] } = data;

  const [ results, updateResults ] = useState(defaultResults)
  
  const [page, updatePage] = useState({
    ...info,
    current: ENDPOINT
  });

  const {current } = page;

  useEffect(() => {
    if(current === ENDPOINT) return;
    
    async function request() {
      const res = await fetch(current)
      const nextData = await res.json();
  
      updatePage({
        current, 
        ...nextData.info
      });
  
      if( !nextData.info?.prev) {
        updateResults(nextData.results);
        return;
      }
  
      updateResults(prev => {
        return [
          ...prev,
          ...nextData.results
        ]
      });
    }
  
    request();
  }, [current]);

  function handleLoadMore(){
    updatePage(prev => {
      return {
        ...prev,
        current: page?.next
      }
    })
  }
  
  function handleOnSubmitSearch(e) {
    e.preventDefault();

    const { currentTarget = {} } = e;
    const fields = Array.from(currentTarget?.elements);
    const fieldQuery = fields.find(field => field.name === 'query');
  
    const value = fieldQuery.value || '';
    const ENDPOINTF =  `https://rickandmortyapi.com/api/character/?name=${value}`;
    
    updatePage({
      current: ENDPOINTF
    });
  }

  console.log('data', data);
  return (
    <div className="container">
    
    <Head>
      <title>Mini wiki</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    
      <h1>Wubba Lubba Dub Dub!</h1>
      <p>Rick and Morty mini Wiki</p>

      <form className="search" onSubmit={handleOnSubmitSearch}>
        <input name="query" type="search" />
        <button><FontAwesomeIcon icon={faSearch} style={{color: "#42f5c5", fontSize: "20"}}/> </button>
      </form>

      <ul className="grid">
      {results.map(result => {
      const { id, name, image} = result;
      return(
        <li className="card" key={id}>
          <Link href="/character/[id]" as={`/character/${id}`}>
            <a>
              <img src={image} alt={`${name} Thumbnail`} />
              <h3>{name}</h3>
            </a>
          </Link>
        </li>
      ) 
      })}
      </ul>
      <p>
        <button onClick={handleLoadMore}> <FontAwesomeIcon icon={faEllipsisH} style={{color: "#42f5c5", fontSize: "50"}}/></button>
      </p>
      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        a {
          color: inherit;
          text-decoration: none;
        }
        .title a {
          color: #0070f3;
          text-decoration: none;
        }
        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }
        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }
        .title,
        .description {
          text-align: center;
        }
        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 800px;
          margin-top: 3rem;
          list-style: none;
          margin-left: 0;
          padding-left: 0;
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
        .logo {
          height: 1em;
        }
        button {
          border: none;
          background-color: transparent;
        }
        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
        .search input {
          margin-right: .5em;
        }
        @media (max-width: 600px) {
          .search input {
            margin-right: 0;
            margin-bottom: .5em;
          }
          .search input,
          .search button {
            width: 100%;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
