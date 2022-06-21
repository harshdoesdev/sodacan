import { debounce } from "./util.js";

const getCanvasContainer = (el: string | HTMLElement): HTMLElement => {
    return typeof el === 'string' 
        ? document.querySelector(el) as HTMLElement
        : el;
};

const getKey = (key: string): string => {
    return key === ' ' ? 'Spacebar' : key;
};

interface IGameKeyHandler {
    (key: string): void
}

interface IGame {
    init(): void
    update(dt: number): void
    draw(ctx: CanvasRenderingContext2D): void
    keyUp?: IGameKeyHandler
    keyDown?: IGameKeyHandler
}

interface IGameConfig {
    el: string | HTMLElement,
    pixelize: boolean,
    background?: string
}

export default function runGame(
    game: IGame, 
    config: IGameConfig = { el: '#root', pixelize: true }
) {
    const canvas = document.createElement('canvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    let _lastStep: number, _frameRequest: number;

    if(config.background) {
        canvas.style.background = config.background;
    }

    context.imageSmoothingEnabled = config.pixelize;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function clearCanvas() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function appendCanvasToContainer() {
        const canvasContainer = getCanvasContainer(config.el) as HTMLElement;
        canvasContainer.appendChild(canvas);
    }

    function step() {
        const now = performance.now();
        const delta = (now - _lastStep) / 1000;
        _lastStep = now;
        game.update && game.update(delta);
        clearCanvas();
        game.draw && game.draw(context);
    }

    function loop() {
        step();
        _lastStep = performance.now();
        _frameRequest = requestAnimationFrame(loop);
    }

    function initialize() {
        game.init();
        _lastStep = performance.now();
        _frameRequest = requestAnimationFrame(loop);
    }

    function start() {
        resize();
        appendCanvasToContainer();
        initialize();
    }

    function handleKey({ type, key }: KeyboardEvent) {
        const isKeyDown = type === 'keydown';
        const keyHandler = isKeyDown ? 'keyDown' : 'keyUp';

        game[keyHandler] && (game[keyHandler] as IGameKeyHandler)(getKey(key));
    }

    function attachListeners() {
        addEventListener('resize', debounce(resize, 100));

        addEventListener('keydown', handleKey);
        addEventListener('keyup', handleKey);
    }

    attachListeners();

    start();
};