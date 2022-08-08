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
    createSprite(color: number): ISprite {
        let theSprite: Sprite;
        if (color == 1) {
            theSprite = sprites.create(img`
9 9 9 9 9 9 9 9 9 9
9 f f f f f f f f 9
9 f 9 9 9 9 9 9 f 9
9 f 9 9 9 9 9 9 f 9
9 f 9 9 9 9 9 9 f 9
9 f 9 9 9 9 9 9 f 9
9 f 9 9 9 9 9 9 f 9
9 f 9 9 9 9 9 9 f 9
9 f f f f f f f f 9
9 9 9 9 9 9 9 9 9 9
`)
        } else if (color == 2) {
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
        } else if (color == 3) {
            theSprite = sprites.create(img`
4 4 4 4 4 4 4 4 4 4
4 f f f f f f f f 4
4 f 4 4 4 4 4 4 f 4
4 f 4 4 4 4 4 4 f 4
4 f 4 4 4 4 4 4 f 4
4 f 4 4 4 4 4 4 f 4
4 f 4 4 4 4 4 4 f 4
4 f 4 4 4 4 4 4 f 4
4 f f f f f f f f 4
4 4 4 4 4 4 4 4 4 4
`)
        } else if (color == 4) {
            theSprite = sprites.create(img`
5 5 5 5 5 5 5 5 5 5
5 f f f f f f f f 5
5 f 5 5 5 5 5 5 f 5
5 f 5 5 5 5 5 5 f 5
5 f 5 5 5 5 5 5 f 5
5 f 5 5 5 5 5 5 f 5
5 f 5 5 5 5 5 5 f 5
5 f 5 5 5 5 5 5 f 5
5 f f f f f f f f 5
5 5 5 5 5 5 5 5 5 5
`)
        } else if (color == 5) {
            theSprite = sprites.create(img`
7 7 7 7 7 7 7 7 7 7
7 f f f f f f f f 7
7 f 7 7 7 7 7 7 f 7
7 f 7 7 7 7 7 7 f 7
7 f 7 7 7 7 7 7 f 7
7 f 7 7 7 7 7 7 f 7
7 f 7 7 7 7 7 7 f 7
7 f 7 7 7 7 7 7 f 7
7 f f f f f f f f 7
7 7 7 7 7 7 7 7 7 7
`)
        } else if (color == 6) {
            theSprite = sprites.create(img`
a a a a a a a a a a
a f f f f f f f f a
a f a a a a a a f a
a f a a a a a a f a
a f a a a a a a f a
a f a a a a a a f a
a f a a a a a a f a
a f a a a a a a f a
a f f f f f f f f a
a a a a a a a a a a
`)
        } else if (color == 7) {
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