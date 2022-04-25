import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // Obter nomes de arquivos em /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" do nome do arquivo para obter o id
    const id = fileName.replace(/\.md$/, '')

    // Lê o arquivo de markdown como string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Usando o gray-matter para analisar a seção de metadados da postagem
    const matterResult = matter(fileContents)

    // Combina os dados com o id
    return {
      id,
      ...matterResult.data
    }
  })
  // Classificando por data
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  })
}