import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ExpeditionLotr } from 'app/shared/model/expedition-lotr.model';
import { ExpeditionLotrService } from './expedition-lotr.service';
import { ExpeditionLotrComponent } from './expedition-lotr.component';
import { ExpeditionLotrDetailComponent } from './expedition-lotr-detail.component';
import { ExpeditionLotrUpdateComponent } from './expedition-lotr-update.component';
import { ExpeditionLotrDeletePopupComponent } from './expedition-lotr-delete-dialog.component';
import { IExpeditionLotr } from 'app/shared/model/expedition-lotr.model';

@Injectable({ providedIn: 'root' })
export class ExpeditionLotrResolve implements Resolve<IExpeditionLotr> {
  constructor(private service: ExpeditionLotrService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IExpeditionLotr> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ExpeditionLotr>) => response.ok),
        map((expedition: HttpResponse<ExpeditionLotr>) => expedition.body)
      );
    }
    return of(new ExpeditionLotr());
  }
}

export const expeditionRoute: Routes = [
  {
    path: '',
    component: ExpeditionLotrComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'islotrApp.expedition.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ExpeditionLotrDetailComponent,
    resolve: {
      expedition: ExpeditionLotrResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'islotrApp.expedition.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ExpeditionLotrUpdateComponent,
    resolve: {
      expedition: ExpeditionLotrResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'islotrApp.expedition.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ExpeditionLotrUpdateComponent,
    resolve: {
      expedition: ExpeditionLotrResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'islotrApp.expedition.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const expeditionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ExpeditionLotrDeletePopupComponent,
    resolve: {
      expedition: ExpeditionLotrResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'islotrApp.expedition.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
