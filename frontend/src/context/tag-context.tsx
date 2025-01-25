import React, { createContext, useReducer } from 'react';
import TagService from '../services/tag-service';
import { Tag } from '../models/tag';
import tagReducer from './tag-reducer';

const initialState = {
    tags: [],
    getTags: async (collectionId: number) => { },
    addTag: (tag: Tag) => { },
    editTag: (tag: Tag) => { },
    removeTag: (id: number) => { },
};

export const TagContext = createContext(initialState);

export const TagProvider = ({ children }) => {
    const [state, dispatch] = useReducer(tagReducer, initialState);

    async function getTags(collectionId: number) {
        const tags = await TagService.getTagsForCollection(collectionId);
        dispatch({
            type: "SET_TAG",
            payload: tags,
        });
    }

    async function addTag(tag: Tag) {
        const id = await TagService.createTag(tag)
        dispatch({
            type: "ADD_TAG",
            payload: { ...tag, id: id }
        });
    }

    async function editTag(tag: Tag) {
        await TagService.updateTag(tag)
        dispatch({
            type: "EDIT_TAG",
            payload: tag
        });
    }

    async function removeTag(id: number) {
        await TagService.delete(id)
        dispatch({
            type: "REMOVE_TAG",
            payload: id
        });
    }

    return (
        <TagContext.Provider
            value={{
                tags: state.tags,
                getTags,
                addTag,
                editTag,
                removeTag
            }}
        >
            {children}
        </TagContext.Provider>
    );
}
