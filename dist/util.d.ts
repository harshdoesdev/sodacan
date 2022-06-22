export declare const getCanvasSize: () => {
    width: number;
    height: number;
};
export declare const debounce: <F extends (...args: any) => any>(func: F, waitFor: number) => (...args: Parameters<F>) => ReturnType<F>;
