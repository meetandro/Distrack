import {
    Center,
    GridItem,
    SimpleGrid,
    Stack,
    Text,
    Box,
    Button,
    DialogBody,
    DialogContent,
    DialogRoot,
    DialogTrigger,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { CollectionForm } from '../components/collection/collection-form';
import { FaPlus } from 'react-icons/fa';
import { useCollections } from '../hooks/use-collections';

export const Collections = () => {
    const collections = useCollections();

    return (
        <Center py={10} px={5}>
            <SimpleGrid
                columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
                gap={8}
                maxW="1200px"
                w="full"
            >
                {collections.map((collection) => (
                    <GridItem key={collection.id}>
                        <Link to={`/collections/${collection.id}`}>
                            <Box
                                bg="gray.800"
                                borderRadius="lg"
                                boxShadow="lg"
                                _hover={{ boxShadow: 'xl', transform: 'scale(1.05)' }}
                                transition="all 0.2s ease-in-out"
                                p={6}
                                h="full"
                            >
                                <Stack gap={4}>
                                    <Text fontSize="xl" fontWeight="semibold" color="white">
                                        {collection.name}
                                    </Text>
                                    <Text fontSize="sm" color="gray.400">
                                        {collection.description}
                                    </Text>
                                </Stack>
                            </Box>
                        </Link>
                    </GridItem>
                ))}

                <GridItem>
                    <DialogRoot>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="sm"
                                bg="teal.500"
                                color="white"
                                borderRadius="lg"
                                boxShadow="lg"
                                _hover={{ boxShadow: 'xl', transform: 'scale(1.05)' }}
                                transition="all 0.2s ease-in-out"
                                h="full"
                                w="full"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                fontSize="lg"
                                fontWeight="semibold"
                                p={6}
                            >
                                <FaPlus />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className='absolute left-0 right-0 top-0 bg-zinc-800 border-2 border-zinc-600'>
                            <DialogBody>
                                <CollectionForm onClose={() => { }} />
                            </DialogBody>
                        </DialogContent>
                    </DialogRoot>
                </GridItem>
            </SimpleGrid>
        </Center>
    );
};
