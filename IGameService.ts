interface IGameService {
    createSprite(color: number): ISprite;
    increaseScore(increment: number): void;
    gameover(): void;
}