import { Tags } from "../components/tag/tags";
import { Categories } from "../components/category/categories";
import { Box } from "@chakra-ui/react";
import { CategoryProvider } from "../context/category-context";
import { TagProvider } from "../context/tag-context";

export const CollectionSettings = () => {
    return (
        <Box display={'flex'} gap={5} className="text-white text-2xl p-20">
            <Box className="w-1/2 bg-gray-800 p-6 rounded-lg shadow-lg text-gray-100">
                <TagProvider>
                    <Tags />
                </TagProvider>
            </Box>

            <Box className="w-1/2 bg-gray-800 p-6 rounded-lg shadow-lg text-gray-100">
                <CategoryProvider>
                    <Categories />
                </CategoryProvider>
            </Box>
        </Box>
    )
}
