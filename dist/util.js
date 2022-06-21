export const debounce = (func, waitFor) => {
    let timeout = 0;
    const debounced = (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), waitFor);
    };
    return debounced;
};
