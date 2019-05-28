import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IExpeditionLotr } from 'app/shared/model/expedition-lotr.model';

@Component({
  selector: 'jhi-expedition-lotr-detail',
  templateUrl: './expedition-lotr-detail.component.html'
})
export class ExpeditionLotrDetailComponent implements OnInit {
  expedition: IExpeditionLotr;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ expedition }) => {
      this.expedition = expedition;
    });
  }

  previousState() {
    window.history.back();
  }
}
