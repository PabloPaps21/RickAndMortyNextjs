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
  console.log('data', data);
  return (
    <div className="contaier">
      <h1>Hola</h1>
    </div>
  )
}
