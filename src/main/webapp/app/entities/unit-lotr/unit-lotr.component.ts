import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IUnitLotr } from 'app/shared/model/unit-lotr.model';
import { AccountService } from 'app/core';
import { UnitLotrService } from './unit-lotr.service';

@Component({
  selector: 'jhi-unit-lotr',
  templateUrl: './unit-lotr.component.html'
})
export class UnitLotrComponent implements OnInit, OnDestroy {
  units: IUnitLotr[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected unitService: UnitLotrService,
    protected jhiAlertService: JhiAlertService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.unitService
      .query()
      .pipe(
        filter((res: HttpResponse<IUnitLotr[]>) => res.ok),
        map((res: HttpResponse<IUnitLotr[]>) => res.body)
      )
      .subscribe(
        (res: IUnitLotr[]) => {
          this.units = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInUnits();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IUnitLotr) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInUnits() {
    this.eventSubscriber = this.eventManager.subscribe('unitListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
