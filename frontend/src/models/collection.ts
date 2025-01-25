export interface Collection {
    id: number;
    name: string;
    description?: string;
    createdDate: Date;
    collectibles: number[];
}
