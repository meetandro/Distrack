import { Box, Button, Image } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const ImageSlider = ({ images, collectionId, collectibleId }: { images: string[], collectionId: number, collectibleId: number }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <Box className="relative inline-block">
            <Link to={`/collections/${collectionId}/collectibles/${collectibleId}`}>
                <Image
                    src={`https://localhost:5001${images[currentIndex]}`}
                    alt={`Image ${currentIndex + 1}`}
                    height={200}
                    width={150}
                    className="object-contain rounded-lg max-h-96"
                />
            </Link>

            {images.length > 1 && (
                <Box className="absolute inset-0 pointer-events-none w-full h-full opacity-0 hover:opacity-100 flex justify-between items-center">
                    <Button
                        onClick={handlePrev}
                        className="bg-opacity-75 pointer-events-auto ml-3 bg-zinc-800 hover:bg-zinc-900 rounded-sm text-white"
                    >
                        ❮
                    </Button>
                    <Button
                        onClick={handleNext}
                        className="bg-opacity-75 pointer-events-auto mr-3 bg-zinc-800 hover:bg-zinc-900 rounded-sm text-white"
                    >
                        ❯
                    </Button>
                </Box>
            )}
        </Box>
    );
};

