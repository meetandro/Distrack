import { createSystem, defaultConfig } from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
    globalCss: {
        body: {
            bg: "gray.900",
        },
        select: {
            width: "full",
            bg: "gray.800"
        },
        input: {
            _selection: {
                color: "black",
                bg: "gray.200"
            }
        },
    },
});

