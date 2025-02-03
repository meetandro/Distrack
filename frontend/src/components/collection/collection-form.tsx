import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";
import { createCollection } from "../../state/collection-slice";
import { Collection } from "../../models/collection";
import { Field } from "../ui/field";
import {
    Button,
    Center,
    Input,
    Stack
} from "@chakra-ui/react";

interface Props {
    onClose: () => void;
}

export const CollectionForm = ({ onClose }: Props) => {
    const { register, handleSubmit, reset } = useForm<Collection>({
        defaultValues: {
            id: 0,
            name: '',
            description: '',
            createdDate: new Date().toISOString().slice(0, 10),
            collectibles: [],
        }
    });
    const dispatch = useDispatch<AppDispatch>();

    const onSubmit = async (data: Collection) => {
        dispatch(createCollection(data))

        reset();
        onClose();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
                <Field label="Name" required>
                    <Input
                        {...register("name")}
                        type="text"
                        borderWidth={2}
                        p={2}
                        bg="gray.800"
                        borderColor="gray.600"
                    />
                </Field>
                <Field label="Description">
                    <Input
                        {...register("description")}
                        type="text"
                        borderWidth={2}
                        p={2}
                        bg="gray.800"
                        borderColor="gray.600"
                    />
                </Field>
            </Stack>
            <Center>
                <Button
                    type="submit"
                    p={5}
                    bg="gray.600"
                    color="white"
                    _hover={{
                        bg: "green.500"
                    }}
                    marginTop={5}
                >
                    Create
                </Button>
            </Center>
        </form>
    );
};

