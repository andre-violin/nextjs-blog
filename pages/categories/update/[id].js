import axios from 'axios'
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "../../../components/layout";


export const getStaticPaths = async () => {
  const response = await axios.get('http://localhost:5000/categorias')
  const data = await response.data

  const paths = data.map(categoria => {
    return {
      params: { id: categoria.id.toString() }
    }
  })

  return {
    paths,
    fallback: false
  }
}


export const getStaticProps = async (context) => {
  const id = context.params.id;
  const response = await axios.get(`http://localhost:5000/categorias/${id}`)
  const categoria = await response.data
  return {
    props: {
      categoria
    }
  }
}

export default function Update({ categoria }) {
  const [values, setValues] = useState({
    nome: ""
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
      ...values,
      id: Number(categoria[0].id)
    }

    console.log('data', data);
    const response = await axios.put("http://localhost:5000/categorias/atualizar", data)


    if (!response.statusText === "OK") {
      toast.error("Erro ao alterar categoria!");
    } else {
      router.push('/categories/categories')
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setValues({ ...values, [id]: value });
  };

 const {nome} = values || categoria[0].nome;

  return (
    <Layout>
      <Link href="/">
        <a>Voltar</a>
      </Link>
      <h2>Alterar Categoria</h2>
      <p>Categoria {nome || categoria[0].nome}</p>
      <ToastContainer />
      <form onSubmit={handleSubmit}>        
        <div>
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            type="text"
            value={nome || categoria[0].nome}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Alterar Categoria</button>
      </form>
    </Layout>
  );
}
