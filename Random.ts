import { IRandom } from './IRandom'

export class Random implements IRandom {
    random(): number {
        return Math.random();
    }
}