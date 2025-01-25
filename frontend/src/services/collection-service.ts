import { api } from "../utils/api";
import { Collection } from "../models/collection";

// Add promises
export default abstract class CollectionService {
// GET: api/collections
static async getAll(): Promise<Collection[]> {
    try {
            const response = await api.get('/collections');
            return response.data;
        } catch (error) {
            console.error('Error fetching items:', error);
            throw error;
        }
    };

    // GET: api/collections/{id}
    static async getById (itemId: number): Promise<Collection> {
    try {
            const response = await api.get(`/collections/${itemId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching item by ID:', error);
            throw error;
        }
    };

    // POST: api/collections
    static async create (collection: Collection) {
        try {
            const payload = { name: collection.name, description: collection.description };
            const response = await api.post('/collections', payload);
            return response.data;
        } catch (error) {
            console.error('Error creating item:', error);
            throw error;
        }
    };

    // PUT: api/collections/{id}
    static async update (itemId: number, name: string, description: string) {
        try {
            const response = await api.put(`/collections/${itemId}`, {
                id: itemId,  // Ensure the ID is included in the payload
                name: name,
                description: description  // Send `name` and `description` inside `collectionDto`
            });
            return response.data;
        } catch (error) {
            console.error('Error updating item:', error);
            throw error;
        }
    };

    // DELETE: api/collections/{id}
    static async delete (itemId: number) {
        try {
            const response = await api.delete(`/collections/${itemId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting item:', error);
            throw error;
        }
    };
}