import { Box, Button, Input, Stack } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { Category } from "../../models/category";
import { useContext, useState } from "react";
import { CategoryContext } from "../../context/category-context";

interface Props {
    existingCategory?: Category;
    onClose: () => void;
}

export const CategoryForm = ({ existingCategory, onClose }: Props) => {
    const [category, setCategory] = useState<Category>({ id: existingCategory?.id ?? 0, name: existingCategory?.name ?? '' });
    const { editCategory, addCategory } = useContext(CategoryContext)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setCategory((prevCat) => ({
            ...prevCat,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (existingCategory) {
            editCategory(category)
        }
        else {
            addCategory(category)
        }
        setCategory({ id: 0, name: '' }); // Reset form
        onClose();
    };

    return (
        <Box className="bg-gray-800 p-6 rounded-lg shadow-md text-gray-100 mt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <Stack>
                    <Field label="Name" required>
                        <Input
                            type="text"
                            name="name"
                            value={category.name}
                            onChange={handleChange}
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
