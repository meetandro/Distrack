import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";
import { createTag, updateTag } from "../../state/tag-slice";
import { Tag } from "../../models/tag";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { Field } from "../ui/field";
import {
    Stack,
    Input,
    Button,
    Icon
} from "@chakra-ui/react";

interface Props {
    existingTag?: Tag | null;
    onClose: () => void;
}

export const TagForm = ({ existingTag, onClose }: Props) => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const { register, handleSubmit, reset } = useForm<Tag>(
        {
            defaultValues: {
                id: existingTag?.id ?? 0,
                name: existingTag?.name ?? "",
                hex: existingTag?.hex ?? "#000000",
                collectionId: Number(id),
                collectibleIds: existingTag?.collectibleIds ?? [],
            },
        }
    );

    const onSubmit = async (data: Tag) => {
        if (existingTag) {
            dispatch(updateTag(data));
        } else dispatch(createTag(data))

        reset({
            id: existingTag?.id ?? 0,
            name: existingTag?.name ?? "",
            hex: existingTag?.hex ?? "#000000",
            collectionId: Number(id),
            collectibleIds: existingTag?.collectibleIds ?? [],
        });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
                <Field label={"Name"} required>
                    <Input
                        {...register("name")}
                        type='text'
                        borderWidth={2}
                        borderColor={"gray.700"}
                        padding={2}
                    />
                </Field>
                <Field label={"Color"}>
                    <Input
                        {...register("hex")}
                        type='color'
                        w='1/12'
                        marginBottom={2}
                        borderWidth={2}
                        borderColor={"gray.700"}
                        padding={1}
                    />
                </Field>
                <Stack direction="row">
                    <Button
                        type="submit"
                        bg="gray.600"
                        rounded="lg"
                        _hover={{
                            bg: "gray.500"
                        }}
                        color="white"
                        title="Save"
                    >
                        <Icon as={FaCheck} />
                    </Button>
                    <Button
                        onClick={() => onClose()}
                        bg="gray.600"
                        rounded="lg"
                        _hover={{
                            bg: "gray.500"
                        }}
                        color="white"
                        title="Cancel"
                    >
                        <Icon as={FaXmark} />
                    </Button>
                </Stack>
            </Stack>
        </form>
    );
};

