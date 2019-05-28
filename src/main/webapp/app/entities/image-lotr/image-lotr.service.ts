import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IImageLotr } from 'app/shared/model/image-lotr.model';

type EntityResponseType = HttpResponse<IImageLotr>;
type EntityArrayResponseType = HttpResponse<IImageLotr[]>;

@Injectable({ providedIn: 'root' })
export class ImageLotrService {
  public resourceUrl = SERVER_API_URL + 'api/images';

  constructor(protected http: HttpClient) {}

  create(image: IImageLotr): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(image);
    return this.http
      .post<IImageLotr>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(image: IImageLotr): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(image);
    return this.http
      .put<IImageLotr>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IImageLotr>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IImageLotr[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(image: IImageLotr): IImageLotr {
    const copy: IImageLotr = Object.assign({}, image, {
      setUpDate: image.setUpDate != null && image.setUpDate.isValid() ? image.setUpDate.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.setUpDate = res.body.setUpDate != null ? moment(res.body.setUpDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((image: IImageLotr) => {
        image.setUpDate = image.setUpDate != null ? moment(image.setUpDate) : null;
      });
    }
    return res;
  }
}
