import { Box, Button, Center, Input, Stack } from "@chakra-ui/react";
import { Field } from "../ui/field";
import React, { useContext, useState } from "react";
import { Collection } from "../../models/collection";
import { CollectionContext } from "../../context/collections-context";

interface Props {
    onClose: () => void;
}

export const CollectionForm = ({ onClose }: Props) => {
    const [collection, setCollection] = useState<Collection>({
        name: '',
        description: '',
        id: 0,
        createdDate: new Date(),
        collectibles: [],
    });
    const { addCollection } = useContext(CollectionContext)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCollection({
            ...collection,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        addCollection(collection)

        setCollection({ name: '', description: '', id: 0, createdDate: new Date(), collectibles: [] });
        onClose();
    }

    return (
        <Box bg={"gray.800"} padding={5} rounded={5}>
            <form onSubmit={handleSubmit} className="space-y-4 text-white">
                <Stack>
                    <Field label="Name" required>
                        <Input
                            type="text"
                            name="name"
                            value={collection.name}
                            onChange={handleChange}
                            borderWidth={2}
                            borderColor={"gray.700"}
                            padding={2}
                        />
                    </Field>
                    <Field label="Description">
                        <Input
                            borderColor={"gray.700"}
                            borderWidth={2}
                            padding={2}
                            type="text"
                            name="description"
                            value={collection.description ?? ''}
                            onChange={handleChange} />
                    </Field>
                </Stack>
                <Center>
                    <Button type="submit" _hover={{ textDecoration: "underline" }}>Create</Button>
                </Center>
            </form>
        </Box>
    );
};
