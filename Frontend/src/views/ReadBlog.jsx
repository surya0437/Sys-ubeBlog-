import { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import axios from 'axios';

const navigation = [
    { name: 'Register', to: '/Register' },
    { name: 'Login', to: '/Login' },
];

export default function ReadBlog() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        async function fetchBlog() {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/getBlog/${id}`);
                setBlog(response.data);
            } catch (error) {
                console.error('Error fetching blog:', error);
                setBlog(null);
            }
        }
        fetchBlog();
    }, [id]);

    if (!blog) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-white">
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
            <div className="pt-6">
                <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 pb-6">
                    <div className="">
                        <div key={blog.id} className="overflow-hidden rounded-lg">
                            <img
                                src={blog.blogImage}
                                alt={blog.title}
                                className="h-96 w-full object-cover object-center"
                            />
                        </div>
                    </div>
                    <div className="max-w-2xl sm:px-6 lg:col-span-2 lg:px-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{blog.title}</h1>
                        <div className="mt-4 space-y-6">
                            <p className="text-base text-gray-900 text-justify">{blog.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
