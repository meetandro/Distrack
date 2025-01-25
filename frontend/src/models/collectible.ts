export interface CreateCollectibleRequest {
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
    images: File[];
}

export interface GetAllCollectiblesResponse {
    id: number;
    name: string;
    description: string;
    color: number;
    currency: string;
    value: number;
    condition: string;
    acquiredDate: Date;
    isPatented: boolean;
    images: { url: string }[];
    tags: { id: number; name: string; hex: string }[];
}

export interface GetCollectibleByIdResponse {
    id: number;
    name: string;
    description?: string;
    color?: number;
    currency?: string;
    value?: number;
    condition?: number;
    acquiredDate?: Date;
    isPatented?: boolean;
    categoryId: number;
    collectionId: number;
    imageUrls: string[];
    tags: number[];
}
