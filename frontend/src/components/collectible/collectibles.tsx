import { useParams } from 'react-router-dom';
import Filter from './filter';
import Sorting from './sorting';
import { CiFilter } from "react-icons/ci";
import { useCollectibles } from '../../hooks/use-collectibles';
import { useState } from 'react';
import { CollectibleGrid } from './collectible-grid';
import {
    Box,
    Center,
    DrawerActionTrigger,
    DrawerBackdrop,
    DrawerBody,
    DrawerContent,
    DrawerRoot,
    DrawerTrigger,
    HStack,
    IconButton
} from '@chakra-ui/react';
import { CloseButton } from '../ui/close-button';
import { PaginationItems, PaginationNextTrigger, PaginationPrevTrigger, PaginationRoot } from '../ui/pagination';

export const Collectibles = () => {
    const { id } = useParams<{ id: string }>();
    const [page, setPage] = useState<number>(1);
    const pageSize = 5;
    const { collectibles, loading, error, totalCount, tempFilters, updateFilter, clearFilter, applyFilters, handleSortChange, handleSortOrderToggle } = useCollectibles(Number(id), page, pageSize);

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    return (
        <Box>
            <DrawerRoot placement={'start'}>
                <DrawerBackdrop />
                <DrawerTrigger asChild>
                    <IconButton
                        aria-label='Filter'
                        position={'fixed'}
                        top={3}
                        left={4}
                        color={'white'}
                    >
                        <CiFilter />
                    </IconButton>
                </DrawerTrigger>
                <DrawerContent rounded="md" bg={'black'} position={'fixed'}>
                    <DrawerBody>
                        <DrawerActionTrigger asChild>
                            <CloseButton color={'white'} />
                        </DrawerActionTrigger>
                        <Filter
                            tempFilters={tempFilters}
                            updateFilter={updateFilter}
                            clearFilter={clearFilter}
                            applyFilters={applyFilters}
                            setPage={setPage}
                        />
                        <Sorting
                            tempFilters={tempFilters}
                            handleSortChange={handleSortChange}
                            handleSortOrderToggle={handleSortOrderToggle}
                        />
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
