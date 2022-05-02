import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'

export const getStaticProps = async () => {
  const response = await axios.get('http://localhost:5000/categorias')
  console.log(response);
  const allCategoriesData = await response.data
  return {
    props: {
        allCategoriesData
    }
  }
}

const handleDelete = async event => {
    event.preventDefault()
    const {id} = event.target
    const data = {
        id
    }
    const response = await axios.delete(`http://localhost:5000/categorias/deletar`, data)

    if (!response.statusText === "OK") {
        toast.error("Erro ao excluir a categoria!");
      } else {        
        router.push('/')
      }
}


export default function Categories({ allCategoriesData }) {
  return (
    <Layout categories>
      
      <section className={`${utilStyles.headingMD} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allCategoriesData.map(({ id, nome }) => (
            <li className={utilStyles.listItem} key={id}>
              <h3>{id} - {nome}</h3>              
              <button id={id} onClick={handleDelete}>Excluir</button>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
