interface IGameKeyHandler {
    (key: string): void;
}
interface IGame {
    init(): void;
    update(dt: number): void;
    draw(ctx: CanvasRenderingContext2D): void;
    keyUp?: IGameKeyHandler;
    keyDown?: IGameKeyHandler;
}
interface IGameConfig {
    el: string | HTMLElement;
    pixelize: boolean;
    background?: string;
}
export declare function runGame(game: IGame, config?: IGameConfig): void;
export {};
