import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IExpeditionLotr, ExpeditionLotr } from 'app/shared/model/expedition-lotr.model';
import { ExpeditionLotrService } from './expedition-lotr.service';
import { IUnitLotr } from 'app/shared/model/unit-lotr.model';
import { UnitLotrService } from 'app/entities/unit-lotr';

@Component({
  selector: 'jhi-expedition-lotr-update',
  templateUrl: './expedition-lotr-update.component.html'
})
export class ExpeditionLotrUpdateComponent implements OnInit {
  expedition: IExpeditionLotr;
  isSaving: boolean;

  units: IUnitLotr[];
  deadLineDp: any;

  editForm = this.fb.group({
    id: [],
    complexity: [],
    dispatchTime: [],
    deadLine: [],
    rate: [null, [Validators.min(0), Validators.max(1)]],
    unitId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected expeditionService: ExpeditionLotrService,
    protected unitService: UnitLotrService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ expedition }) => {
      this.updateForm(expedition);
      this.expedition = expedition;
    });
    this.unitService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUnitLotr[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUnitLotr[]>) => response.body)
      )
      .subscribe((res: IUnitLotr[]) => (this.units = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(expedition: IExpeditionLotr) {
    this.editForm.patchValue({
      id: expedition.id,
      complexity: expedition.complexity,
      dispatchTime: expedition.dispatchTime != null ? expedition.dispatchTime.format(DATE_TIME_FORMAT) : null,
      deadLine: expedition.deadLine,
      rate: expedition.rate,
      unitId: expedition.unitId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const expedition = this.createFromForm();
    if (expedition.id !== undefined) {
      this.subscribeToSaveResponse(this.expeditionService.update(expedition));
    } else {
      this.subscribeToSaveResponse(this.expeditionService.create(expedition));
    }
  }

  private createFromForm(): IExpeditionLotr {
    const entity = {
      ...new ExpeditionLotr(),
      id: this.editForm.get(['id']).value,
      complexity: this.editForm.get(['complexity']).value,
      dispatchTime:
        this.editForm.get(['dispatchTime']).value != null ? moment(this.editForm.get(['dispatchTime']).value, DATE_TIME_FORMAT) : undefined,
      deadLine: this.editForm.get(['deadLine']).value,
      rate: this.editForm.get(['rate']).value,
      unitId: this.editForm.get(['unitId']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExpeditionLotr>>) {
    result.subscribe((res: HttpResponse<IExpeditionLotr>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackUnitById(index: number, item: IUnitLotr) {
    return item.id;
  }
}
