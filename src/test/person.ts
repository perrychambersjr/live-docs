/**
 * Returns a greeting for the given name.
 * @param name - The name of the person to greet.
 * @returns A personalized greeting string.
 */
function greet(name: string): string {
  return `Hello, ${name}!`;
}

/**
 * Adds two numbers together.
 * @param a - The first number.
 * @param b - The second number.
 * @returns The sum of a and b.
 */
function add(a: number, b: number): number {
  return a + b;
}

/**
 * Logs "Hello World" to the console.
 */
function hello(): void {
  console.log("Hello World");
}

/**
 * Checks if a person is an adult based on age.
 * @param age - The age of the person.
 * @returns True if age is 18 or older, false otherwise.
 */
function isAdult(age: number): boolean {
  return age >= 18;
}

/**
 * Returns a formatted string with a person's information, including name and age.
 * @param name - The name of the person.
 * @param age - The age of the person.
 * @returns A string describing the person's name and age.
 */
function getPersonSummary(name: string, age: number): string {
  return `${name} is ${age} years old.`;
}

/**
 * Returns the length of a string, or 0 if the string is null.
 * @param str - The string to measure.
 * @returns The length of the string, or 0 if null.
 */
function stringLengths(str: string | null): number {
  return str?.length ?? 0;
} 
