import { useState } from 'react';
import './styles.css'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createUser } from '../../api/user';

export default function SignUp() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Devera criar usuario
      const response = await createUser({nome, email, senha})
      if(response.id){
        // se houver um ID, ele redireciona para tela de login
        return navigate('/login')
      } else {
        return toast('Erro inesperado, tente novamente mais tarde!')
      }
    } catch (error) {
      console.log(error)
      if (error.status === 403) {
        return toast("Sem permissão.");
      }
      if (error.status === 401 || error.status === 404) {
        return toast('Email ou senha inválido, tente novamente!');
      }
      toast('Erro inesperado, tente novamente mais tarde!');
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form">
        <h2>Cadastre-se</h2>
        <div className="input-group">
          <label htmlFor="nome">Nome:</label>
          <input type="text" id="nome" required value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-group">
          <label htmlFor="senha">Senha:</label>
          <input type="password" id="senha" required value={senha} onChange={(e) => setSenha(e.target.value)}/>
        </div>
        <button className="button" type="submit" onClick={handleSubmit}>Cadastrar-se</button>
        <button className="button back-button" onClick={handleBackClick}>
          Voltar
        </button>
      </form>
    </div>
  );
}
