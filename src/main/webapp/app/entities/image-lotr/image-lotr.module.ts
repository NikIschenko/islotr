import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { IslotrSharedModule } from 'app/shared';
import {
  ImageLotrComponent,
  ImageLotrDetailComponent,
  ImageLotrUpdateComponent,
  ImageLotrDeletePopupComponent,
  ImageLotrDeleteDialogComponent,
  imageRoute,
  imagePopupRoute
} from './';

const ENTITY_STATES = [...imageRoute, ...imagePopupRoute];

@NgModule({
  imports: [IslotrSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ImageLotrComponent,
    ImageLotrDetailComponent,
    ImageLotrUpdateComponent,
    ImageLotrDeleteDialogComponent,
    ImageLotrDeletePopupComponent
  ],
  entryComponents: [ImageLotrComponent, ImageLotrUpdateComponent, ImageLotrDeleteDialogComponent, ImageLotrDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IslotrImageLotrModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
