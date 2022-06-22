import Vec2 from "./vec2";

export default class Sprite {
    image: ImageBitmap
    position: Vec2 = Vec2.zero()
    size: Vec2 = Vec2.zero()
    scale: Vec2 = Vec2.zero()
    rotation: number = 0.0
    srcPosition: Vec2
    srcSize: Vec2

    constructor(image: ImageBitmap, srcPosition: Vec2, srcSize: Vec2) {
        this.image = image;
        this.srcPosition = srcPosition;
        this.srcSize = srcSize;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(
            this.image,
            this.srcPosition.x,
            this.srcPosition.y,
            this.srcSize.x,
            this.srcSize.y,
            this.position.x,
            this.position.y,
            this.size.x || this.srcSize.x,
            this.size.y || this.srcSize.y
        )
    }
}