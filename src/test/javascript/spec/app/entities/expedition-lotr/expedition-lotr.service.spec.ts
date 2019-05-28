/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT, DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ExpeditionLotrService } from 'app/entities/expedition-lotr/expedition-lotr.service';
import { IExpeditionLotr, ExpeditionLotr, Complexity } from 'app/shared/model/expedition-lotr.model';

describe('Service Tests', () => {
  describe('ExpeditionLotr Service', () => {
    let injector: TestBed;
    let service: ExpeditionLotrService;
    let httpMock: HttpTestingController;
    let elemDefault: IExpeditionLotr;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(ExpeditionLotrService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new ExpeditionLotr(0, Complexity.EXTREME, currentDate, currentDate, 0);
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            dispatchTime: currentDate.format(DATE_TIME_FORMAT),
            deadLine: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a ExpeditionLotr', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dispatchTime: currentDate.format(DATE_TIME_FORMAT),
            deadLine: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dispatchTime: currentDate,
            deadLine: currentDate
          },
          returnedFromService
        );
        service
          .create(new ExpeditionLotr(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a ExpeditionLotr', async () => {
        const returnedFromService = Object.assign(
          {
            complexity: 'BBBBBB',
            dispatchTime: currentDate.format(DATE_TIME_FORMAT),
            deadLine: currentDate.format(DATE_FORMAT),
            rate: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dispatchTime: currentDate,
            deadLine: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of ExpeditionLotr', async () => {
        const returnedFromService = Object.assign(
          {
            complexity: 'BBBBBB',
            dispatchTime: currentDate.format(DATE_TIME_FORMAT),
            deadLine: currentDate.format(DATE_FORMAT),
            rate: 1
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dispatchTime: currentDate,
            deadLine: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a ExpeditionLotr', async () => {
        const rxPromise = service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
