import { useEffect, useState } from 'react';
// import { PhotoIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditBlog() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState({
        title: '',
        slug: '',
        description: '',
        status: false,
    });

    useEffect(() => {
        async function fetchBlog() {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/getBlog/${id}`);
                setBlog(response.data);
            } catch (error) {
                console.error('Error fetching blog:', error);
            }
        }
        fetchBlog();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setBlog({ ...blog, [name]: type === 'checkbox' ? checked : value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await axios.put(`http://127.0.0.1:8000/api/editBlog/${id}`, blog);
            alert('Blog updated successfully!');
            navigate('/Dashboard');
        } catch (error) {
            console.error('Error updating blog:', error);
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10">
                    <h2 className="mb-4 text-3xl font-semibold text-gray-600 dark:text-gray-300">Edit Blog</h2>
                    <div className="border-gray-900/10 pb-6">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                    Title
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        value={blog.title}
                                        onChange={handleInputChange}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="slug" className="block text-sm font-medium leading-6 text-gray-900">
                                    Slug
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="slug"
                                        id="slug"
                                        value={blog.slug}
                                        onChange={handleInputChange}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                    Description
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={3}
                                        value={blog.description}
                                        onChange={handleInputChange}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="status"
                                            name="status"
                                            type="checkbox"
                                            checked={blog.status}
                                            onChange={handleInputChange}
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="status" className="font-medium text-gray-900">
                                            Status
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Save
                </button>
            </div>
        </form>
    );
}

export default EditBlog;
