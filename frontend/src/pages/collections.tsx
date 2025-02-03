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
    Icon,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { CollectionForm } from '../components/collection/collection-form';
import { FaPlus } from 'react-icons/fa';
import { useCollections } from '../hooks/use-collections';
import { useState } from 'react';

export const Collections = () => {
    const collections = useCollections();

    const [open, setOpen] = useState<boolean>(false)

    return (
        <Center>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={8} css={simpleGridStyles}>
                {collections.map((collection) => (
                    <GridItem key={collection.id} minHeight={'32'}>
                        <Link to={`/collections/${collection.id}`}>
                            <Box css={boxStyles}>
                                <Stack>
                                    <Text css={nameStyles}>
                                        {collection.name}
                                    </Text>
                                    <Text css={descriptionStyles}>
                                        {collection.description}
                                    </Text>
                                </Stack>
                            </Box>
                        </Link>
                    </GridItem>
                ))}

                <GridItem>
                    <DialogRoot
                        open={open}
                        onOpenChange={(e) => setOpen(e.open)}
                    >
                        <DialogTrigger asChild>
                            <Button css={buttonStyles}>
                                <Icon as={FaPlus} />
                            </Button>
                        </DialogTrigger>
                        <DialogContent css={dialogStyles}>
                            <DialogBody>
                                <CollectionForm onClose={() => setOpen(false)} />
                            </DialogBody>
                        </DialogContent>
                    </DialogRoot>
                </GridItem>
            </SimpleGrid>
        </Center>
    );
};

const boxStyles = {
    bg: "gray.800",
    borderRadius: "lg",
    boxShadow: "lg",
    _hover: { boxShadow: 'xl', transform: 'scale(1.05)' },
    transition: "all 0.2s ease-in-out",
    p: 6,
    h: "full",
}

const buttonStyles = {
    minHeight: "32",
    variant: "outline",
    size: "sm",
    bg: "teal.500",
    color: "white",
    borderRadius: "lg",
    boxShadow: "lg",
    _hover: {
        boxShadow: 'xl',
        transform: 'scale(1.05)'
    },
    transition: "all 0.2s ease-in-out",
    h: "full",
    w: "full",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "lg",
    fontWeight: "semibold",
    p: 6,
}

const dialogStyles = {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bg: 'gray.800',
    borderWidth: 2,
    borderColor: 'gray.600',
}

const simpleGridStyles = {
    maxW: "10/12",
    py: 10,
    px: 5,
}

const nameStyles = {
    fontSize: "xl",
    fontWeight: "semibold",
    color: "white",

}

const descriptionStyles = {
    fontSize: "sm",
    color: "gray.400",
}

