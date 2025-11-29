// 1.1

function formatInput(input : number | string | Date): string {
    if (input === null || input === undefined) {
        throw new Error("Input cannot be null or undefined");
    }

    switch (typeof input) {
        case "number":
            return `Число: ${input.toFixed(2)}`;
        case "string":
            return `Строка: "${input.trim()}"`;
        case "object":
            return `Дата: ${input.toISOString()}`;
        default:
            const exhaustiveCheck: never = input;
            throw new Error(`Unsupported type: ${typeof exhaustiveCheck}`);
    }
}

// Example usages:

console.log(formatInput(123.456));
console.log(formatInput("Hello World"));
console.log(formatInput(new Date("2024-01-01T00:00:00Z")));

// 1.2

type RGBColor = [number, number, number];

enum ColorName {
    RED = "RED",
    GREEN = "GREEN",
    BLUE = "BLUE",
    BLACK = "BLACK",
    WHITE = "WHITE"
}

function rgbToHex(RGB: RGBColor): string {
    return `#${RGB.map((value) => value.toString(16).padStart(2, "0")).join("")}`;
}

function getColorInfo(color: ColorName): { RGB: RGBColor; HEX: string } {
    const colorMap: Record<ColorName, RGBColor> = {
        [ColorName.RED]: [255, 0, 0],
        [ColorName.GREEN]: [0, 255, 0],
        [ColorName.BLUE]: [0, 0, 255],
        [ColorName.BLACK]: [0, 0, 0],
        [ColorName.WHITE]: [255, 255, 255]
    };

    const RGB = colorMap[color];
    const HEX = rgbToHex(RGB);

    return { RGB, HEX };
}

// Example usages:

console.log(getColorInfo(ColorName.RED));
console.log(getColorInfo(ColorName.GREEN));
console.log(getColorInfo(ColorName.BLUE));

// 1.3

type UserId = string & { readonly brand: unique symbol };

function isUserId(value: unknown) : value is UserId {
    const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return typeof value === "string" && UUID.test(value);
}

function getUserProfile(id: UserId) {
    return id
}

// Example usages:

const validId: unknown = "123e4567-e89b-12d3-a456-426614174001";
if (isUserId(validId)) {
    console.log(getUserProfile(validId));
} else {
    console.log("Invalid UserId");
}