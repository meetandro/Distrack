interface Props {
  tempFilters: any;
  updateFilter: (key: string, value: any) => void;
  clearFilter: (key: string) => void;
  applyFilters: () => void;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Filter = ({ tempFilters, updateFilter, clearFilter, applyFilters, setPage }: Props) => {
  const toggleSelection = (key: string, value: string) => {
    const currentSelection = tempFilters[key];
    if (currentSelection.includes(value)) {
      updateFilter(key, currentSelection.filter((item: string) => item !== value));
    } else {
      updateFilter(key, [...currentSelection, value]);
    }
  };

  const toggleBooleanFilter = (key: string, value: boolean) => {
    if (tempFilters[key] === value) {
      updateFilter(key, null);
    } else {
      updateFilter(key, value);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-100">Filters</h3>
      <div className="flex flex-col space-y-4">
        
        {/* Search Bar */}
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Search..."
            value={tempFilters.searchQuery}
            onChange={(e) => updateFilter('searchQuery', e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          {tempFilters.searchQuery && (
            <button
              onClick={() => clearFilter('searchQuery')}
              className="text-xs text-red-500 mt-2"
            >
              Clear Search
            </button>
          )}
        </div>

        {/* Currency Filter */}
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Currency (e.g., USD)"
            value={tempFilters.currency}
            onChange={(e) => updateFilter('currency', e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          {tempFilters.currency && (
            <button
              onClick={() => clearFilter('currency')}
              className="text-xs text-red-500 mt-2"
            >
              Clear Currency
            </button>
          )}
        </div>

        {/* Color Filter */}
        <div className="flex flex-col space-y-2">
          <h4 className="text-gray-200">Colors</h4>
          <div className="flex flex-wrap gap-2">
            {['Black', 'Blue', 'Bronze', 'Crimson', 'Cyan', 'DarkGray', 'ForestGreen', 'Gold', 'Gray', 'Green', 'Lime', 'Orange', 'Pink', 'Purple', 'Red', 'Silver', 'Violet', 'Wheat', 'White', 'Yellow'].map((color) => (
              <div
                key={color}
                onClick={() => toggleSelection('colors', color)}
                className={`cursor-pointer px-3 py-1 rounded-full text-sm ${
                  tempFilters.colors.includes(color)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-900'
                } hover:bg-blue-500 hover:text-white`}
              >
                {color}
              </div>
            ))}
          </div>
          {tempFilters.colors.length > 0 && (
            <button
              onClick={() => clearFilter('colors')}
              className="text-xs text-red-500 mt-2"
            >
              Clear Colors
            </button>
          )}
        </div>

        {/* Condition Filter */}
        <div className="flex flex-col space-y-2">
          <h4 className="text-gray-200">Conditions</h4>
          <div className="flex flex-wrap gap-2">
            {['Mint', 'VeryGood', 'Good', 'Acceptable', 'Damaged'].map((condition) => (
              <div
                key={condition}
                onClick={() => toggleSelection('conditions', condition)}
                className={`cursor-pointer px-3 py-1 rounded-full text-sm ${
                  tempFilters.conditions.includes(condition)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-900'
                } hover:bg-blue-500 hover:text-white`}
              >
                {condition}
              </div>
            ))}
          </div>
          {tempFilters.conditions.length > 0 && (
            <button
              onClick={() => clearFilter('conditions')}
              className="text-xs text-red-500 mt-2"
            >
              Clear Conditions
            </button>
          )}
        </div>

        {/* Is Patented Filter (Boolean) */}
        <div className="flex flex-col space-y-2">
          <h4 className="text-gray-200">Is Patented</h4>
          <div className="flex gap-4">
            <div
              onClick={() => toggleBooleanFilter('isPatented', true)}
              className={`cursor-pointer px-3 py-1 rounded-full text-sm ${
                tempFilters.isPatented === true
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-900'
              } hover:bg-blue-500 hover:text-white`}
            >
              Yes
            </div>
            <div
              onClick={() => toggleBooleanFilter('isPatented', false)}
              className={`cursor-pointer px-3 py-1 rounded-full text-sm ${
                tempFilters.isPatented === false
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-900'
              } hover:bg-blue-500 hover:text-white`}
            >
              No
            </div>
          </div>
          {tempFilters.isPatented !== null && (
            <button
              onClick={() => clearFilter('isPatented')}
              className="text-xs text-red-500 mt-2"
            >
              Clear Is Patented
            </button>
          )}
        </div>

        {/* Min and Max Value Filters */}
        <div className="flex flex-col">
          <input
            type="number"
            placeholder="Min Value"
            value={tempFilters.minValue || ''}
            onChange={(e) => updateFilter('minValue', Number(e.target.value))}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          {tempFilters.minValue !== null && (
            <button
              onClick={() => clearFilter('minValue')}
              className="text-xs text-red-500 mt-2"
            >
              Clear Min Value
            </button>
          )}
        </div>

        <div className="flex flex-col">
          <input
            type="number"
            placeholder="Max Value"
            value={tempFilters.maxValue || ''}
            onChange={(e) => updateFilter('maxValue', Number(e.target.value))}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          {tempFilters.maxValue !== null && (
            <button
              onClick={() => clearFilter('maxValue')}
              className="text-xs text-red-500 mt-2"
            >
              Clear Max Value
            </button>
          )}
        </div>

        {/* Acquired Date From Filter */}
        <div className="flex flex-col">
          <input
            type="date"
            value={tempFilters.acquiredFrom || ''}
            onChange={(e) => updateFilter('acquiredFrom', e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          {tempFilters.acquiredFrom && (
            <button
              onClick={() => clearFilter('acquiredFrom')}
              className="text-xs text-red-500 mt-2"
            >
              Clear Acquired Date From
            </button>
          )}
        </div>

        {/* Acquired Date To Filter */}
        <div className="flex flex-col">
          <input
            type="date"
            value={tempFilters.acquiredTo || ''}
            onChange={(e) => updateFilter('acquiredTo', e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          {tempFilters.acquiredTo && (
            <button
              onClick={() => clearFilter('acquiredTo')}
              className="text-xs text-red-500 mt-2"
            >
              Clear Acquired Date To
            </button>
          )}
        </div>
      </div>

      {/* Apply Filters Button */}
      <button
        onClick={() => { applyFilters(); setPage(1); }}
        className="py-2 px-4 mt-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default Filter;
