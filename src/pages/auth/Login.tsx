import { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`;
      const { data: dataAxios } = await axios.post(url, data, { withCredentials: true });
      console.log(dataAxios);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='bg-white shadow p-3 sm:w-96'>
      <img
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/220px-Logo_of_Twitter.svg.png'
        className='mx-auto w-20 mb-4'
      />

      <div className='field-form'>
        <label
          htmlFor='email'
          className='text-sm font-bold text-gray-800'
        >
          Correo
        </label>
        <input
          type='email'
          id='email'
          name='email'
          className='border bg-gray-100 p-1 pl-3 rounded focus:shadow focus:outline-blue-600 placeholder:text-gray-900'
          placeholder='Ingrese su correo'
          value={data.email}
          onChange={onInputChange}
        />
      </div>

      <div className='field-form'>
        <label
          htmlFor='password'
          className='text-sm font-bold text-gray-800'
        >
          Contraseña
        </label>
        <input
          type='password'
          id='password'
          name='password'
          className='border bg-gray-100 p-1 pl-3 rounded focus:shadow focus:outline-blue-600 placeholder:text-gray-900'
          placeholder='Ingrese su contraseña'
          value={data.password}
          onChange={onInputChange}
        />
      </div>

      <input
        type='submit'
        value='Iniciar sesión'
        className='bg-blue-500 font-bold py-1 px-3 rounded w-full text-white my-3 hover:cursor-pointer hover:bg-blue-600 transition-colors'
      />

    </form>
  )
}

export default Login