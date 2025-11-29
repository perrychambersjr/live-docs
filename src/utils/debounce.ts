export function debounce<F extends (...args: any[]) => void>(func: F, wait: number): F {
    let timeout: NodeJS.Timeout;

    return function(this: any, ...args: any[]) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    } as F;

}