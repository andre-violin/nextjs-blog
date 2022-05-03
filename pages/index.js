import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.css'

export const getStaticProps = async () => {
  const response = await axios.get('http://localhost:5000/posts')
  const allPostsData = await response.data
  return {
    props: {
      allPostsData
    }
  }
}


export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>Next.js Blog</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>André Violin</p>
        <p>
          <Link href="/posts/add">
            <a>Adicionar Post</a>
          </Link>
        </p>
        <p>
          <Link href="/categories/categories">
            <a>Categorias</a>
          </Link>
        </p>
        <p>
          <Link href="/categories/add">
            <a>Adicionar Categorias</a>
          </Link>
        </p>
      </section>
      <section className={`${utilStyles.headingMD} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, categoria_id, titulo, conteudo}) => (
            <li className={utilStyles.listItem} key={id}>
              <p>{categoria_id}</p>
              <Link href="/posts/1">
                <a>{titulo}</a>
              </Link>
              <div>{conteudo}</div>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
