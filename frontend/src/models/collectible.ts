export interface Collectible {
    id: number;
    name: string;
    description: string;
    color: number;
    currency: string;
    value: number;
    condition: number;
    acquiredDate: Date;
    isPatented: boolean;
    collectionId: number;
    categoryId: number;
    images: { url: string }[];
    tags: { id: number; name: string; hex: string }[];
}

