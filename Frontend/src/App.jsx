import { Disclosure } from '@headlessui/react';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const navigation = [
  { name: 'Register', to: '/Register' },
  { name: 'Login', to: '/Login' },
];

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/getPublishedBlog');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="hidden md:block">
                  <div className="flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.to}
                        className='text-gray-300 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Disclosure>
        <main className="grid min-h-full place-items-center bg-white px-6 lg:px-8">
            <h1 className='text-3xl font-bold mt-3'>Welcome to SysǪube Blog</h1>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl sm:py-6 lg:max-w-7xl lg:px-8">
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {blogs.map((blog) => (
                            <div key={blog.id} className="group relative">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img
                                        src={blog.blogImage}
                                        alt={blog.title}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-xl text-gray-700">
                                            {blog.title}
                                        </h3>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">{new Date(blog.created_at).toLocaleDateString()}</p>
                                </div>
                                <div className="mt-4">
                                    <NavLink
                                        to={`/ReadBlog/${blog.id}`} // Assuming you pass blog id as parameter
                                        className="text-gray-300 bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                                    >
                                        Read
                                    </NavLink>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
      </div>
    </>
  );
}
