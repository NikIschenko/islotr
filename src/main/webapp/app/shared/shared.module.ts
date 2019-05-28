import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IslotrSharedLibsModule, IslotrSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [IslotrSharedLibsModule, IslotrSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [IslotrSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IslotrSharedModule {
  static forRoot() {
    return {
      ngModule: IslotrSharedModule
    };
  }
}
