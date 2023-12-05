import { useEffect, useState } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom'
import axios from 'axios';

function AdminLayout() {

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    user_name: '',
    email: '',
  });

  useEffect(() => {
    validarAuth();
    async function validarAuth() {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/auth`;
        const { data } = await axios(url, { withCredentials: true });
        // console.log(data);
        setUser(data.user);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  if (isLoading) {
    return <p>Cargando...</p>
  }

  return user.user_name ? (
    <div className='md:flex'>
      <aside className='flex flex-col px-2 py-5 border-r md:w-4/12 xl:1/4 2xl:w-1/5'>
        <Link
          to='/perfil'
          className='w-full px-4 py-1 font-bold text-center text-white bg-blue-500 rounded'
        >
          Perfil
        </Link>
      </aside>

      <main className='h-screen overflow-y-scroll md:w-8/12 xl:3/4 2xl:w-4/5'>
        <div className='px-8 py-4'>
          <div className='flex justify-end'>
            <Link
              to='/crear-posts'
              className='px-3 py-1 my-3 font-bold text-white transition-colors bg-blue-500 rounded hover:cursor-pointer hover:bg-blue-600'
            >
              Crear Post
            </Link>
          </div>
          <Outlet />
        </div>
      </main>
    </div>
  ) : (
    <Navigate to='/auth/login' />
  );
}

export default AdminLayout;
