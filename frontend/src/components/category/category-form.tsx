import { Box, Button, Input, Stack } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { Category } from "../../models/category";
import { useContext } from "react";
import { CategoryContext } from "../../context/category-context";
import { useForm } from "react-hook-form";

interface Props {
    existingCategory?: Category | null;
    onClose: () => void;
}

export const CategoryForm = ({ existingCategory, onClose }: Props) => {
    const { register, handleSubmit, reset } = useForm<Category>({
        defaultValues: {
            id: existingCategory?.id ?? 0,
            name: existingCategory?.name ?? "",
        }
    });
    const { addCategory, editCategory } = useContext(CategoryContext)

    const onSubmit = async (data: Category) => {
        if (existingCategory) editCategory(data)
        else addCategory(data)

        reset();
        onClose();
    };

    return (
        <Box className="bg-gray-800 p-6 rounded-lg shadow-md text-gray-100 mt-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                </Stack>
                <Button
                    type="submit"
                    className="w-full py-2 bg-green-600 rounded-lg text-white hover:bg-green-500 transition-all"
                >
                    Apply
                </Button>
                <Button
                    onClick={() => onClose()}
                    className="w-full py-2 bg-gray-600 rounded-lg text-white hover:bg-gray-500 transition-all mt-2"
                >
                    Cancel
                </Button>
            </form>
        </Box>
    );
};
