import { useParams } from 'react-router-dom';
import Filter from './filter';
import { CiFilter } from "react-icons/ci";
import { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { fetchCollectibles } from '../../state/collectibleSlice';

export const Collectibles = () => {
    const { id } = useParams<{ id: string }>();
    const [page, setPage] = useState<number>(1);
    const pageSize = 10;
    const dispatch = useDispatch<AppDispatch>();
    const { collectibles, filters, totalCount, tempFilters } = useSelector((state: RootState) => state.collectibles);

    useEffect(() => {
        const collectionId = Number(id)
        dispatch(fetchCollectibles({ collectionId, page, pageSize, filters: tempFilters }));
    }, [dispatch, id, filters])

    return (
        <Box>
            <DrawerRoot placement={'start'}>
                <DrawerBackdrop />
                <DrawerTrigger asChild>
                    <IconButton className='fixed top-3 left-4 text-white'>
                        <CiFilter size={20} />
                    </IconButton>
                </DrawerTrigger>
                <DrawerContent className='rounded-md bg-zinc-900 fixed'>
                    <DrawerBody>
                        <DrawerActionTrigger asChild>
                            <CloseButton color={'white'} />
                        </DrawerActionTrigger>
                        <Filter setPage={setPage} />
                    </DrawerBody>
                </DrawerContent>
            </DrawerRoot>

            <CollectibleGrid collectionId={Number(id)} collectibles={collectibles} />

            <Center>
                <PaginationRoot
                    className='text-white'
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
