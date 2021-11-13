// https://arcade.makecode.com/reference
// https://tetris.com/play-tetris

scene.setBackgroundColor(1);
game.onUpdateInterval(50, update);

let random = new Random();
let spriteCreator = new GameService();
let gameObject = new Game(12, 12, random, spriteCreator);

function update() {    
    let button = Button.None;
    if (controller.left.isPressed()) {
        button = Button.Left;
    } else if (controller.right.isPressed()) {
        button = Button.Right;
    } else if (controller.up.isPressed()) {
        button = Button.Up;
    } else if (controller.down.isPressed()) {
        button = Button.Down;
    } else if (controller.A.isPressed()) {
        button = Button.A;
    } else if (controller.B.isPressed()) {
        button = Button.B;
    }
    gameObject.next(button);
}