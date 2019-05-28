import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUnitLotr } from 'app/shared/model/unit-lotr.model';

type EntityResponseType = HttpResponse<IUnitLotr>;
type EntityArrayResponseType = HttpResponse<IUnitLotr[]>;

@Injectable({ providedIn: 'root' })
export class UnitLotrService {
  public resourceUrl = SERVER_API_URL + 'api/units';

  constructor(protected http: HttpClient) {}

  create(unit: IUnitLotr): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(unit);
    return this.http
      .post<IUnitLotr>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(unit: IUnitLotr): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(unit);
    return this.http
      .put<IUnitLotr>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IUnitLotr>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IUnitLotr[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(unit: IUnitLotr): IUnitLotr {
    const copy: IUnitLotr = Object.assign({}, unit, {
      hireDate: unit.hireDate != null && unit.hireDate.isValid() ? unit.hireDate.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.hireDate = res.body.hireDate != null ? moment(res.body.hireDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((unit: IUnitLotr) => {
        unit.hireDate = unit.hireDate != null ? moment(unit.hireDate) : null;
      });
    }
    return res;
  }
}
