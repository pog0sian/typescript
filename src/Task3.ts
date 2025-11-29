// 3.1

interface Repository<T> {
    create(item: T): void;
    read(id: string): T | undefined;
    update(id: string, item: Partial<T>): void;
    delete(id: string): void;
}

interface MemoryRepository<T extends { id: string }> extends Repository<T> {}

class InMemoryRepository<T extends { id: string }> implements MemoryRepository<T> {
    private items = new Map<string, T>();

    read(id: string): T | undefined {
        throw new Error("Method not implemented.");
    }

    create(item: T): void {
        if (this.items.has(item.id)) {
            throw new Error(`Item with id ${item.id} already exists`);
        }
        this.items.set(item.id, item);
    }

    findById(id: string): T | undefined {
        return this.items.get(id);
    }

    update(id: string, item: Partial<T>): void {
        const existingItem = this.items.get(id);
        if (!existingItem) {
            throw new Error(`Item with id ${id} does not exist`);
        }
        const updatedItem = { ...existingItem, ...item };
        this.items.set(id, updatedItem);
    }

    delete(id: string): void {
        if (!this.items.has(id)) {
            throw new Error(`Item with id ${id} does not exist`);
        }
        this.items.delete(id);
    }
}

// Example usage:

interface Book {
    id: string;
    title: string;
    author: string;
    publishedYear: number;
}

const repo = new InMemoryRepository<Book>();

const book: Book = { id: "1", title: "Clean Code", author: "Robert C. Martin", publishedYear: 2008 };
repo.create(book);

const found = repo.findById("1");
console.log("Found:", found);

repo.update("1", { title: "Clean Code (updated)" });
console.log("After update:", repo.findById("1"));

repo.delete("1");
console.log("After delete:", repo.findById("1"));

// 3.2

type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

function deepFreeze<T>(obj: T): DeepReadonly<T> {
    Object.freeze(obj);

    Object.getOwnPropertyNames(obj).forEach((prop) => {
        const value = (obj as any)[prop];
        if (value && typeof value === "object" && !Object.isFrozen(value)) {
            deepFreeze(value);
        }
    });

    return obj as DeepReadonly<T>;
}

// Example usage:

const nestedObject = {
    level1: {
        level2: {
            level3: {
                value: "Hello"
            }
        }
    }
}

const frozenObject = deepFreeze(nestedObject);
console.log("Frozen Object:", frozenObject);