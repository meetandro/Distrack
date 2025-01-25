import { GetCollectibleByIdResponse } from "../../models/collectible";

interface Props {
    editing: boolean;
    images: (File | string)[];
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleRemoveImage: (index: number) => void;
    collectible: GetCollectibleByIdResponse;
}

export const ImagesDisplay = ({editing, collectible, images, handleFileChange, handleRemoveImage}: Props) => {
    return (
        <div>
            <label className="block text-sm mb-1">Images:</label>
            {editing ? (
                <>
                    <input
                        type="file"
                        name="images"
                        multiple
                        onChange={handleFileChange}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg text-gray-100"
                    />
                    <div className="flex flex-wrap mt-4">
                        {images.map((image, index) => (
                            <div key={index} className="relative m-1">
                                {typeof image === 'string' ? (  // URL case
                                    <img
                                        src={`https://localhost:5001${image}`} // Display existing image from URL
                                        alt={`Collectible ${index}`}
                                        className="w-20 h-20 object-cover"
                                    />
                                ) : (  // File object case
                                    <img
                                        src={URL.createObjectURL(image)} // Display file preview
                                        alt={`Collectible ${index}`}
                                        className="w-20 h-20 object-cover"
                                    />
                                )}
                                <button
                                    onClick={() => handleRemoveImage(index)}
                                    className="absolute top-0 right-0 text-red-500"
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="flex flex-wrap">
                    {collectible.imageUrls.map((image, index) => (
                        <img
                            key={index}
                            src={`https://localhost:5001${image}`} // Display existing image
                            alt={`Collectible ${index}`}
                            className="w-20 h-20 object-cover m-1"
                        />
                    ))}
                </div>
            )}
        </div>
    )
}