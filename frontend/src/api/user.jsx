import api from "./api"

// função de criar usuário | user será um objeto, = [name, email, password]
export const createUser = async (user) => {
   const response = await api.post('/api/v1/user', user)
   console.log(response)
   return response.data
}

// função para realizar o login
export const loginUser = async (email, senha) => {
    const response = await api.post('/api/v1/login', {email, senha})
    console.log(response)
    return response.data
}

// função para achar o usuário (perfil)
export const getContext  = async () => {
    const response = await api.get('/api/v1/user/context')
    console.log(response)
    return response.data
}

// função para alterar
export const updateUser = async (id, user) => {
    const response = await api.put(`/api/v1/user/${id}`, user)
    console.log(response)
    return response.data
}

// função para deletar
export const deleteUser = async (id) => {
    return  api.delete(`/api/v1/user/${id}`)
}