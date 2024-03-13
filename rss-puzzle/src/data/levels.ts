import level1 from './wordCollectionLevel1.json';
import level2 from './wordCollectionLevel2.json';
import level3 from './wordCollectionLevel3.json';
import level4 from './wordCollectionLevel4.json';
import level5 from './wordCollectionLevel5.json';
import level6 from './wordCollectionLevel6.json';
import { Level } from './levelsType';

export const levels: Array<Level> = [level1, level2, level3, level4, level5, level6];
// export const levels:{[key: number]: Level} = { 1: level1, 2: level2, 3: level3, 4: level4, 5: level5, 6: level6 };

export default levels;
