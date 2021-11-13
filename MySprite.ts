// A square does look like a square
// The screen is 160 pixels wide and 120 pixels tall
// The position of the sprite is in the middle of the sprite
// 5 to 155 for x
// 5 to 115 for y

class MySprite implements ISprite {
    color: number;
    sprite: Sprite;

    constructor(color: number, sprite: Sprite) {
        this.color = color;
        this.sprite = sprite;
    }
    moveTo(x: number, y: number): void {
        this.sprite.setPosition(x, y);
    }
    color(): number {
        return this.color;
    }
}