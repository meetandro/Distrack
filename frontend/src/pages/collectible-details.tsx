import { useContext, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ModifyTags } from '../components/tag/modify-tags';
import { ColorDisplay } from '../components/common/ColorDisplay';
import { ConditionDisplay } from '../components/common/ConditionDisplay';
import { CategoryDisplay } from '../components/common/CategoryDisplay';
import { ImagesDisplay } from '../components/common/ImagesDisplay';
import { useCollectible } from '../hooks/use-collectibles';
import { Input, Stack } from '@chakra-ui/react';
import { Field } from '../components/ui/field';
import { FaRegEdit } from 'react-icons/fa';
import { TagProvider } from '../context/tag-context';
import { CategoryContext } from '../context/category-context';
import { CollectibleContext } from '../context/collectible-context';

export const CollectibleDetails = () => {
    const { collectibleId } = useParams<{ collectibleId: string }>();
    const navigate = useNavigate();
    const { collectible, images, handleInputChange, handleFileChange, handleRemoveImage } = useCollectible(Number(collectibleId));
    const { categories } = useContext(CategoryContext)
    const { editCollectible, removeCollectible } = useContext(CollectibleContext);
    const [isEditing, setIsEditing] = useState(false);

    if (!collectible) return <p>Loading...</p>;

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-1/2 mx-auto bg-gray-800 p-6 rounded-lg shadow-lg text-gray-100 my-10">
                <h2 className="text-2xl font-bold mb-6 text-center">Collectible Details</h2>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="text-blue-500 hover:underline flex items-center"
                        >
                            {isEditing ? <><FaRegEdit /> Cancel</> : <FaRegEdit />}
                        </button>
                    </div>

                    <div className="space-y-4">
                        <Stack>
                            <Field label={"Name"}>
                                <Input
                                    _disabled={{
                                        color: 'white',
                                        opacity: 1,
                                    }}
                                    type="text"
                                    name="name"
                                    value={collectible.name}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                />
                            </Field>

                            <Field label={"Description"}>
                                <Input
                                    _disabled={{
                                        color: 'white',
                                        opacity: 1,
                                    }}
                                    type="text"
                                    name="description"
                                    value={collectible.description}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                />
                            </Field>

                            <Field label={"Currency"}>
                                <Input
                                    _disabled={{
                                        color: 'white',
                                        opacity: 1,
                                    }}
                                    type="text"
                                    name="currency"
                                    value={collectible.currency}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                />
                            </Field>

                            <Field label={"Value"}>
                                <Input
                                    _disabled={{
                                        color: 'white',
                                        opacity: 1,
                                    }}
                                    type="number"
                                    name="value"
                                    value={collectible.value}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                />
                            </Field>

                            <ConditionDisplay editing={isEditing} collectible={collectible} handleInputChange={handleInputChange} />

                            <ColorDisplay editing={isEditing} collectible={collectible} handleInputChange={handleInputChange} />

                            <CategoryDisplay editing={isEditing} collectible={collectible} categories={categories ?? []} handleInputChange={handleInputChange} />

                            <ImagesDisplay editing={isEditing} collectible={collectible} images={images} handleFileChange={handleFileChange} handleRemoveImage={handleRemoveImage} />
                        </Stack>

                        {isEditing && (
                            <button
                                onClick={() => { editCollectible(collectible, images); setIsEditing(false); }}
                                className="w-full py-2 mt-6 bg-green-600 rounded-lg hover:bg-green-500 transition-all flex items-center justify-center"
                            >
                                Save Changes
                            </button>
                        )}
                    </div>

                    <button
                        onClick={() => { removeCollectible(collectible.id); navigate(`/collections/${collectible?.collectionId}`); }}
                        className="w-full py-2 mt-6 bg-red-600 rounded-lg hover:bg-red-500 transition-all flex items-center justify-center"
                    >
                        Delete Collectible
                    </button>

                    <TagProvider>
                        <ModifyTags />
                    </TagProvider>

                    <Link to={`/collections/${collectible.collectionId}`} className="w-full py-2 mt-6 bg-cyan-600 rounded-lg hover:bg-cyan-500 transition-all flex items-center justify-center">
                        Back to collection
                    </Link>
                </div>
            </div>
        </div>
    );
};
