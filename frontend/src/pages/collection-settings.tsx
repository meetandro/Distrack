import { Tags } from "../components/tag/tags";
import { Categories } from "../components/category/categories";
import { Box } from "@chakra-ui/react";

export const CollectionSettings = () => {
    return (
        <Box
            display={'flex'}
            gap={5}
            p={5}
        >
            <Tags />

            <Categories />
        </Box>
    )
}
