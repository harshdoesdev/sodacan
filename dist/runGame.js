import { debounce } from "./util.js";
const getCanvasContainer = (el) => {
    return typeof el === 'string'
        ? document.querySelector(el)
        : el;
};
const getKey = (key) => {
    return key === ' ' ? 'Spacebar' : key;
};
export default function runGame(game, config = { el: '#root', pixelize: true }) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    let _lastStep, _frameRequest;
    if (config.background) {
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
        const canvasContainer = getCanvasContainer(config.el);
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
    function handleKey({ type, key }) {
        const isKeyDown = type === 'keydown';
        const keyHandler = isKeyDown ? 'keyDown' : 'keyUp';
        game[keyHandler] && game[keyHandler](getKey(key));
    }
    function attachListeners() {
        addEventListener('resize', debounce(resize, 100));
        addEventListener('keydown', handleKey);
        addEventListener('keyup', handleKey);
    }
    attachListeners();
    start();
}
;
