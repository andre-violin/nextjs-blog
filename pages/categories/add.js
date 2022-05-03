import axios from 'axios'
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "../../components/layout";

export default function Add({ categorias }) {
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
      ...values
    }

    const response = await axios.post("http://localhost:5000/categorias/inserir", data)


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

  const { nome } = values;

  return (
    <Layout>
      <Link href="/">
        <a>Voltar</a>
      </Link>
      <h2>Adicionar Categoria</h2>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome </label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Adicionar Categoria</button>
      </form>
    </Layout>
  );
}
