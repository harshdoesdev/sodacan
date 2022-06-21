import Vec2 from "./Vec2";
export default class Sprite {
    image: ImageBitmap;
    position: Vec2;
    size: Vec2;
    scale: Vec2;
    rotation: number;
    srcPosition: Vec2;
    srcSize: Vec2;
    constructor(image: ImageBitmap, srcPosition: Vec2, srcSize: Vec2);
    draw(ctx: CanvasRenderingContext2D): void;
}
