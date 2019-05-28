import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { IslotrSharedModule } from 'app/shared';
import {
  LanguageLotrComponent,
  LanguageLotrDetailComponent,
  LanguageLotrUpdateComponent,
  LanguageLotrDeletePopupComponent,
  LanguageLotrDeleteDialogComponent,
  languageRoute,
  languagePopupRoute
} from './';

const ENTITY_STATES = [...languageRoute, ...languagePopupRoute];

@NgModule({
  imports: [IslotrSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    LanguageLotrComponent,
    LanguageLotrDetailComponent,
    LanguageLotrUpdateComponent,
    LanguageLotrDeleteDialogComponent,
    LanguageLotrDeletePopupComponent
  ],
  entryComponents: [
    LanguageLotrComponent,
    LanguageLotrUpdateComponent,
    LanguageLotrDeleteDialogComponent,
    LanguageLotrDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IslotrLanguageLotrModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
