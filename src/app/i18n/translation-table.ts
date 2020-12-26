import { EN } from './en';
import { TH } from './th';
import { MM } from './mm';
export interface Dictionary { [lang: string]: { [key: string]: string }; }
export const TranslationTable: Dictionary = {
    EN,
    TH,
    MM
};
