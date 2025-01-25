import { api } from '../utils/api';
import { Category } from '../models/category';

export default abstract class  CategoryService {
    static async getAll (): Promise<Category[]> {
        try {
            const response = await api.get('/categories');
            return response.data;
        } catch (error) {
            console.error('Error fetching items:', error);
            throw error;
        }
    };

    static async create (itemData: Category) {
        const payload = { name: itemData.name };
        try {
            const response = await api.post('/categories', payload);
            return response.data;
        } catch (error) {
            console.error('Error creating item:', error);
            throw error;
        }
    };

    static async update (itemData: Category) {
        try {
            const response = await api.put(`/categories/${itemData.id}`, itemData);
            return response.data;
        } catch (error) {
            console.error('Error updating item:', error);
            throw error;
        }
    };

    static async delete (id: number) {
        try {
            const response = await api.delete(`/categories/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting item:', error);
            throw error;
        }
    }
}