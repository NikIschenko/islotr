import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IExpeditionLotr } from 'app/shared/model/expedition-lotr.model';
import { AccountService } from 'app/core';
import { ExpeditionLotrService } from './expedition-lotr.service';

@Component({
  selector: 'jhi-expedition-lotr',
  templateUrl: './expedition-lotr.component.html'
})
export class ExpeditionLotrComponent implements OnInit, OnDestroy {
  expeditions: IExpeditionLotr[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected expeditionService: ExpeditionLotrService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.expeditionService
      .query()
      .pipe(
        filter((res: HttpResponse<IExpeditionLotr[]>) => res.ok),
        map((res: HttpResponse<IExpeditionLotr[]>) => res.body)
      )
      .subscribe(
        (res: IExpeditionLotr[]) => {
          this.expeditions = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInExpeditions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IExpeditionLotr) {
    return item.id;
  }

  registerChangeInExpeditions() {
    this.eventSubscriber = this.eventManager.subscribe('expeditionListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
