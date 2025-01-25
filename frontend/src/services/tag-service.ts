import { api } from "../utils/api";
import { Tag } from "../models/tag";

export default abstract class  TagService {
    static async getTagsForCollection (collectionId: number): Promise<Tag[]> {
        try {
            const response = await api.get(`/collections/${collectionId}/tags`);
            return response.data;
        } catch (error) {
            console.error('Error fetching tags:', error);
            throw error;
        }
    };

    static async updateTag (itemData: Tag) {
        try {
            const response = await api.put(`/tags/${itemData.id}`, itemData);
            return response.data;
        } catch (error) {
            console.error('Error updating item:', error);
            throw error;
        }
    };

    static async delete(id: number): Promise<void> {
        try {
            await api.delete(`/tags/${id}`);
        } catch (error) {
            console.error('Error deleting item:', error);
            throw error;
        }
    }

    static async getTagById (id: number): Promise<Tag> {
        try {
            const response = await api.get(`/tags/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching item:', error);
            throw error;
        }
    }
    
    static async addTagsToCollectible (collectibleId: number, tagIds: number[]) {
        const payload = {
            "id": collectibleId,
            "tagIds": tagIds
          }
        try {
            const response = await api.post(`/collectibles/${collectibleId}/tags`, payload);
            return response.data;
        } catch (error) {
            console.error('Error adding tags to collectible:', error);
            throw error;
        }
    };
    
    static async createTag (itemData: Tag) {
        try {
            const payload = { name: itemData.name, hex: itemData.hex, collectionId: itemData.collectionId };
            const response = await api.post('/tags', payload);
            return response.data;
        } catch (error) {
            console.error('Error creating item:', error);
            throw error;
        }
    };
}