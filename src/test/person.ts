// Returns a greeting for the given name
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// Adds two numbers together
function add(a: number, b: number): number {
  return a + b;
}

// Logs "Hello World" to the console
function hello(): void {
  console.log("Hello World");
}

// Checks if a person is an adult based on age
function isAdult(age: number): boolean {
  return age >= 18;
}

/* Returns a formatted string with a person's info
   including name and age */
function getPersonSummary(name: string, age: number): string {
  return `${name} is ${age} years old.`;
}

// Returns the length of a string, or 0 if null
function stringLengths(str: string | null): number {
  return str?.length ?? 0;
}