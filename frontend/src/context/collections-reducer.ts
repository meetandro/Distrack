import { Collection } from "../models/collection";

export default function collectionReducer(state: any, action: any) {
    switch (action.type) {
        case "ADD_COLLECTION":
            return {
                ...state,
                collections: [...state.collections, action.payload],
            };

        case "EDIT_COLLECTION":
            {
                const updatedCollection = action.payload;

                const updatedCollections = state.collections.map((collection: any) => {
                    if (collection.id === updatedCollection.id) {
                        return updatedCollection;
                    }
                    return collection;
                });

                return {
                    ...state,
                    collections: updatedCollections,
                };


            }

        case "REMOVE_COLLECTION":
            return {
                ...state,
                collections: state.collections.filter(
                    (collection: Collection) => collection.id !== action.payload
                ),
            };

        default:
            return state;
    }
}
