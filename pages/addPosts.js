import axios from 'axios'
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "../components/layout";


export default function addPosts() {
  const [values, setValues] = useState({
    title: "",
    date: "",
    body: "",
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
    // APENAS PARA QUEM ESTA USANDO O STRAPI
    const data = {
      data: { ...values }
    }

    const response = await axios.post("http://localhost:1337/api/posts", data)


    if (!response.statusText === "OK") {
      toast.error("Erro ao adicionar post!");
    } else {
      // const post = await response.data.data
      // console.log('post', post.id);
      router.push('/')
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setValues({ ...values, [id]: value });
  };

  const { title, date, body } = values;

  return (
    <Layout>
      <Link href="/">
        <a>Voltar</a>
      </Link>
      <h2>Adicionar Postagem</h2>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Título</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="date">Data</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="body">Conteúdo</label>
          <textarea
            id="body"
            type="text"
            value={body}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Adicionar Post</button>
      </form>
    </Layout>
  );
}
