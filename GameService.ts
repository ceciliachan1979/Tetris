// 1 is white
// 2 is red
// 3 is pink
// 4 is orange
// 5 is yellow
// 6 is green
// 7 is light green
// 8 is dark blue
// 9 is cyan
// a is purple
// b is pale
// c is dark purple
// d is weird   :(
// e is dark red
// f is black

class GameService implements IGameService {
    createSprite(color: number): ISprite
    {
        let theSprite: Sprite;
        if (color == 1) {
            theSprite = sprites.create(img`
2 2 2 2 2 2 2 2 2 2 
2 f f f f f f f f 2 
2 f 2 2 2 2 2 2 f 2 
2 f 2 2 2 2 2 2 f 2 
2 f 2 2 2 2 2 2 f 2 
2 f 2 2 2 2 2 2 f 2 
2 f 2 2 2 2 2 2 f 2 
2 f 2 2 2 2 2 2 f 2 
2 f f f f f f f f 2 
2 2 2 2 2 2 2 2 2 2 
`)
        } else if (color == 2) {
            theSprite = sprites.create(img`
6 6 6 6 6 6 6 6 6 6 
6 f f f f f f f f 6 
6 f 6 6 6 6 6 6 f 6 
6 f 6 6 6 6 6 6 f 6 
6 f 6 6 6 6 6 6 f 6 
6 f 6 6 6 6 6 6 f 6 
6 f 6 6 6 6 6 6 f 6 
6 f 6 6 6 6 6 6 f 6 
6 f f f f f f f f 6 
6 6 6 6 6 6 6 6 6 6 
`)
        } else if (color == 3) {
            theSprite = sprites.create(img`
8 8 8 8 8 8 8 8 8 8 
8 f f f f f f f f 8 
8 f 8 8 8 8 8 8 f 8 
8 f 8 8 8 8 8 8 f 8 
8 f 8 8 8 8 8 8 f 8 
8 f 8 8 8 8 8 8 f 8 
8 f 8 8 8 8 8 8 f 8 
8 f 8 8 8 8 8 8 f 8 
8 f f f f f f f f 8 
8 8 8 8 8 8 8 8 8 8 
`)
        }
        return new MySprite(color, theSprite);
    }

    increaseScore(increment: number) {
        info.changeScoreBy(increment);
    }
    gameover() {
        game.over(false);
    }
}