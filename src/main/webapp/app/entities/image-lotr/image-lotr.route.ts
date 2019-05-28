import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ImageLotr } from 'app/shared/model/image-lotr.model';
import { ImageLotrService } from './image-lotr.service';
import { ImageLotrComponent } from './image-lotr.component';
import { ImageLotrDetailComponent } from './image-lotr-detail.component';
import { ImageLotrUpdateComponent } from './image-lotr-update.component';
import { ImageLotrDeletePopupComponent } from './image-lotr-delete-dialog.component';
import { IImageLotr } from 'app/shared/model/image-lotr.model';

@Injectable({ providedIn: 'root' })
export class ImageLotrResolve implements Resolve<IImageLotr> {
  constructor(private service: ImageLotrService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IImageLotr> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ImageLotr>) => response.ok),
        map((image: HttpResponse<ImageLotr>) => image.body)
      );
    }
    return of(new ImageLotr());
  }
}

export const imageRoute: Routes = [
  {
    path: '',
    component: ImageLotrComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'islotrApp.image.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ImageLotrDetailComponent,
    resolve: {
      image: ImageLotrResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'islotrApp.image.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ImageLotrUpdateComponent,
    resolve: {
      image: ImageLotrResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'islotrApp.image.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ImageLotrUpdateComponent,
    resolve: {
      image: ImageLotrResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'islotrApp.image.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const imagePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ImageLotrDeletePopupComponent,
    resolve: {
      image: ImageLotrResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'islotrApp.image.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
