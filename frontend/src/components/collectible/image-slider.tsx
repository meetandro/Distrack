import { useState } from "react";
import { Link } from "react-router-dom";
import {
    Box,
    Button,
    Center,
    Float,
    Image,
    Stack
} from "@chakra-ui/react";

export const ImageSlider = ({ images, collectionId, collectibleId }: { images: string[], collectionId: number, collectibleId: number }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <Box position="relative" display="inline-block" width="1/7">
            <Center>
                <Link to={`/collections/${collectionId}/collectibles/${collectibleId}`}>
                    <Image
                        src={`https://localhost:5001${images[currentIndex]}`}
                        alt={`Image ${currentIndex + 1}`}
                        height={200}
                        width={180}
                        rounded="lg"
                        maxHeight="96"
                    />
                </Link>
            </Center>

            {images.length > 1 && (
                <Float placement="middle-center">
                    <Stack direction="row" gap={20} pointerEvents="none">
                        <Button
                            onClick={handlePrev}
                            rounded="sm"
                            bg="gray.800"
                            _hover={{
                                bg: "gray.900",
                                opacity: 1
                            }}
                            opacity={0.25}
                            pointerEvents="auto"
                            color="white"
                        >
                            ❮
                        </Button>
                        <Button
                            onClick={handleNext}
                            rounded="sm"
                            bg="gray.800"
                            _hover={{
                                bg: "gray.900",
                                opacity: 1
                            }}
                            opacity={0.25}
                            pointerEvents="auto"
                            color="white"
                        >
                            ❯
                        </Button>
                    </Stack>
                </Float>
            )}
        </Box>
    );
};

