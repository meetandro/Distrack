import { GetCollectibleByIdResponse } from "../../models/collectible"

interface Props {
    editing: boolean
    collectible: GetCollectibleByIdResponse
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const ValueDisplay = ({editing, collectible, handleInputChange}: Props) => {
    return (
        <div>
            <label className="block text-sm mb-1">Value:</label>
            {editing ? (
                <input
                    type="number"
                    name="value"
                    value={collectible.value || 0}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 rounded-lg text-gray-100"
                />
            ) : (
                <p>{collectible.value || 0} {collectible.currency}</p>
            )}
        </div>
    )
}