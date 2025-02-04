import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { Field } from "../ui/field";
import { Category } from "../../models/category";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";
import { createCategory, updateCategory } from "../../state/category-slice";
import {
    Button,
    Icon,
    Input,
    Stack
} from "@chakra-ui/react";

interface Props {
    existingCategory?: Category | null;
    onClose: () => void;
}

export const CategoryForm = ({ existingCategory, onClose }: Props) => {
    const dispatch = useDispatch<AppDispatch>();

    const { register, handleSubmit, reset } = useForm<Category>({
        defaultValues: {
            id: existingCategory?.id ?? 0,
            name: existingCategory?.name ?? "",
        }
    });

    const onSubmit = async (data: Category) => {
        if (existingCategory) {
            dispatch(updateCategory(data))
        }
        else dispatch(createCategory(data))

        reset({
            id: existingCategory?.id ?? 0,
            name: existingCategory?.name ?? "",
        });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
                <Field label="Name" required>
                    <Input
                        {...register("name")}
                        type="text"
                        borderWidth={2}
                        borderColor="gray.700"
                        padding={2}
                    />
                </Field>
                <Stack direction="row" marginTop={4} gap={2}>
                    <Button
                        type="submit"
                        title="Save"
                        bg="gray.600"
                        _hover={{
                            bg: "gray.700"
                        }}
                        rounded="lg"
                        color="white"
                    >
                        <Icon as={FaCheck} />
                    </Button>
                    <Button
                        onClick={() => onClose()}
                        title="Cancel"
                        bg="gray.600"
                        _hover={{
                            bg: "gray.700"
                        }}
                        rounded="lg"
                        color="white"
                    >
                        <Icon as={FaXmark} />
                    </Button>
                </Stack>
            </Stack>
        </form>
    );
};

