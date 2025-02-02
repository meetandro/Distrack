export interface Collectible {
    id: number;
    name: string;
    description: string;
    color: number;
    currency: string;
    value: number;
    condition: number;
    acquiredDate: string;
    isPatented: boolean;
    collectionId: number;
    categoryId: number;
    images: string[];
    tags: { id: number; name: string; hex: string }[];
}

