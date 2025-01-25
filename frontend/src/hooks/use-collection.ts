import { useEffect, useState } from "react"
import CollectionService from "../services/collection-service"
import { Collection } from "../models/collection"

export const useCollection = (id: number) => {
    const [collection, setCollection] = useState<Collection>();

    useEffect(() => {
        const fetchCollection = async () => {
            const collection = await CollectionService.getById(Number(id))
            setCollection(collection)
        }
        fetchCollection()
    }, [id])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCollection((prev: Collection) => ({
            ...prev,
            [name]: value,
        }));
    };

    return { collection, handleInputChange }
}
