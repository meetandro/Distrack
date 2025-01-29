import { Tags } from "../components/tag/tags";
import { Categories } from "../components/category/categories";
import { Box } from "@chakra-ui/react";

export const CollectionSettings = () => {
    return (
        <Box display={'flex'} gap={5} className="text-white text-2xl p-20">
            <Box className="w-1/2 bg-gray-800 p-6 rounded-lg shadow-lg text-gray-100">
                <Tags />
            </Box>

            <Box className="w-1/2 bg-gray-800 p-6 rounded-lg shadow-lg text-gray-100">
                <Categories />
            </Box>
        </Box>
    )
}
