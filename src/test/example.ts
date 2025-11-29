// Logs hello world
function hello(): void {
  console.log("Hello World");
}

// foo bar baz
function fooBars(): void {
  console.log('something')
}

// Normal exported arrow function
/** Adds two numbers together */
export const add = (a: number, b: number) => a + b;

// Arrow function with no parameters
/** Returns a fixed greeting */
export const greet = () => "Hello World";

// Arrow function with a single parameter and inline comment
/** Squares a number */
export const square = (x: number) => {
  return x * x; // multiply
};

// Arrow function assigned to let
/** Multiplies two numbers */
let multiply = (x: number, y: number) => x * y;

// Default export arrow function
/** Logs a message */
export default (msg: string) => {
  console.log(msg);
};

// Arrow function with complex type
/** Returns a Promise of a string */
export const fetchMessage = async (): Promise<string> => {
  return "Hello async world";
};
