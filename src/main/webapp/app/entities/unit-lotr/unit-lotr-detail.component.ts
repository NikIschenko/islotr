import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IUnitLotr } from 'app/shared/model/unit-lotr.model';

@Component({
  selector: 'jhi-unit-lotr-detail',
  templateUrl: './unit-lotr-detail.component.html'
})
export class UnitLotrDetailComponent implements OnInit {
  unit: IUnitLotr;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ unit }) => {
      this.unit = unit;
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }
  previousState() {
    window.history.back();
  }
}
