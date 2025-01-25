import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CreateCollectibleRequest } from '../models/collectible';
import { CategoryForm } from '../components/category/category-form';
import { CategoryContext } from '../context/category-context';
import { CollectibleContext } from '../context/collectible-context';

export const CreateCollectible = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { categories } = useContext(CategoryContext);
    const [collectible, setCollectible] = useState<CreateCollectibleRequest>({
        name: '',
        description: '',
        color: 0,
        currency: '',
        value: 0,
        condition: 0,
        acquiredDate: new Date(),
        isPatented: false,
        collectionId: Number(id),
        categoryId: categories[0].id,
        images: [],
    });
    const [images, setImages] = useState<File[]>([]);
    const [showCreateCategory, setShowCreateCategory] = useState(false); // Toggle for CreateCategory component
    const { addCollectible } = useContext(CollectibleContext);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCollectible({
            ...collectible,
            [name]: value, // Parse categoryId to number
        });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCollectible({
            ...collectible,
            isPatented: e.target.checked,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages(Array.from(e.target.files));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        collectible.images = images;
        addCollectible(collectible)
        navigate(`/collections/${collectible.collectionId}`)
    };

    return (
        <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg text-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-center">Create Collectible</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
                <div>
                    <label className="block text-sm mb-1">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={collectible.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm mb-1">Description:</label>
                    <input
                        type="text"
                        name="description"
                        value={collectible.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm mb-1">Condition:</label>
                    <select
                        name="condition"
                        value={collectible.condition}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring focus:ring-blue-500"
                    >
                        <option value="" disabled>Select Condition</option>
                        <option value="0">Mint</option>
                        <option value="1">Very Good</option>
                        <option value="2">Good</option>
                        <option value="3">Acceptable</option>
                        <option value="4">Damaged</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm mb-1">Color:</label>
                    <select
                        name="color"
                        value={collectible.color}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring focus:ring-blue-500"
                    >
                        <option value="" disabled>Select Color</option>
                        <option value="0">Black</option>
                        <option value="1">Blue</option>
                        <option value="2">Bronze</option>
                        <option value="3">Crimson</option>
                        <option value="4">Cyan</option>
                        <option value="5">Dark Gray</option>
                        <option value="6">Forest Green</option>
                        <option value="7">Gold</option>
                        <option value="8">Gray</option>
                        <option value="9">Green</option>
                        <option value="10">Lime</option>
                        <option value="11">Orange</option>
                        <option value="12">Pink</option>
                        <option value="13">Purple</option>
                        <option value="14">Red</option>
                        <option value="15">Silver</option>
                        <option value="16">Violet</option>
                        <option value="17">Wheat</option>
                        <option value="18">White</option>
                        <option value="19">Yellow</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm mb-1">Currency:</label>
                    <input
                        type="text"
                        name="currency"
                        value={collectible.currency}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm mb-1">Value:</label>
                    <input
                        type="number"
                        name="value"
                        value={collectible.value}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="text-sm mb-1 flex items-center">
                        Is Patented:
                        <input
                            type="checkbox"
                            name="isPatented"
                            checked={collectible.isPatented}
                            onChange={handleCheckboxChange}
                            className="ml-2"
                        />
                    </label>
                </div>
                <div>
                    <label className="block text-sm mb-1">Category:</label>
                    <select
                        name="categoryId"
                        value={collectible.categoryId}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring focus:ring-blue-500"
                    >
                        {categories.length > 0 ? (
                            categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))
                        ) : (
                            <option value="">No categories available</option>
                        )}
                    </select>
                    <button
                        type="button"
                        onClick={() => setShowCreateCategory(true)} // Toggle CreateCategory
                        className="block text-blue-500 hover:underline mt-2"
                    >
                        Create a New Category
                    </button>
                </div>
                <div>
                    <label className="block text-sm mb-1">Images:</label>
                    <input
                        type="file"
                        name="images"
                        multiple
                        onChange={handleFileChange}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition-all"
                >
                    Create Collectible
                </button>
            </form>

            {showCreateCategory && (
                <div className="mt-6 bg-gray-700 p-4 rounded-lg">
                    <CategoryForm
                        onClose={() => setShowCreateCategory(false)} // Close CreateCategory
                    />
                </div>
            )}
        </div>
    );
};
