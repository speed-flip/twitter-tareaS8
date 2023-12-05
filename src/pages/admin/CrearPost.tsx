import { FormEvent, useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

function CrearPost() {
  const navigate = useNavigate();

  const [description, setDescription] = useState('');

  const [imagen, setImagen] = useState<File>();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const frm = new FormData();
    frm.append('description', description);
    frm.append('imagen', imagen!);
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/posts`;
      await axios.post(url, frm, { withCredentials: true });
      // console.log(data);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className=''>

      <div className='my-3'>
        <label
          htmlFor='imagen'
          className='px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded-none hover:cursor-pointer'
        >
          Seleccionar imagen
        </label>
        <input
          type='file'
          id='imagen'
          name='imagen'
          className='hidden'
          onChange={e => {
            if (e.target.files) {
              setImagen(e.target.files[0]);
            }
            console.log(e.target.files![0]);
          }}
        />
      </div>

      <div className='field-form'>
        <label
          htmlFor='description'
          className='text-sm font-bold text-gray-800'
        >
          Descipcion
        </label>
        <textarea
          id='description'
          name='description'
          className='h-40 p-1 pl-3 bg-gray-100 border rounded resize-none focus:shadow focus:outline-blue-600 placeholder:text-gray-900'
          placeholder='Descripcion del post'
          value={description}
          onChange={e => setDescription(e.target.value)}
        ></textarea>
      </div>

      <input
        type='submit'
        value='Crear Post'
        className='w-full px-3 py-1 my-3 font-bold text-white transition-colors bg-blue-500 rounded hover:cursor-pointer hover:bg-blue-600'
      />

    </form>
  )
}

export default CrearPost;
