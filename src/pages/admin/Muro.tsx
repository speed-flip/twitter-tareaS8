import axios from 'axios';
import { useEffect, useState } from 'react';
import { Post } from '../../interface';

function Muro() {

  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts();
    async function getPosts() {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/posts`;
        const { data } = await axios(url, { withCredentials: true });
        console.log(data);
        setPosts(data.posts);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  return isLoading ? (
    <p>Obteniendo publicaciones</p>
  ) : (
    <section>
      {posts.map(post => (
        <div key={post.id.toString()} className='mb-3'>
          <h2 className='text-xl font-bold'>{post.user_name}</h2>
          <p className='text-sm text-gray-700'>
            {post.created_date}
          </p>
          <p>{post.description}</p>
          <img
            src={`data:image/png;base64,${post.imagen}`}
            className='w-96'
          />
        </div>
      ))}
    </section>
  )
}

export default Muro;
