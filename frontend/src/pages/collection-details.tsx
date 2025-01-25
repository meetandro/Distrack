import { useNavigate, useParams } from 'react-router-dom';
import { Collectibles } from '../components/collectible/collectibles';
import { Box, Button } from '@chakra-ui/react';
import { SlOptionsVertical } from 'react-icons/sl';
import { CollectionDetailsCard } from '../components/collection/collection-details-card';
import { useContext, useState } from 'react';
import { CollectionContext } from '../context/collections-context';
import { CollectibleProvider } from '../context/collectible-context';

export const CollectionDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { collections } = useContext(CollectionContext)
    const collection = collections.find(c => c.id == Number(id))
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen((prev) => !prev);

    if (!collection) return;

    return (
        <Box>
            <Box className="relative">
                <Button
                    onClick={toggleMenu}
                    className="text-white bg-gray-500 hover:bg-gray-600 p-2 rounded-lg top-3 left-20 fixed"
                >
                    <SlOptionsVertical />
                </Button>

                {isOpen && (
                    <Box className="text-white bg-gray-500 p-2 rounded-lg top-14 left-4 fixed z-10">
                        <Box
                            onClick={() => navigate(`/collections/${id}/settings`)}
                            className="block px-4 py-2 text-sm text-gray-300 bg-gray-800 rounded-md hover:bg-gray-700 hover:text-white cursor-pointer"
                        >
                            Settings
                        </Box>

                        <CollectionDetailsCard collection={collection} />
                    </Box>
                )}
            </Box>

            <CollectibleProvider>
                <Collectibles />
            </CollectibleProvider>
        </Box>
    );
};
