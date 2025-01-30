import { Link, useNavigate, useParams } from 'react-router-dom';
import { Collectibles } from '../components/collectible/collectibles';
import { Box, Button } from '@chakra-ui/react';
import { CollectionDetailsCard } from '../components/collection/collection-details-card';
import { useState } from 'react';
import { BiHome } from 'react-icons/bi';
import { CiSettings } from 'react-icons/ci';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { FaArrowRight } from 'react-icons/fa';
import { useCollections } from '../hooks/useCollections';

export const CollectionDetails = () => {
    const { id } = useParams<{ id: string }>();
    const collections = useCollections();
    const collection = collections.find(collection => collection.id == Number(id))
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen((prev) => !prev);

    if (!collection) return;

    return (
        <Box>
            <Box className="relative">
                <Button
                    onClick={toggleMenu}
                    className="text-white p-2 rounded-lg top-12 left-4 fixed"
                >
                    <CiSettings size={20} />
                </Button>
                <Link to={`/collections/${collection.id}/collectibles/new`}
                    className="text-white p-3 rounded-lg top-20 left-4 fixed"
                >
                    <IoIosAddCircleOutline size={20} />
                </Link>
                <Link to={`/`}
                    className="text-white p-3 rounded-lg top-28 left-4 fixed"
                >
                    <BiHome size={20} />
                </Link>

                {isOpen && (
                    <Box className="text-white bg-zinc-700 p-2 rounded-lg top-14 left-14 fixed z-10">
                        <Box
                            onClick={() => navigate(`/collections/${id}/settings`)}
                            className="px-4 py-2 text-sm text-gray-300 bg-zinc-800 rounded-md hover:bg-zinc-900 text-center cursor-pointer"
                        >
                            Tags & Categories <FaArrowRight className='inline text-lg align-middle' />
                        </Box>

                        <CollectionDetailsCard collection={collection} />
                    </Box>
                )}
            </Box>

            <Collectibles />
        </Box>
    );
};
