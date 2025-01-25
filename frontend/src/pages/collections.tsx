import { Card, Center, Collapsible, GridItem, HStack, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { CollectionForm } from '../components/collection/collection-form';
import { useContext, useState } from 'react';
import { CollectionContext } from '../context/collections-context';

export const Collections = () => {
    const { collections } = useContext(CollectionContext);

    const [isOpen, setIsOpen] = useState(false);

    return (
        <Center>
            <SimpleGrid padding={5} templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
                {collections.map((collection) => (
                    <GridItem key={collection.id}>
                        <Link to={`/collections/${collection.id}`}>
                            <Card.Root paddingTop={15} paddingBottom={15} paddingStart={30} paddingEnd={30} bg={'gray.800'} height={'full'}>
                                <Card.Body>
                                    <HStack mb="6" gap="3">
                                        <Stack gap="0">
                                            <Text fontWeight="semibold" textStyle="sm" color={'white'}>
                                                {collection.name}
                                            </Text>
                                        </Stack>
                                    </HStack>
                                    <Card.Description color={'gray.300'}>
                                        {collection.description}
                                    </Card.Description>
                                </Card.Body>
                            </Card.Root>
                        </Link>
                    </GridItem>
                ))}

                <GridItem>
                    <Collapsible.Root open={isOpen}>
                        <Collapsible.Trigger onClick={() => setIsOpen(!isOpen)} bg='gray.800' padding="20" rounded={'md'} color={'white'}>Add Collection</Collapsible.Trigger>
                        <Collapsible.Content>
                            <Center position={'fixed'} inset={0}>
                                <CollectionForm onClose={() => setIsOpen(false)} />
                            </Center>
                        </Collapsible.Content>
                    </Collapsible.Root>
                </GridItem>
            </SimpleGrid>
        </Center>
    );
};
