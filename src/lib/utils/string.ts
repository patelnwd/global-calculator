// Capitalize first letter
export function capitalize(str: string): string {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Capitalize each word
export function capitalizeWords(str: string): string {
    if (!str) return "";
    return str
        .split(" ")
        .map((w) => capitalize(w))
        .join(" ");
}

// Convert string to lowercase
export function toLower(str: string): string {
    return str?.toLowerCase() ?? "";
}

// Convert string to uppercase
export function toUpper(str: string): string {
    return str?.toUpperCase() ?? "";
}

// Convert to kebab-case
export function kebabCase(str: string): string {
    return str
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/\s+/g, "-")
        .toLowerCase();
}

// Convert to snake_case
export function snakeCase(str: string): string {
    return str
        .replace(/([a-z])([A-Z])/g, "$1_$2")
        .replace(/\s+/g, "_")
        .toLowerCase();
}

// Convert to camelCase
export function camelCase(str: string): string {
    return str
        .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""))
        .replace(/^(.)/, (c) => c.toLowerCase());
}

// Convert to PascalCase
export function pascalCase(str: string): string {
    return str
        .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""))
        .replace(/^(.)/, (c) => c.toUpperCase());
}

// Slugify (URL-friendly)
export function slugify(str: string): string {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
}

// Truncate with ellipsis
export function truncate(str: string, length: number): string {
    if (!str) return "";
    return str.length > length ? str.slice(0, length) + "…" : str;
}

// Remove all spaces
export function removeSpaces(str: string): string {
    return str.replace(/\s+/g, "");
}

// Replace multiple spaces with single space
export function normalizeSpaces(str: string): string {
    return str.trim().replace(/\s+/g, " ");
}

// Reverse string
export function reverseString(str: string): string {
    return str.split("").reverse().join("");
}

// Check if string is palindrome
export function isPalindrome(str: string): boolean {
    const clean = str.toLowerCase().replace(/[^a-z0-9]/g, "");
    return clean === clean.split("").reverse().join("");
}

// Repeat string n times
export function repeat(str: string, times: number): string {
    return str.repeat(times);
}

// Pad left with character
export function padLeft(str: string, length: number, char = " "): string {
    return str.padStart(length, char);
}

// Pad right with character
export function padRight(str: string, length: number, char = " "): string {
    return str.padEnd(length, char);
}
