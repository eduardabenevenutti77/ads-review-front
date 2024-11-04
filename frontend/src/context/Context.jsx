import { createContext, useEffect, useState } from "react";
import {jwtDecode} from 'jwt-decode';

// verifica se o token é válido
const isValidToken = (token) => {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000
    return decoded.exp > currentTime // tempo de expiração do token 
}

// pega a role do usuário
// função que retorna a permissão (role)
const getRole = (token) => {
    const decoded = jwtDecode(token);
    return decoded.role
}

// exportar o context 
export const AuthContext = createContext()

// exportar o provider
export const AuthProvider = ({ children }) => {
    // token, role , loading - estados
    const [token, setToken] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect (() => {
        const storageToken = localStorage.getItem("token")
        if (storageToken && isValidToken(storageToken)) {
            setToken(token)
            setRole(getRole(storageToken))
        } else {
            setToken(null)
            setRole(null)
            localStorage.removeItem("token")
        }
        setLoading(false)
    }, [])

    // função que chama o login
    const login = (token) => {
        setToken(token)
        setRole(getRole(token))
        localStorage.setItem('token', token)
    }

    const logout = () => {
        setToken(null)
        getRole(null)
        localStorage.removeItem('token')
    }

    if (loading) {
        return <div>Loading....</div>
    }

    return (
        <AuthContext.Provider value={{ token, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}