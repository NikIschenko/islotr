import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'unit-lotr',
        loadChildren: './unit-lotr/unit-lotr.module#IslotrUnitLotrModule'
      },
      {
        path: 'image-lotr',
        loadChildren: './image-lotr/image-lotr.module#IslotrImageLotrModule'
      },
      {
        path: 'language-lotr',
        loadChildren: './language-lotr/language-lotr.module#IslotrLanguageLotrModule'
      },
      {
        path: 'expedition-lotr',
        loadChildren: './expedition-lotr/expedition-lotr.module#IslotrExpeditionLotrModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IslotrEntityModule {}
