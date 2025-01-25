import React, { createContext, useReducer } from 'react';
import { Collection } from '../models/collection';
import collectionReducer from './collections-reducer';
import CollectionService from '../services/collection-service';

const initialState = {
    collections: await CollectionService.getAll(),
    addCollection: (collection: Collection) => { },
    editCollection: (collection: Collection) => { },
    removeCollection: (id: number) => { },
};

export const CollectionContext = createContext(initialState);

export const CollectionProvider = ({ children }) => {
    const [state, dispatch] = useReducer(collectionReducer, initialState);

    async function addCollection(collection: Collection) {
        const id = await CollectionService.create(collection)
        dispatch({
            type: "ADD_COLLECTION",
            payload: { ...collection, id: id }
        });
    }

    async function editCollection(collection: Collection) {
        await CollectionService.update(collection.id, collection.name, collection.description ?? '')
        dispatch({
            type: "EDIT_COLLECTION",
            payload: collection
        });
    }

    async function removeCollection(id: number) {
        await CollectionService.delete(id)
        dispatch({
            type: "REMOVE_COLLECTION",
            payload: id
        });
    }

    return (
        <CollectionContext.Provider
            value={{
                collections: state.collections,
                addCollection,
                editCollection,
                removeCollection
            }}
        >
            {children}
        </CollectionContext.Provider>
    );
}
