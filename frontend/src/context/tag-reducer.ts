import { Tag } from "../models/tag";

export default function tagReducer(state: any, action: any) {
    switch (action.type) {
        case "SET_TAG":
            return {
                ...state,
                tags: action.payload
            };

        case "ADD_TAG":
            return {
                ...state,
                tags: [...state.tags, action.payload],
            };

        case "EDIT_TAG":
            {
                const updatedTag = action.payload;

                const updatedTags = state.tags.map((tag: any) => {
                    if (tag.id === updatedTag.id) {
                        return updatedTag;
                    }
                    return tag;
                });

                return {
                    ...state,
                    tags: updatedTags,
                };


            }

        case "REMOVE_TAG":
            return {
                ...state,
                tags: state.tags.filter(
                    (tag: Tag) => tag.id !== action.payload
                ),
            };

        default:
            return state;
    }
}
