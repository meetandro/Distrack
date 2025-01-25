import { Box, Button, Center, Input, Stack } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { useContext } from "react";
import { Collection } from "../../models/collection";
import { CollectionContext } from "../../context/collections-context";
import { useForm } from "react-hook-form";

interface Props {
    onClose: () => void;
}

export const CollectionForm = ({ onClose }: Props) => {
    const { register, handleSubmit, reset } = useForm<Collection>({
        defaultValues: {
            id: 0,
            name: '',
            description: '',
            createdDate: new Date(),
            collectibles: [],
        }
    });
    const { addCollection } = useContext(CollectionContext)

    const onSubmit = async (data: Collection) => {
        addCollection(data)

        reset();
        onClose();
    }

    return (
        <Box bg={"gray.800"} padding={5} rounded={5}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-white">
                <Stack>
                    <Field label="Name" required>
                        <Input
                            {...register("name")}
                            type="text"
                            borderWidth={2}
                            borderColor={"gray.700"}
                            padding={2}
                        />
                    </Field>
                    <Field label="Description">
                        <Input
                            {...register("description")}
                            borderColor={"gray.700"}
                            borderWidth={2}
                            padding={2}
                            type="text"
                        />
                    </Field>
                </Stack>
                <Center>
                    <Button type="submit" _hover={{ textDecoration: "underline" }}>Create</Button>
                </Center>
            </form>
        </Box>
    );
};
