import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { IslotrSharedModule } from 'app/shared';
import {
  ExpeditionLotrComponent,
  ExpeditionLotrDetailComponent,
  ExpeditionLotrUpdateComponent,
  ExpeditionLotrDeletePopupComponent,
  ExpeditionLotrDeleteDialogComponent,
  expeditionRoute,
  expeditionPopupRoute
} from './';

const ENTITY_STATES = [...expeditionRoute, ...expeditionPopupRoute];

@NgModule({
  imports: [IslotrSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ExpeditionLotrComponent,
    ExpeditionLotrDetailComponent,
    ExpeditionLotrUpdateComponent,
    ExpeditionLotrDeleteDialogComponent,
    ExpeditionLotrDeletePopupComponent
  ],
  entryComponents: [
    ExpeditionLotrComponent,
    ExpeditionLotrUpdateComponent,
    ExpeditionLotrDeleteDialogComponent,
    ExpeditionLotrDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IslotrExpeditionLotrModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
