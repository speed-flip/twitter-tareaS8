import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface IPerfil {
  email: string
  user_name: string
}


function Perfil() {

  const [isLoading, setIsLoading] = useState(false);
  const [perfil, setPerfil] = useState<IPerfil>({
    email: '',
    user_name: '',
  });

  useEffect(() => {
    validarAuth();
    async function validarAuth() {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/auth/profile`;
        const { data } = await axios(url, { withCredentials: true });
        // console.log(data);
        setPerfil(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  return isLoading ? (
    <div>Obteniendo Perfil</div>
  ) : (
    <div className=''>
      <p className='mb-3'>
        Nombre de usuario: {''}
        <span className='font-bold'>
          {perfil.user_name}
        </span>
      </p>
      <p className=''>
        Correo electronico: {''}
        <span className='font-bold'>
          {perfil.email}
        </span>
      </p>

      <Link
        to='/'
        className='block mt-5 text-blue-500 underline'
      >
        Volver al Muro
      </Link>
    </div>
  )
}

export default Perfil;
