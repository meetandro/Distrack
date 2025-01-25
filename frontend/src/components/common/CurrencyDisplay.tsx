import { GetCollectibleByIdResponse } from "../../models/collectible"

interface Props {
    editing: boolean
    collectible: GetCollectibleByIdResponse
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const CurrencyDisplay = ({editing, collectible, handleInputChange}: Props) => {
    return (
        <div>
            <label className="block text-sm mb-1">Currency:</label>
            {editing ? (
                <input
                    type="text"
                    name="currency"
                    value={collectible.currency || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 rounded-lg text-gray-100"
                />
            ) : (
                <p>{collectible.currency || 'No currency provided'}</p>
            )}
        </div>
    )
}