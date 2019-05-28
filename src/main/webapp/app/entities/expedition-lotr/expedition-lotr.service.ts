import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IExpeditionLotr } from 'app/shared/model/expedition-lotr.model';

type EntityResponseType = HttpResponse<IExpeditionLotr>;
type EntityArrayResponseType = HttpResponse<IExpeditionLotr[]>;

@Injectable({ providedIn: 'root' })
export class ExpeditionLotrService {
  public resourceUrl = SERVER_API_URL + 'api/expeditions';

  constructor(protected http: HttpClient) {}

  create(expedition: IExpeditionLotr): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(expedition);
    return this.http
      .post<IExpeditionLotr>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(expedition: IExpeditionLotr): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(expedition);
    return this.http
      .put<IExpeditionLotr>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IExpeditionLotr>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IExpeditionLotr[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(expedition: IExpeditionLotr): IExpeditionLotr {
    const copy: IExpeditionLotr = Object.assign({}, expedition, {
      dispatchTime: expedition.dispatchTime != null && expedition.dispatchTime.isValid() ? expedition.dispatchTime.toJSON() : null,
      deadLine: expedition.deadLine != null && expedition.deadLine.isValid() ? expedition.deadLine.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dispatchTime = res.body.dispatchTime != null ? moment(res.body.dispatchTime) : null;
      res.body.deadLine = res.body.deadLine != null ? moment(res.body.deadLine) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((expedition: IExpeditionLotr) => {
        expedition.dispatchTime = expedition.dispatchTime != null ? moment(expedition.dispatchTime) : null;
        expedition.deadLine = expedition.deadLine != null ? moment(expedition.deadLine) : null;
      });
    }
    return res;
  }
}
