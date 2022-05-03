import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import { useRouter } from "next/router";
import Link from 'next/link';

export const getStaticProps = async () => {
  const response = await axios.get('http://localhost:5000/categorias')
  const allCategoriesData = await response.data
  return {
    props: {
      allCategoriesData
    }
  }
}

export default function Categories({ allCategoriesData }) {

  let router = useRouter();


  const handleDelete = async event => {
    event.preventDefault()
    const { id } = event.target
    const data = {
      id: Number(id)
    }
    const response = await axios.delete(`http://localhost:5000/categorias/deletar`, { data: data })

    if (!response.statusText === "OK") {
      toast.error("Erro ao excluir a categoria!");
    } else {
      router.push('/')
    }
  }

  return (
    <Layout categories>

      <section className={`${utilStyles.headingMD} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allCategoriesData.map(({ id, nome }) => (
            <li className={utilStyles.listItem} key={id}>
              <h3>{id} - {nome}</h3>
              <button id={id} onClick={handleDelete}>Excluir</button>
              <Link href={`/categories/update/${id}`}>
                <a>Alterar</a>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
