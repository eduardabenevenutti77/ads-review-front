import axios from 'axios'

// reduz o tamanho das requisições

// criando a config do axios - conectando o back com o frontend
const api = axios.create({
    baseURL: 'http://localhost:3000', // sem endpoint, pois é mutável para cada requisição
    timeout: 60000, // tempo limite de espera
})

api.interceptors.request.use(
    (config => {
        const token = localStorage.getItem("token") // o getItem pega alguma informação do cache do navegador
        if (token) {
            // passar o token no authorization da req
            config.headers.Authorization = token
        }
        return config
    })
)

export default api // exportando a API