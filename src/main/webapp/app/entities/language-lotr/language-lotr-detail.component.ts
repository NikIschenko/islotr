import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILanguageLotr } from 'app/shared/model/language-lotr.model';

@Component({
  selector: 'jhi-language-lotr-detail',
  templateUrl: './language-lotr-detail.component.html'
})
export class LanguageLotrDetailComponent implements OnInit {
  language: ILanguageLotr;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ language }) => {
      this.language = language;
    });
  }

  previousState() {
    window.history.back();
  }
}
