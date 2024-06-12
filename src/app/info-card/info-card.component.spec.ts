import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InfoCardComponent } from './info-card.component';
import { TitleCasePipe, AsyncPipe, NgClass } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { BehaviorSubject } from 'rxjs';
import { mockPerson, mockStarShip } from '../../assets/mocks/mock-data';
import { ResourceService, Resource, CompareStatus } from '../../shared';
import { ChangeDetectionStrategy, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

const resource$ = new BehaviorSubject<Resource>(Resource.PEOPLE);

describe('InfoCardComponent', () => {
  let component: InfoCardComponent;
  let fixture: ComponentFixture<InfoCardComponent>;
  let mockResourceService: Partial<ResourceService>;

  class Util {
    static get matCard(): DebugElement {
      return fixture.debugElement.query(By.css('mat-card.info-card'));
    }

    static initialize() {
      fixture = TestBed.createComponent(InfoCardComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }
  }

  beforeEach(async () => {
    mockResourceService = {
      currentResource: resource$,
    } as Partial<ResourceService>;

    await TestBed.configureTestingModule({
      imports: [
        InfoCardComponent,
        TitleCasePipe,
        AsyncPipe,
        NgClass,
        MatCardModule,
      ],

      providers: [{ provide: ResourceService, useValue: mockResourceService }],
    }).overrideComponent(InfoCardComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default },
    });
  });

  beforeEach(() => {
    Util.initialize();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set person data when Resource is PEOPLE', waitForAsync(() => {
    component.data = mockPerson;

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges(); // Trigger another change detection cycle
      expect(component.person).toEqual(mockPerson);
      expect(component.starShip).toBeUndefined();
    });
  }));

  it('should set starship data when Resource is STARSHIP', waitForAsync(() => {
    mockResourceService.currentResource?.next(Resource.STARSHIPS);
    fixture.detectChanges(); // Trigger change detection
    component.data = mockStarShip;

    // Wait for the change detection to complete
    fixture.whenStable().then(() => {
      fixture.detectChanges(); // Trigger another change detection cycle
      expect(component.starShip).toEqual(mockStarShip);
      expect(component.person).toBeUndefined();
    });
  }));

  it('should update status correctly', () => {
    component.status = CompareStatus.WIN;
    expect(component.status).toEqual(CompareStatus.WIN);
  });

  it('should render the card with correct content', waitForAsync(() => {
    component.resource$ =
      mockResourceService.currentResource as BehaviorSubject<Resource>;
    component.data = mockPerson;

    // Wait for the change detection to complete
    fixture.whenStable().then(() => {
      fixture.detectChanges(); // Trigger another change detection cycle

      expect(Util.matCard.nativeElement).not.toBeNull();
      expect(Util.matCard.nativeElement.textContent).toContain(mockPerson.name);
    });
  }));
});
