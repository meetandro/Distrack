import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCollections } from '../hooks/use-collections';
import { Collectibles } from '../components/collectible/collectibles';
import { CollectionDetailsCard } from '../components/collection/collection-details-card';
import { BiHome } from 'react-icons/bi';
import { CiSettings } from 'react-icons/ci';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { FaLink } from 'react-icons/fa';
import {
    Box,
    Button,
    DialogBody,
    DialogContent,
    DialogRoot,
    DialogTrigger,
    Float,
    Icon,
    Stack,
    Text
} from '@chakra-ui/react';

export const CollectionDetails = () => {
    const { id } = useParams<{ id: string }>();
    const collections = useCollections();
    const collection = collections.find(collection => collection.id == Number(id))
    const navigate = useNavigate();

    if (!collection) return;

    return (
        <Box>
            <Box position="relative">
                <Float placement="top-start" position="fixed" offsetX={8} offsetY={24} color="white">
                    <Link to={`/collections/${collection.id}/collectibles/new`}>
                        <IoIosAddCircleOutline size={20} />
                    </Link>
                </Float>
                <Float placement="top-start" position="fixed" offsetX={8} offsetY={32} color="white">
                    <Link to={`/`}>
                        <BiHome size={20} />
                    </Link>
                </Float>

                <DialogRoot>
                    <DialogTrigger asChild>
                        <Float placement="top-start" position="fixed" offsetX={8} offsetY={16} color="white">
                            <Button bg="none" color="white">
                                <Icon as={CiSettings} />
                            </Button>
                        </Float>
                    </DialogTrigger>
                    <DialogContent
                        bg="gray.700"
                        rounded="lg"
                        width="1/2"
                        p={2}
                        zIndex={10}
                        position="fixed"
                        top={2}
                        left={14}
                        color="white"
                    >
                        <DialogBody p={0} m={0}>
                            <Stack
                                direction="row"
                                p={2}
                                color="gray.200"
                                bg="gray.800"
                                rounded="md"
                                _hover={{
                                    bg: "gray.900"
                                }}
                                cursor="pointer"
                                onClick={() => navigate(`/collections/${id}/settings`)}
                                gap={2}
                            >
                                <Text>Tags & Categories</Text>
                                <FaLink color="teal" />
                            </Stack>

                            <CollectionDetailsCard collection={collection} />
                        </DialogBody>
                    </DialogContent>
                </DialogRoot>
            </Box>

            <Collectibles />
        </Box>
    );
};

