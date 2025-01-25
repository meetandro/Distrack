/* eslint-disable @typescript-eslint/no-explicit-any */
export default function categoryReducer(state: any, action: any) {
    switch (action.type) {
        case "ADD_CATEGORY":
            return {
                ...state,
                categories: [...state.categories, action.payload],
            };

        case "EDIT_CATEGORY":
            {
                const updatedCategory = action.payload;

                const updatedCategories = state.categories.map((category: any) => {
                    if (category.id === updatedCategory.id) {
                        return updatedCategory;
                    }
                    return category;
                });

                return {
                    ...state,
                    categories: updatedCategories,
                };


            }

        case "REMOVE_CATEGORY":
            return {
                ...state,
                categories: state.categories.filter(
                    (category: any) => category.id !== action.payload
                ),
            };

        default:
            return state;
    }
};
