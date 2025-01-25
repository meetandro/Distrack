import { Category } from "../../models/category"
import { GetCollectibleByIdResponse } from "../../models/collectible"

interface Props {
    editing: boolean
    collectible: GetCollectibleByIdResponse
    categories: Category[]
    handleInputChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const CategoryDisplay = ({editing, collectible, handleInputChange, categories}: Props) => {
    return (
        <div>
            <label className="block text-sm mb-1">Category:</label>
            {editing ? (
                <select
                    name="categoryId"
                    value={collectible.categoryId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 rounded-lg text-gray-100"
                >
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            ) : (
                <p>{categories.find((cat) => cat.id === collectible.categoryId)?.name || 'No category selected'}</p>
            )}
        </div>
    )
}