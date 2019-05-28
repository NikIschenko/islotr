import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILanguageLotr } from 'app/shared/model/language-lotr.model';
import { AccountService } from 'app/core';
import { LanguageLotrService } from './language-lotr.service';

@Component({
  selector: 'jhi-language-lotr',
  templateUrl: './language-lotr.component.html'
})
export class LanguageLotrComponent implements OnInit, OnDestroy {
  languages: ILanguageLotr[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected languageService: LanguageLotrService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.languageService
      .query()
      .pipe(
        filter((res: HttpResponse<ILanguageLotr[]>) => res.ok),
        map((res: HttpResponse<ILanguageLotr[]>) => res.body)
      )
      .subscribe(
        (res: ILanguageLotr[]) => {
          this.languages = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInLanguages();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ILanguageLotr) {
    return item.id;
  }

  registerChangeInLanguages() {
    this.eventSubscriber = this.eventManager.subscribe('languageListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
