import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { LanguageLotr } from 'app/shared/model/language-lotr.model';
import { LanguageLotrService } from './language-lotr.service';
import { LanguageLotrComponent } from './language-lotr.component';
import { LanguageLotrDetailComponent } from './language-lotr-detail.component';
import { LanguageLotrUpdateComponent } from './language-lotr-update.component';
import { LanguageLotrDeletePopupComponent } from './language-lotr-delete-dialog.component';
import { ILanguageLotr } from 'app/shared/model/language-lotr.model';

@Injectable({ providedIn: 'root' })
export class LanguageLotrResolve implements Resolve<ILanguageLotr> {
  constructor(private service: LanguageLotrService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ILanguageLotr> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<LanguageLotr>) => response.ok),
        map((language: HttpResponse<LanguageLotr>) => language.body)
      );
    }
    return of(new LanguageLotr());
  }
}

export const languageRoute: Routes = [
  {
    path: '',
    component: LanguageLotrComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'islotrApp.language.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: LanguageLotrDetailComponent,
    resolve: {
      language: LanguageLotrResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'islotrApp.language.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: LanguageLotrUpdateComponent,
    resolve: {
      language: LanguageLotrResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'islotrApp.language.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: LanguageLotrUpdateComponent,
    resolve: {
      language: LanguageLotrResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'islotrApp.language.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const languagePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: LanguageLotrDeletePopupComponent,
    resolve: {
      language: LanguageLotrResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'islotrApp.language.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
