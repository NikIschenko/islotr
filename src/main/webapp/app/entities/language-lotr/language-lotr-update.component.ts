import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ILanguageLotr, LanguageLotr } from 'app/shared/model/language-lotr.model';
import { LanguageLotrService } from './language-lotr.service';
import { IUnitLotr } from 'app/shared/model/unit-lotr.model';
import { UnitLotrService } from 'app/entities/unit-lotr';

@Component({
  selector: 'jhi-language-lotr-update',
  templateUrl: './language-lotr-update.component.html'
})
export class LanguageLotrUpdateComponent implements OnInit {
  language: ILanguageLotr;
  isSaving: boolean;

  units: IUnitLotr[];

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.minLength(1), Validators.maxLength(15)]],
    units: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected languageService: LanguageLotrService,
    protected unitService: UnitLotrService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ language }) => {
      this.updateForm(language);
      this.language = language;
    });
    this.unitService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUnitLotr[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUnitLotr[]>) => response.body)
      )
      .subscribe((res: IUnitLotr[]) => (this.units = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(language: ILanguageLotr) {
    this.editForm.patchValue({
      id: language.id,
      title: language.title,
      units: language.units
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const language = this.createFromForm();
    if (language.id !== undefined) {
      this.subscribeToSaveResponse(this.languageService.update(language));
    } else {
      this.subscribeToSaveResponse(this.languageService.create(language));
    }
  }

  private createFromForm(): ILanguageLotr {
    const entity = {
      ...new LanguageLotr(),
      id: this.editForm.get(['id']).value,
      title: this.editForm.get(['title']).value,
      units: this.editForm.get(['units']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILanguageLotr>>) {
    result.subscribe((res: HttpResponse<ILanguageLotr>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
