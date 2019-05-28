import { Moment } from 'moment';

export const enum Complexity {
  EXTREME = 'EXTREME',
  HARD = 'HARD',
  NORMAL = 'NORMAL',
  EASY = 'EASY'
}

export interface IExpeditionLotr {
  id?: number;
  complexity?: Complexity;
  dispatchTime?: Moment;
  deadLine?: Moment;
  rate?: number;
  unitId?: number;
}

export class ExpeditionLotr implements IExpeditionLotr {
  constructor(
    public id?: number,
    public complexity?: Complexity,
    public dispatchTime?: Moment,
    public deadLine?: Moment,
    public rate?: number,
    public unitId?: number
  ) {}
}
