import Vec2 from "./Vec2";
export default class Sprite {
    constructor(image, srcPosition, srcSize) {
        this.position = Vec2.zero();
        this.size = Vec2.zero();
        this.scale = Vec2.zero();
        this.rotation = 0.0;
        this.image = image;
        this.srcPosition = srcPosition;
        this.srcSize = srcSize;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.srcPosition.x, this.srcPosition.y, this.srcSize.x, this.srcSize.y, this.position.x, this.position.y, this.size.x || this.srcSize.x, this.size.y || this.srcSize.y);
    }
}
