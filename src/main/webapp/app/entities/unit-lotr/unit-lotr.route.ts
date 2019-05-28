import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UnitLotr } from 'app/shared/model/unit-lotr.model';
import { UnitLotrService } from './unit-lotr.service';
import { UnitLotrComponent } from './unit-lotr.component';
import { UnitLotrDetailComponent } from './unit-lotr-detail.component';
import { UnitLotrUpdateComponent } from './unit-lotr-update.component';
import { UnitLotrDeletePopupComponent } from './unit-lotr-delete-dialog.component';
import { IUnitLotr } from 'app/shared/model/unit-lotr.model';

@Injectable({ providedIn: 'root' })
export class UnitLotrResolve implements Resolve<IUnitLotr> {
  constructor(private service: UnitLotrService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUnitLotr> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<UnitLotr>) => response.ok),
        map((unit: HttpResponse<UnitLotr>) => unit.body)
      );
    }
    return of(new UnitLotr());
  }
}

export const unitRoute: Routes = [
  {
    path: '',
    component: UnitLotrComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'islotrApp.unit.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: UnitLotrDetailComponent,
    resolve: {
      unit: UnitLotrResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'islotrApp.unit.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: UnitLotrUpdateComponent,
    resolve: {
      unit: UnitLotrResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'islotrApp.unit.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: UnitLotrUpdateComponent,
    resolve: {
      unit: UnitLotrResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'islotrApp.unit.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const unitPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: UnitLotrDeletePopupComponent,
    resolve: {
      unit: UnitLotrResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'islotrApp.unit.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
