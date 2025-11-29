// 2.1

function addTag(tags: readonly string[], tag: string): string[] {
    if (tags.includes(tag)) {
        return [...tags];
    }

    return [...tags, tag];
}

function removeTag(tags: readonly string[], tag: string): string[] {
    return tags.filter(t => t !== tag);
}

function mergeTags(...lists: readonly string[][]): string[] {
    return [...new Set(lists.flat())]
}

// Example usages:

const original: readonly string[] = ["typescript", "javascript"];
const withAddedTag = addTag(original, "programming");
const withRemovedTag = removeTag(original, "javascript");
const mergedTags = mergeTags([...original], ["nodejs", "typescript"], ["web", "javascript"]);

console.log("Original:", original);
console.log("With Added Tag:", withAddedTag);
console.log("With Removed Tag:", withRemovedTag);
console.log("Merged Tags:", mergedTags);

// 2.2

// 2.3

type Invoice = {
    id: string;
    amount: number;
    status: "paid" | "free";
}

function sumByStatus(invoices: Invoice[]): { paid: number; free: number } {
    return invoices.reduce((acc, invoice) => {
        if (invoice.status === "paid") {
            acc.paid += invoice.amount;
        } else if (invoice.status === "free") {
            acc.free += invoice.amount;
        }
        return acc;
    }, { paid: 0, free: 0 });
}

// Example usages:

const invoices: Invoice[] = [
    { id: "1", amount: 100, status: "paid" },
    { id: "2", amount: 200, status: "free" },
    { id: "3", amount: 150, status: "paid" },
    { id: "4", amount: 50, status: "free" }
];

const totals = sumByStatus(invoices);
console.log("Totals by Status:", totals);

// 2.4

function chunkArray<T>(items: readonly T[], chunkSize: number): T[][] {
    if (!Number.isFinite(chunkSize) || !Number.isInteger(chunkSize) || chunkSize <= 0) {
        throw new RangeError("chunkSize must be a positive integer");
    }

    const result: T[][] = [];
    for (let i = 0; i < items.length; i += chunkSize) {
        result.push(items.slice(i, i + chunkSize));
    }
    return result;
}

// Example usages:


const nums: readonly number[] = [1, 2, 3, 4, 5, 6, 7];
console.log(chunkArray(nums, 3)); // [[1,2,3],[4,5,6],[7]]
console.log(chunkArray([], 2));   // []
