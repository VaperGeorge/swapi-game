import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { PersonsService } from './persons.service';
import { mockPersons } from '../../assets/mocks/mock-data';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

describe('PersonsService', () => {
  let service: PersonsService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PersonsService,
        provideHttpClientTesting(),
        provideHttpClient(withInterceptorsFromDi()),
      ],
    });

    service = TestBed.inject(PersonsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with an empty persons list', (done) => {
    service.persons.subscribe((persons) => {
      expect(persons.length).toBe(0);
      done();
    });
  });

  it('should fetch persons from API when persons list is empty', (done) => {
    service.getPersons().subscribe((persons) => {
      expect(service.persons.value).toEqual(persons);
      done();
    });
  });

  it('should return cached persons if they are already loaded', (done) => {
    service.persons = mockPersons; // Set initial state

    service.getPersons().subscribe((persons) => {
      expect(persons).toEqual(mockPersons);
      done();
    });
  });

  it('should clear the persons list', (done) => {
    service.persons = mockPersons; // Set initial state
    service.clear();
    service.persons.subscribe((persons) => {
      expect(persons.length).toBe(0);
      done();
    });
  });
});
