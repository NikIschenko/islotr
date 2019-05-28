import { Moment } from 'moment';

export interface IImageLotr {
  id?: number;
  imageContentType?: string;
  image?: any;
  setUpDate?: Moment;
  unitId?: number;
}

export class ImageLotr implements IImageLotr {
  constructor(
    public id?: number,
    public imageContentType?: string,
    public image?: any,
    public setUpDate?: Moment,
    public unitId?: number
  ) {}
}
