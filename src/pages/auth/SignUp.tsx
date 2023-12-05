import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import { User } from '../../interface';
import { useNavigate } from 'react-router-dom';

function SignUp() {

  const navigate = useNavigate();

  const [data, setData] = useState<User>({
    name: '',
    user_name: '',
    email: '',
    password: '',
  });

  const [user, setUser] = useState<User>({
    name: '',
    user_name: '',
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
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`;
      const { data: dataAxios } = await axios.post(url, data);
      console.log(dataAxios);
      setUser(dataAxios.usuario[0]);
      setData({
        name: '',
        user_name: '',
        email: '',
        password: '',
      });
      setTimeout(() => {
        navigate('/auth/login');
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

      {user.user_name ? <p className='text-center py-1 bg-green-300 rounded mb-2'>Cuenta creada correctamente</p> : null}

      <div className='field-form'>
        <label
          htmlFor='name'
          className='text-sm font-bold text-gray-800'
        >
          Nombre
        </label>
        <input
          id='name'
          name='name'
          className='border bg-gray-100 p-1 pl-3 rounded focus:shadow focus:outline-blue-600 placeholder:text-gray-900'
          placeholder='Ingrese su nombre'
          value={data.name}
          onChange={onInputChange}
        />
      </div>

      <div className='field-form'>
        <label
          htmlFor='user_name'
          className='text-sm font-bold text-gray-800'
        >
          Nombre de usuario
        </label>
        <input
          id='user_name'
          name='user_name'
          className='border bg-gray-100 p-1 pl-3 rounded focus:shadow focus:outline-blue-600 placeholder:text-gray-900'
          placeholder='Ingrese su username'
          value={data.user_name}
          onChange={onInputChange}
        />
      </div>

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
        value='Crear cuenta'
        className='bg-blue-500 font-bold py-1 px-3 rounded w-full text-white my-3 hover:cursor-pointer hover:bg-blue-600 transition-colors'
      />

    </form>
  )
}

export default SignUp