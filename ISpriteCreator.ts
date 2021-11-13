import { ISprite } from './ISprite'

export interface ISpriteCreator {
    createSprite(color: number): ISprite;
}