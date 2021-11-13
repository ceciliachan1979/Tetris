class Game {

    dummy: ISprite;
    board: ISprite[][];
    bricks: number[][][];
    state: GameState;
    random: IRandom;
    spriteCreator: ISpriteCreator
    brickIndex: number;
    brickRow: number;
    brickCol: number;
    _brickHeight: number;
    _brickWidth: number;
    brickDirection: number;
    brickSprites: ISprite[];

    constructor(random: IRandom, spriteCreator: ISpriteCreator) {
        this.state = GameState.Initial;
        this.random = random;
        this.spriteCreator = spriteCreator;
        this.brickSprites = [];
        this.board = [];
        this.brickIndex = -1;
        this.brickRow = -1;
        this._brickHeight = -1;
        this._brickWidth = -1;
        this.brickCol = -1;
        this.brickDirection = -1;
        this.dummy = new NullSprite();
        for (let row = 0; row < this.boardHeight(); row++) {
            this.board[row] = [];
            for (let col = 0; col < this.boardWidth(); col++) {
                this.board[row][col] = this.dummy;
            }
        }
        this.bricks = [
            [
                [1, 1, 1],
                [0, 1, 0]
            ]
        ];
    }

    // TODO, take inputs
    public next(): void {
        if (this.state == GameState.Initial) {
            this.createBrick(this.random.random() % this.bricks.length, this.random.random() % 4);
            this.placeBrick();
            this.state = GameState.Falling;
        } else if (this.state == GameState.Falling) {
            this.unplaceBrick();
            this.brickRow++;
            if (this.isBrickValid()) {
                this.placeBrick();
            } else {
                this.brickRow--;
                this.placeBrick();
                this.state = GameState.Initial;
                this.brickSprites = [];
            }
        }
    }

    private createBrick(brickIndex: number, brickDirection: number) {
        this.brickIndex = brickIndex;
        this.brickDirection = brickDirection;
        this._brickHeight = this.bricks[this.brickIndex].length;
        this._brickWidth = this.bricks[this.brickIndex][0].length;
        this.brickRow = 0;
        this.brickCol = Math.floor((this.boardWidth() - this.brickWidth()) / 2);
        for (let row = 0; row < this.brickHeight(); row++) {
            for (let col = 0; col < this.brickWidth(); col++) {
                let brickEntry = this.brickEntry(row, col);
                if (brickEntry != 0) {
                    this.brickSprites.push(this.spriteCreator.createSprite(brickEntry));
                }
            }
        }
    }

    private isBrickValid(): boolean {
        if (this.brickRow < 0) {
            return false;
        }
        if (this.brickRow + this.brickHeight() > this.boardHeight()) {
            return false;
        }
        if (this.brickCol < 0) {
            return false;
        }
        if (this.brickCol + this.brickWidth() > this.boardWidth()) {
            return false;
        }
        for (let row = 0; row < this.brickHeight(); row++) {
            for (let col = 0; col < this.brickWidth(); col++) {
                let brickEntry = this.brickEntry(row, col);
                if (this.board[this.brickRow + row][this.brickCol + col].color() != 0 && brickEntry != 0) {
                    return false;
                }
            }
        }
        return true;
    }

    private placeBrick() {
        let brickSpriteIndex = 0;
        for (let row = 0; row < this.brickHeight(); row++) {
            for (let col = 0; col < this.brickWidth(); col++) {
                let brickEntry = this.brickEntry(row, col);
                let x = this.brickCol + col;
                let y = this.brickRow + row;
                if (brickEntry != 0) {
                    this.brickSprites[brickSpriteIndex].moveTo(x * 10 + 20 + 5, y * 10 + 5);
                    this.board[y][x] = this.brickSprites[brickSpriteIndex];
                    brickSpriteIndex++;
                } else {
                    this.board[y][x] = this.dummy;
                }
            }
        }
        return true;
    }

    private unplaceBrick() {
        for (let row = 0; row < this.brickHeight(); row++) {
            for (let col = 0; col < this.brickWidth(); col++) {
                this.board[this.brickRow + row][this.brickCol + col] = this.dummy;
            }
        }
    }

    private brickEntry(row: number, col: number): number {
        let r: number;
        let c: number;
        switch (this.brickDirection) {
            case 0: r = row; c = col; break;
            case 1: r = col; c = this._brickWidth - row - 1; break;
            case 2: r = this._brickHeight - row - 1; c = this._brickWidth - col - 1; break;
            case 3: r = this._brickHeight - col - 1; c = row; break;
            default: throw 1;
        }
        return this.bricks[this.brickIndex][r][c];
    }

    private brickHeight(): number {
        switch (this.brickDirection) {
            case 0: return this._brickHeight;
            case 1: return this._brickWidth;
            case 2: return this._brickHeight;
            case 3: return this._brickWidth;
            default: throw 1;
        }

    }

    private brickWidth(): number {
        switch (this.brickDirection) {
            case 0: return this._brickWidth;
            case 1: return this._brickHeight;
            case 2: return this._brickWidth;
            case 3: return this._brickHeight;
            default: throw 1;
        }
    }

    private boardHeight(): number {
        return 10;
    }

    private boardWidth(): number {
        return 5
    }

    // Unit test only
    public debugBoard(): string {
        let result: string = "\n";
        for (let row = 0; row < this.boardHeight(); row++) {
            for (let col = 0; col < this.boardWidth(); col++) {
                result = result + this.board[row][col].color().toString();
            }
            result = result + "\n";
        }
        return result;
    }
}