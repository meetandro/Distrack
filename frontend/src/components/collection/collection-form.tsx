import { Button, Center, Input, Stack } from "@chakra-ui/react";
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-white">
            <Stack>
                <Field label="Name" required>
                    <Input
                        {...register("name")}
                        type="text"
                        className="border-2 p-2 border-zinc-600"
                    />
                </Field>
                <Field label="Description">
                    <Input
                        {...register("description")}
                        type="text"
                        className="border-2 p-2 border-zinc-600"
                    />
                </Field>
            </Stack>
            <Center>
                <Button type="submit" className="p-5 bg-zinc-600 hover:bg-zinc-700">Create</Button>
            </Center>
        </form>
    );
};
