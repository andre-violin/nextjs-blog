import axios from 'axios'
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "../../components/layout";


export const getStaticProps = async () => {
  const response = await axios.get('http://localhost:5000/categorias')
  const categorias = await response.data
  return {
    props: {
      categorias
    }
  }
}

export default function Add({ categorias }) {
  const [values, setValues] = useState({
    categoria_id: "",
    titulo: "",
    data: "",
    conteudo: "",
  });

  let router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emptyFieldCheck = Object.values(values).some(
      (element) => element === ""
    )
    if (emptyFieldCheck) {
      toast.error("Preencha todos os campos!");
      return
    }
    const data = {
      ...values
    }

    const response = await axios.post("http://localhost:5000/posts/inserir", data)


    if (!response.statusText === "OK") {
      toast.error("Erro ao adicionar post!");
    } else {
      router.push('/')
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setValues({ ...values, [id]: value });
  };

  const { categoria_id, titulo, data, conteudo } = values;

  return (
    <Layout>
      <Link href="/">
        <a>Voltar</a>
      </Link>
      <h2>Adicionar Postagem</h2>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="categoria_id">Categoria</label>
          <select
            id="categoria_id"
            value={categoria_id}
            onChange={handleInputChange}
          >
            {categorias.map(({ id, nome }) => (
              <option key={id} value={id}>{nome}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="titulo">Título</label>
          <input
            id="titulo"
            type="text"
            value={titulo}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="data">Data</label>
          <input
            id="data"
            type="date"
            value={data}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="conteudo">Conteúdo</label>
          <textarea
            id="conteudo"
            type="text"
            value={conteudo}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Adicionar Post</button>
      </form>
    </Layout>
  );
}
