import { canvas } from "./canvas";
const canvasSize = {
    width: 0,
    height: 0
};
export const getCanvasSize = () => {
    canvasSize.width = canvas.width;
    canvasSize.height = canvas.height;
    return canvasSize;
};
export const debounce = (func, waitFor) => {
    let timeout = 0;
    const debounced = (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), waitFor);
    };
    return debounced;
};
