class Game {

    _board: ISprite[][];
    _boardWidth: number;
    _boardHeight: number;
    _bricks: number[][][];
    _state: GameState;
    _random: IRandom;
    _brickIndex: number;
    _brickWidth: number;
    _brickHeight: number;
    _brickRow: number;
    _brickCol: number;
    _brickDirection: number;
    _brickSprites: ISprite[];
    _downCounter: number;
    _aPressed: boolean;
    _bPressed: boolean;
    _dummy: ISprite;
    _spritePool: ISprite[][];
    _gameService: IGameService;

    constructor(boardWidth: number, boardHeight: number, random: IRandom, gameService: IGameService) {
        this._boardWidth = boardWidth;
        this._boardHeight = boardHeight;
        this._random = random;
        this._gameService = gameService;
        this._state = GameState.Initial;
        this._brickSprites = [];
        this._board = [];
        this._downCounter = -1;
        this._aPressed = false;
        this._bPressed = false;
        this._brickIndex = -1;
        this._brickWidth = -1;
        this._brickHeight = -1;
        this._brickRow = -1;
        this._brickCol = -1;
        this._brickDirection = -1;
        this._dummy = new NullSprite();
        this._spritePool = [];
        for (let color = 0; color < 8; color++) {
            this._spritePool[color] = [];
        }
        for (let row = 0; row < this.boardHeight(); row++) {
            this._board[row] = [];
            for (let col = 0; col < this.boardWidth(); col++) {
                this._board[row][col] = this._dummy;
            }
        }
        this._bricks = [
            [
                [1, 1, 1, 1],
            ],
            [
                [2, 0, 0],
                [2, 2, 2]
            ],
            [
                [0, 0, 3],
                [3, 3, 3]
            ],
            [
                [4, 4],
                [4, 4]
            ],
            [
                [0, 5, 5],
                [5, 5, 0]
            ],
            [
                [0, 6, 0],
                [6, 6, 6]
            ],
            [
                [7, 7, 0],
                [0, 7, 7]
            ]
        ];
    }

    public next(button: Button): void {
        if (this._state == GameState.Initial) {
            this.createBrick(this._random.random() % this._bricks.length, this._random.random() % 4);
            if (!this.isBrickValid()) {
                this._gameService.gameover();
                return;
            }
            this.placeBrick();
            this._state = GameState.Falling;
            this._downCounter = 10;
        } else if (this._state == GameState.Falling) {
            this.unplaceBrick();
            this._downCounter--;
            if (button == Button.Left) {
                this._aPressed = false;
                this._bPressed = false;
                this._brickCol--;
                if (!this.isBrickValid()) {
                    this._brickCol++;
                }
            }
            else if (button == Button.Right) {
                this._aPressed = false;
                this._bPressed = false;
                this._brickCol++;
                if (!this.isBrickValid()) {
                    this._brickCol--;
                }
            }
            else if (button == Button.A) {
                this._bPressed = false;
                if (!this._aPressed) {
                    this._aPressed = true;
                    this._brickDirection = (this._brickDirection + 1) % 4;
                    if (!this.isBrickValid()) {
                        this._brickDirection = (this._brickDirection + 3) % 4;
                    }
                }
            }
            else if (button == Button.B) {
                this._aPressed = false;
                if (!this._bPressed) {
                    this._bPressed = true;
                    this._brickDirection = (this._brickDirection + 3) % 4;
                    if (!this.isBrickValid()) {
                        this._brickDirection = (this._brickDirection + 1) % 4;
                    }
                }
            } else {
                this._aPressed = false;
                this._bPressed = false;
            }
            if (this._downCounter == 0) {
                this._brickRow++;
                if (this.isBrickValid()) {
                    this.placeBrick();
                    this._downCounter = 10;
                } else {
                    this._gameService.increaseScore(1);
                    this._brickRow--;
                    this.placeBrick();
                    this.tryClear();
                    this._state = GameState.Initial;
                    this._brickSprites = [];
                    this._downCounter = -1;
                }
            }
            else {
                this.placeBrick();
            }
        }
    }

    private createBrick(brickIndex: number, brickDirection: number) {
        this._brickIndex = brickIndex;
        this._brickDirection = brickDirection;
        this._brickHeight = this._bricks[this._brickIndex].length;
        this._brickWidth = this._bricks[this._brickIndex][0].length;
        this._brickRow = 0;
        this._brickCol = Math.floor((this.boardWidth() - this.brickWidth()) / 2);
        for (let row = 0; row < this.brickHeight(); row++) {
            for (let col = 0; col < this.brickWidth(); col++) {
                let brickEntry = this.brickEntry(row, col);
                if (brickEntry != 0) {
                    this._brickSprites.push(this.getSprite(brickEntry));
                }
            }
        }
    }

    private isBrickValid(): boolean {
        if (this._brickRow < 0) {
            return false;
        }
        if (this._brickRow + this.brickHeight() > this.boardHeight()) {
            return false;
        }
        if (this._brickCol < 0) {
            return false;
        }
        if (this._brickCol + this.brickWidth() > this.boardWidth()) {
            return false;
        }
        for (let row = 0; row < this.brickHeight(); row++) {
            for (let col = 0; col < this.brickWidth(); col++) {
                let brickEntry = this.brickEntry(row, col);
                if (this._board[this._brickRow + row][this._brickCol + col].color() != 0 && brickEntry != 0) {
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
                let x = this._brickCol + col;
                let y = this._brickRow + row;
                if (brickEntry != 0) {
                    this._brickSprites[brickSpriteIndex].moveTo(x * 10 + 20 + 5, y * 10 + 5);
                    this._board[y][x] = this._brickSprites[brickSpriteIndex];
                    brickSpriteIndex++;
                }
            }
        }
        return true;
    }

    private unplaceBrick() {
        for (let row = 0; row < this.brickHeight(); row++) {
            for (let col = 0; col < this.brickWidth(); col++) {
                let brickEntry = this.brickEntry(row, col);
                let x = this._brickCol + col;
                let y = this._brickRow + row;
                if (brickEntry != 0) {
                    this._board[y][x] = this._dummy;
                }
            }
        }
    }

    private brickWidth(): number {
        switch (this._brickDirection) {
            case 0: return this._brickWidth;
            case 1: return this._brickHeight;
            case 2: return this._brickWidth;
            case 3: return this._brickHeight;
            default: throw 1;
        }
    }

    private brickHeight(): number {
        switch (this._brickDirection) {
            case 0: return this._brickHeight;
            case 1: return this._brickWidth;
            case 2: return this._brickHeight;
            case 3: return this._brickWidth;
            default: throw 1;
        }
    }

    private brickEntry(row: number, col: number): number {
        let r: number;
        let c: number;
        switch (this._brickDirection) {
            case 0: r = row; c = col; break;
            case 1: r = col; c = this._brickWidth - row - 1; break;
            case 2: r = this._brickHeight - row - 1; c = this._brickWidth - col - 1; break;
            case 3: r = this._brickHeight - col - 1; c = row; break;
            default: throw 1;
        }
        return this._bricks[this._brickIndex][r][c];
    }

    private tryClear() {
        let rowDestination = this.boardHeight() - 1;
        for (let row = this.boardHeight() - 1; row >= 0; row--) {
            let full: boolean = true;
            for (let col = 0; full && col < this.boardWidth(); col++) {
                if (this._board[row][col].color() == 0) {
                    full = false;
                }
            }
            if (full) {
                this._gameService.increaseScore(4);
                for (let col = 0; full && col < this.boardWidth(); col++) {
                    let sprite = this._board[row][col];
                    if (sprite != this._dummy) {
                        sprite.moveTo(-5, -5);
                        this._spritePool[sprite.color() - 1].push(sprite);
                        this._board[row][col] = this._dummy;
                    }
                }
            } else {
                if (row != rowDestination) {
                    for (let col = 0; col < this.boardWidth(); col++) {
                        let sprite = this._board[row][col];
                        if (sprite != this._dummy) {
                            sprite.moveTo(col * 10 + 20 + 5, rowDestination * 10 + 5);
                            this._board[rowDestination][col] = this._board[row][col];
                            this._board[row][col] = this._dummy;
                        }
                    }
                }
                rowDestination--;
            }
        }
    }

    private boardWidth(): number {
        return this._boardWidth;
    }

    private boardHeight(): number {
        return this._boardHeight;
    }

    private getSprite(color: number): ISprite {
        if (this._spritePool[color - 1].length > 0) {
            return this._spritePool[color - 1].pop();
        } else {
            return this._gameService.createSprite(color);
        }
    }

    // Unit test only
    public debugBoard(): string {
        let result: string = "\n";
        for (let row = 0; row < this.boardHeight(); row++) {
            for (let col = 0; col < this.boardWidth(); col++) {
                result = result + this._board[row][col].color().toString();
            }
            result = result + "\n";
        }
        return result;
    }
}