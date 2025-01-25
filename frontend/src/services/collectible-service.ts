import { api } from "../utils/api";
import { GetAllCollectiblesResponse, GetCollectibleByIdResponse } from "../models/collectible";

export default abstract class CollectibleService {
    static async getAll(collectionId: number, page: number, pageSize: number, filters): Promise<any> {
        try {
            const response = await api.get(`/collections/${collectionId}/collectibles`, {
                params: {
                    page,
                    pageSize,
                    searchQuery: filters.searchQuery,
                    colors: filters.colors.join(','), // Convert array to string
                    currency: filters.currency,
                    minValue: filters.minValue,
                    maxValue: filters.maxValue,
                    conditions: filters.conditions.join(','), // Convert array to string
                    acquiredFrom: filters.acquiredFrom,
                    acquiredTo: filters.acquiredTo,
                    isPatented: filters.isPatented,
                    sortBy: filters.sortBy,
                    sortOrder: filters.sortOrder,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching items:', error);
            throw error;
        }
    }


    static async getById(id: number): Promise<GetCollectibleByIdResponse> {
        try {
            const response = await api.get(`/collectibles/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching item:', error);
            throw error;
        }
    }

    static async create(itemData: FormData) {
        try {
            const response = await api.post('/collectibles', itemData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error creating item:', error);
            throw error;
        }
    };

    static async delete(id: number) {
        try {
            const response = await api.delete(`/collectibles/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting item:', error);
            throw error;
        }
    };

    static async update(id, itemData) {
        const formData = new FormData();
        formData.append('id', id.toString());
        formData.append('name', itemData.name);
        formData.append('description', itemData.description ?? '');
        formData.append('color', itemData.color?.toString() ?? '');
        formData.append('currency', itemData.currency ?? '');
        formData.append('value', itemData.value?.toString() ?? '');
        formData.append('condition', itemData.condition?.toString() ?? '');

        const date = new Date(itemData.acquiredDate);
        formData.append('acquiredDate', date.toISOString());

        formData.append('isPatented', itemData.isPatented?.toString() ?? '');
        formData.append('collectionId', itemData.collectionId.toString());
        formData.append('categoryId', itemData.categoryId.toString());

        // Add existing images (URLs) to formData under 'existingImages'
        if (itemData.existingImages && itemData.existingImages.length > 0) {
            itemData.existingImages.forEach((imageUrl) => formData.append('existingImages', imageUrl));
        }

        formData.append('existingImages', '');

        // Add new image files to formData under 'newImages'
        if (itemData.newImages && itemData.newImages.length > 0) {
            itemData.newImages.forEach((image) => formData.append('newImages', image));
        }

        try {
            const res = await api.put(`/collectibles/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return res.data;
        } catch (err) {
            console.error(err);
        }

        throw new Error('Failed to update collectible');
    }

}
