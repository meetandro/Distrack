import React, { createContext, useReducer } from 'react';
import collectibleservice from '../services/collectible-service';
import collectibleReducer from './collectible-reducer';
import CollectibleService from '../services/collectible-service';
import { CreateCollectibleRequest } from '../models/collectible';

const initialState = {
    collectibles: [],
    addCollectible: (collectible: Collectible) => { },
    editCollectible: (collectible: Collectible, images) => { },
    removeCollectible: (id: number) => { },
};

export const CollectibleContext = createContext(initialState);

export const CollectibleProvider = ({ children }) => {
    const [state, dispatch] = useReducer(collectibleReducer, initialState);

    async function addCollectible(collectible: CreateCollectibleRequest) {
        const id = await CollectibleService.create(collectible)
        dispatch({
            type: "ADD_COLLECTIBLE",
            payload: { ...collectible, id: id }
        });
    }

    async function editCollectible(collectible, images) {
        if (!collectible) return;

        const existingUrls = images.filter((image) => typeof image === 'string') as string[];
        const newFiles = images.filter((image) => image instanceof File) as File[];

        const res = {
            id: collectible.id,
            name: collectible.name,
            description: collectible.description,
            color: collectible.color,
            currency: collectible.currency,
            value: collectible.value,
            condition: collectible.condition,
            acquiredDate: collectible.acquiredDate,
            isPatented: collectible.isPatented,
            categoryId: collectible.categoryId,
            collectionId: collectible.collectionId,
            existingImages: existingUrls,
            newImages: newFiles,
        }

        await CollectibleService.update(collectible.id, res)

        dispatch({
            type: "EDIT_COLLECTIBLE",
            payload: collectible
        });
    }

    async function removeCollectible(id: number) {
        await collectibleservice.delete(id)
        dispatch({
            type: "REMOVE_COLLECTIBLE",
            payload: id
        });
    }

    return (
        <CollectibleContext.Provider
            value={{
                collectibles: state.collectibles,
                addCollectible,
                editCollectible,
                removeCollectible
            }}
        >
            {children}
        </CollectibleContext.Provider>
    );
}
