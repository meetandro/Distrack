import { GetCollectibleByIdResponse } from "../../models/collectible"
import { mapColor } from "../../utils/enum-mapper"

interface Props {
    editing: boolean
    collectible: GetCollectibleByIdResponse
    handleInputChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const ColorDisplay = ({editing, collectible, handleInputChange}: Props) => {
    return (
        <div>
            <label className="block text-sm mb-1">Color:</label>
            {editing ? (
                <select
                    name="color"
                    value={collectible.color}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring focus:ring-blue-500"
                >
                    <option value="" disabled>Select Color</option>
                    <option value="0">Black</option>
                    <option value="1">Blue</option>
                    <option value="2">Bronze</option>
                    <option value="3">Crimson</option>
                    <option value="4">Cyan</option>
                    <option value="5">Dark Gray</option>
                    <option value="6">Forest Green</option>
                    <option value="7">Gold</option>
                    <option value="8">Gray</option>
                    <option value="9">Green</option>
                    <option value="10">Lime</option>
                    <option value="11">Orange</option>
                    <option value="12">Pink</option>
                    <option value="13">Purple</option>
                    <option value="14">Red</option>
                    <option value="15">Silver</option>
                    <option value="16">Violet</option>
                    <option value="17">Wheat</option>
                    <option value="18">White</option>
                    <option value="19">Yellow</option>
                </select>
            ) : (
                <p>{collectible.color !== undefined ? mapColor(collectible.color) : 'No color provided'}</p>
            )}
        </div>
    )
}