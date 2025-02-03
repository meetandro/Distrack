import { Tags } from "../components/tag/tags";
import { Categories } from "../components/category/categories";
import { AccordionItem, AccordionItemContent, AccordionItemTrigger, AccordionRoot } from "../components/ui/accordion.tsx";
import { Box } from '@chakra-ui/react'

export const CollectionSettings = () => {
    return (
        <Box
            gap={5}
            p={5}
        >
            <AccordionRoot collapsible>
                <AccordionItem value={'tags'} color={'white'} bg={'gray.800'} rounded={'sm'}>
                    <AccordionItemTrigger p={5}>Tags</AccordionItemTrigger>
                    <AccordionItemContent><Tags /></AccordionItemContent>
                </AccordionItem>
            </AccordionRoot>

            <AccordionRoot collapsible>
                <AccordionItem value={'categories'} color={'white'} bg={'gray.800'} marginTop={5} rounded={'sm'}>
                    <AccordionItemTrigger p={5}>Categories</AccordionItemTrigger>
                    <AccordionItemContent><Categories /></AccordionItemContent>
                </AccordionItem>
            </AccordionRoot>
        </Box>
    );
};

