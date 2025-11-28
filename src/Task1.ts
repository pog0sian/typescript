// 1

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
            if (input instanceof Date) {
                return `Дата: ${input.toISOString()}`;
            }
        default:
            const exhaustiveCheck: never = input;
            throw new Error("Unsupported type");
    }
}

// Example usages:

console.log(formatInput(123.456));
console.log(formatInput("  Hello World  "));
console.log(formatInput(new Date("2024-01-01T00:00:00Z")));
