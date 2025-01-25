import { Box, Button, Image } from "@chakra-ui/react";
import { useState } from "react";

export const ImageSlider = ({ images }: { images: { url: string }[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <Box className="relative">
            <Image
                src={`https://localhost:5001${images[currentIndex]}`}
                alt={`Image ${currentIndex + 1}`}
                height={300}
                width={500}
                className="w-full h-60 object-cover rounded-lg"
            />
            {images.length > 1 && (
                <>
                    <Button
                        onClick={handlePrev}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white p-2 rounded-full shadow-lg hover:bg-gray-500"
                    >
                        ❮
                    </Button>
                    <Button
                        onClick={handleNext}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white p-2 rounded-full shadow-lg hover:bg-gray-500"
                    >
                        ❯
                    </Button>
                </>
            )}
        </Box>
    );
};
