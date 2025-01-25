export default function collectibleReducer(state: any, action: any) {
    switch (action.type) {
        case "ADD_COLLECTIBLE":
            return {
                ...state,
                collectibles: [...state.collectibles, action.payload],
            };

        case "EDIT_COLLECTIBLE":
            {
                const updatedcollectible = action.payload;

                const updatedcollectibles = state.collectibles.map((collectible: any) => {
                    if (collectible.id === updatedcollectible.id) {
                        return updatedcollectible;
                    }
                    return collectible;
                });

                return {
                    ...state,
                    collectibles: updatedcollectibles,
                };


            }

        case "REMOVE_COLLECTIBLE":
            return {
                ...state,
                collectibles: state.collectibles.filter(
                    (collectible) => collectible.id !== action.payload
                ),
            };

        default:
            return state;
    }
}
