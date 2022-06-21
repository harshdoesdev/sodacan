interface IGame {
    init(): void;
    update(dt: number): void;
    draw(ctx: CanvasRenderingContext2D): void;
    keyUp?(key: string): void;
    keyDown?(key: string): void;
}
interface IGameConfig {
    el: string | HTMLElement;
    pixelize: boolean;
    background?: string;
}
export declare function runGame(game: IGame, config?: IGameConfig): void;
export {};
