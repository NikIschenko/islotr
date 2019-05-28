import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILanguageLotr } from 'app/shared/model/language-lotr.model';

type EntityResponseType = HttpResponse<ILanguageLotr>;
type EntityArrayResponseType = HttpResponse<ILanguageLotr[]>;

@Injectable({ providedIn: 'root' })
export class LanguageLotrService {
  public resourceUrl = SERVER_API_URL + 'api/languages';

  constructor(protected http: HttpClient) {}

  create(language: ILanguageLotr): Observable<EntityResponseType> {
    return this.http.post<ILanguageLotr>(this.resourceUrl, language, { observe: 'response' });
  }

  update(language: ILanguageLotr): Observable<EntityResponseType> {
    return this.http.put<ILanguageLotr>(this.resourceUrl, language, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILanguageLotr>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILanguageLotr[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
