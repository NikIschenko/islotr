import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { IslotrSharedModule } from 'app/shared';
import {
  UnitLotrComponent,
  UnitLotrDetailComponent,
  UnitLotrUpdateComponent,
  UnitLotrDeletePopupComponent,
  UnitLotrDeleteDialogComponent,
  unitRoute,
  unitPopupRoute
} from './';

const ENTITY_STATES = [...unitRoute, ...unitPopupRoute];

@NgModule({
  imports: [IslotrSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    UnitLotrComponent,
    UnitLotrDetailComponent,
    UnitLotrUpdateComponent,
    UnitLotrDeleteDialogComponent,
    UnitLotrDeletePopupComponent
  ],
  entryComponents: [UnitLotrComponent, UnitLotrUpdateComponent, UnitLotrDeleteDialogComponent, UnitLotrDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IslotrUnitLotrModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
