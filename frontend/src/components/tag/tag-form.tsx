import { Stack, Input, Button } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { useParams } from "react-router-dom";
import { Tag } from "../../models/tag";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";
import { createTag, updateTag } from "../../state/tag-slice";

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
                    />
                </Field>
                <Field label={"Color"}>
                    <Input
                        {...register("hex")}
                        type='color'
                    />
                </Field>
            </Stack>
            <Button type="submit">
                Apply
            </Button>
            <Button
                onClick={() => onClose()}
                className="w-full py-2 bg-gray-600 rounded-lg text-white hover:bg-gray-500 transition-all mt-2"
            >
                Cancel
            </Button>
        </form>
    );
}
