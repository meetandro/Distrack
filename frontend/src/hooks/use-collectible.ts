import { useCallback, useEffect, useState } from "react";
import { CreateCollectibleRequest, GetCollectibleByIdResponse } from "../models/collectible";
import CollectibleService from "../services/collectible-service";
import { useNavigate } from "react-router-dom";

export const useCollectible = (id?: number) => {
    const [collectible, setCollectible] = useState<GetCollectibleByIdResponse>();
    const [images, setImages] = useState<(File | string)[]>([]); // mixed types: both URLs and File objects
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const navigate = useNavigate();

    const fetchCollectible = useCallback(async () => {
        try {
            const data = await CollectibleService.getById(Number(id));
            setCollectible(data);

            // Initialize images with the current image URLs from the collectible
            setImages(data.imageUrls);  // Just use the image URLs directly
        } catch (err) {
            console.error('Error fetching collectible:', err);
            setError('Failed to fetch collectible details.');
        }
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (collectible) {
            setCollectible({ ...collectible, [name]: name === 'categoryId' ? Number(value) : value });
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages((prevImages) => [
                ...prevImages,  // Keep existing images (URLs)
                ...Array.from(e.target.files || []),  // Add newly selected files as File objects
            ]);
        }
    };

    const handleRemoveImage = (index: number) => {
        // Remove image by index
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    useEffect(() => {
        if (id) {
            fetchCollectible();
        }
    }, [id, fetchCollectible]);

    return {
        collectible,
        images,
        error,
        success,
        handleInputChange,
        handleFileChange,
        handleRemoveImage,
    };
};
