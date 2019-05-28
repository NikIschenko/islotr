import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IUnitLotr, UnitLotr } from 'app/shared/model/unit-lotr.model';
import { UnitLotrService } from './unit-lotr.service';
import { IUser, UserService } from 'app/core';
import { ILanguageLotr } from 'app/shared/model/language-lotr.model';
import { LanguageLotrService } from 'app/entities/language-lotr';

@Component({
  selector: 'jhi-unit-lotr-update',
  templateUrl: './unit-lotr-update.component.html'
})
export class UnitLotrUpdateComponent implements OnInit {
  unit: IUnitLotr;
  isSaving: boolean;

  users: IUser[];

  languages: ILanguageLotr[];
  hireDateDp: any;

  editForm = this.fb.group({
    id: [],
    hireDate: [],
    biography: [],
    numberOfTeeth: [null, [Validators.min(0), Validators.max(32)]],
    userId: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected unitService: UnitLotrService,
    protected userService: UserService,
    protected languageService: LanguageLotrService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ unit }) => {
      this.updateForm(unit);
      this.unit = unit;
    });
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.languageService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ILanguageLotr[]>) => mayBeOk.ok),
        map((response: HttpResponse<ILanguageLotr[]>) => response.body)
      )
      .subscribe((res: ILanguageLotr[]) => (this.languages = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(unit: IUnitLotr) {
    this.editForm.patchValue({
      id: unit.id,
      hireDate: unit.hireDate,
      biography: unit.biography,
      numberOfTeeth: unit.numberOfTeeth,
      userId: unit.userId
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, field: string, isImage) {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        if (isImage && !/^image\//.test(file.type)) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          const filedContentType: string = field + 'ContentType';
          this.dataUtils.toBase64(file, base64Data => {
            this.editForm.patchValue({
              [field]: base64Data,
              [filedContentType]: file.type
            });
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    }).then(
      () => console.log('blob added'), // sucess
      this.onError
    );
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const unit = this.createFromForm();
    if (unit.id !== undefined) {
      this.subscribeToSaveResponse(this.unitService.update(unit));
    } else {
      this.subscribeToSaveResponse(this.unitService.create(unit));
    }
  }

  private createFromForm(): IUnitLotr {
    const entity = {
      ...new UnitLotr(),
      id: this.editForm.get(['id']).value,
      hireDate: this.editForm.get(['hireDate']).value,
      biography: this.editForm.get(['biography']).value,
      numberOfTeeth: this.editForm.get(['numberOfTeeth']).value,
      userId: this.editForm.get(['userId']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUnitLotr>>) {
    result.subscribe((res: HttpResponse<IUnitLotr>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackUserById(index: number, item: IUser) {
    return item.id;
  }

  trackLanguageById(index: number, item: ILanguageLotr) {
    return item.id;
  }

  getSelected(selectedVals: Array<any>, option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
