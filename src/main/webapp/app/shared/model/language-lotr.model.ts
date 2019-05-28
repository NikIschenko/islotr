import { IUnitLotr } from 'app/shared/model/unit-lotr.model';

export interface ILanguageLotr {
  id?: number;
  title?: string;
  units?: IUnitLotr[];
}

export class LanguageLotr implements ILanguageLotr {
  constructor(public id?: number, public title?: string, public units?: IUnitLotr[]) {}
}
