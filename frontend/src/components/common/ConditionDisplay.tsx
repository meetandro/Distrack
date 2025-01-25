import { GetCollectibleByIdResponse } from "../../models/collectible"
import { mapCondition } from "../../utils/enum-mapper"

interface Props {
    editing: boolean
    collectible: GetCollectibleByIdResponse
    handleInputChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const ConditionDisplay = ({editing, collectible, handleInputChange}: Props) => {
    return (
        <div>   
            <label className="block text-sm mb-1">Condition:</label>
            {editing ? (
                <select
                    name="condition"
                    value={collectible.condition}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring focus:ring-blue-500"
                >
                    <option value="" disabled>Select Condition</option>
                    <option value="0">Mint</option>
                    <option value="1">Very Good</option>
                    <option value="2">Good</option>
                    <option value="3">Acceptable</option>
                    <option value="4">Damaged</option>
                </select>
            ) : (
                <p>{collectible.condition !== undefined ? mapCondition(collectible.condition) : 'No condition provided'}</p>
            )}
        </div>
    )
}