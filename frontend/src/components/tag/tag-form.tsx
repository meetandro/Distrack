import { Box, Stack, Input, Button } from "@chakra-ui/react";
import { Field } from "../ui/field";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Tag } from "../../models/tag";
import { TagContext } from "../../context/tag-context";

interface Props {
    existingTag?: Tag | null;
    onClose: () => void;
}

export const TagForm = ({ existingTag, onClose }: Props) => {
    const { id } = useParams<{ id: string }>();
    const [tag, setTag] = useState<Tag>({
        id: existingTag?.id ?? 0,
        name: existingTag?.name ?? '',
        hex: existingTag?.hex ?? '#000000',
        collectionId: Number(id),
        collectibleIds: existingTag?.collectibleIds ?? []
    });

    const { addTag, editTag } = useContext(TagContext)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setTag((prevTag) => ({
            ...prevTag,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (existingTag) {
            editTag(tag)
        }
        else {
            addTag(tag)
        }
        setTag({ id: 0, name: '', hex: '#000000', collectionId: Number(id), collectibleIds: [] });
        onClose();
    };

    return (
        <Box>
            <form onSubmit={handleSubmit}>
                <Stack>
                    <Field label={"Name"} required>
                        <Input
                            type='text'
                            name="name"
                            value={tag.name}
                            onChange={handleChange}
                        />
                    </Field>
                    <Field label={"Color"}>
                        <Input
                            type='color'
                            name='hex'
                            value={tag.hex}
                            onChange={handleChange}
                        />
                    </Field>
                </Stack>
                <Button type="submit">
                    Apply
                </Button>
            </form>
        </Box>
    );
}
