/** Logs hello world */
function hello(): void {
  console.log("Hello World");
}

/** foo bar baz */
function fooBars(): void {
  console.log('something')
}

/** Adds two numbers together */
export const add = (a: number, b: number) => a + b;

/** Returns a fixed greeting */
export const greet = () => "Hello World";

/** Squares a number */
export const square = (x: number) => {
  return x * x; // multiply
};

/** Multiplies two numbers */
let multiply = (x: number, y: number) => x * y;

/** Logs a message */
export default (msg: string) => {
  console.log(msg);
};

/** Returns a Promise of a string */
export const fetchMessage = async (): Promise<string> => {
  return "Hello async world";
};
