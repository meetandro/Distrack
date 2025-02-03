import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CiFilter } from "react-icons/ci";
import { CollectibleGrid } from './collectible-grid';
import Filter from './filter';
import { useCollectibles } from '../../hooks/use-collectibles';
import { CloseButton } from '../ui/close-button';
import { PaginationItems, PaginationNextTrigger, PaginationPrevTrigger, PaginationRoot } from '../ui/pagination';
import {
    Box,
    Center,
    DrawerActionTrigger,
    DrawerBackdrop,
    DrawerBody,
    DrawerContent,
    DrawerRoot,
    DrawerTrigger,
    Float,
    HStack,
    Icon,
    Spinner
} from '@chakra-ui/react';

export const Collectibles = () => {
    const { id } = useParams<{ id: string }>();
    const [page, setPage] = useState<number>(1);
    const pageSize = 10;
    const { collectibles, totalCount, status } = useCollectibles(Number(id), page, pageSize);

    if (status === 'pending') return <Spinner />

    return (
        <Box>
            <DrawerRoot placement='start'>
                <DrawerBackdrop />
                <DrawerTrigger asChild>
                    <Float placement="top-start" position="fixed" offsetX={8} offsetY={8} color="white">
                        <Icon as={CiFilter} cursor="pointer" size="md" />
                    </Float>

                </DrawerTrigger>
                <DrawerContent
                    position="fixed"
                    rounded="md"
                    bg="gray.900"
                >
                    <DrawerBody>
                        <DrawerActionTrigger asChild>
                            <CloseButton />
                        </DrawerActionTrigger>
                        <Filter setPage={setPage} />
                    </DrawerBody>
                </DrawerContent>
            </DrawerRoot>

            <CollectibleGrid collectionId={Number(id)} collectibles={collectibles} />

            <Center>
                <PaginationRoot
                    count={totalCount}
                    pageSize={pageSize}
                    page={page}
                    siblingCount={5}
                    onPageChange={(e) => setPage(e.page)}
                    color="white"
                >
                    <HStack>
                        <PaginationPrevTrigger />
                        <PaginationItems />
                        <PaginationNextTrigger />
                    </HStack>
                </PaginationRoot>
            </Center>
        </Box>
    );
};

