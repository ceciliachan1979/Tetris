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

class SpriteCreator implements ISpriteCreator {
    createSprite(color: number): ISprite
    {
        let theSprite = sprites.create(img`
f f f f f f f f f f 
f f f f f f f f f f 
f f f f f f f f f f 
f f f f f f f f f f 
f f f f f f f f f f 
f f f f f f f f f f 
f f f f f f f f f f 
f f f f f f f f f f 
f f f f f f f f f f 
f f f f f f f f f f 
`)
        return new MySprite(theSprite);
    }
}