export const mapColor = (color: number) => [
    'Black', 'Blue', 'Bronze', 'Crimson', 'Cyan', 'Dark Gray',
    'Forest Green', 'Gold', 'Gray', 'Green', 'Lime', 'Orange',
    'Pink', 'Purple', 'Red', 'Silver', 'Violet', 'Wheat', 'White', 'Yellow'
][color] || 'Unknown';

export const mapCondition = (condition: number) => [
    'Mint', 'Very Good', 'Good', 'Acceptable', 'Damaged'
][condition] || 'Unknown';