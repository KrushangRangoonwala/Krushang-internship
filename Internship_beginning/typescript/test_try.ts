function isString(value: unknown): value is string {
    return typeof value === "string";
    }
    const input: unknown = "Hello, TypeScript!";
    if (isString(input)) {
    console.log(input.toUpperCase());
    } else {
    console.log("Not a string");
    }