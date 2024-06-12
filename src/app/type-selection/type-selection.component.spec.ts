import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TypeSelectionComponent } from './type-selection.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { GameStep, Resource, ResourceService, StepService } from '../../shared';
import { ChangeDetectionStrategy } from '@angular/core';

const currentStep$ = new BehaviorSubject<GameStep>(GameStep.SELECTION);
const currentResource$ = new BehaviorSubject<Resource>(Resource.PEOPLE);

describe('TypeSelectionComponent', () => {
  let component: TypeSelectionComponent;
  let fixture: ComponentFixture<TypeSelectionComponent>;

  let routerMock: jasmine.SpyObj<Router>;
  let stepServiceMock: jasmine.SpyObj<StepService>;
  let resourceServiceMock: jasmine.SpyObj<ResourceService>;

  class Util {
    static get buttonElements(): HTMLElement[] {
      return fixture.nativeElement.querySelectorAll(
        '.selection-wrapper__button',
      );
    }

    static initialize() {
      fixture = TestBed.createComponent(TypeSelectionComponent);

      component = fixture.componentInstance;
      fixture.detectChanges();
    }
  }

  beforeEach(() => {
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    stepServiceMock = jasmine.createSpyObj('StepService', [], {
      currentStep: currentStep$,
    });
    resourceServiceMock = jasmine.createSpyObj('ResourceService', [], {
      currentResource: currentResource$,
    });

    TestBed.configureTestingModule({
      imports: [MatButtonModule, MatIconModule],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: StepService, useValue: stepServiceMock },
        { provide: ResourceService, useValue: resourceServiceMock },
      ],
    }).overrideComponent(TypeSelectionComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default },
    });
  });

  beforeEach(() => {
    Util.initialize();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set currentStep to SELECTION on ngOnInit', () => {
    component.ngOnInit();

    expect(stepServiceMock.currentStep.value).toBe(GameStep.SELECTION);
  });

  it('should navigate and set resource to PEOPLE when button is clicked', () => {
    const spyRouter = routerMock.navigate.and.returnValue(
      Promise.resolve(true),
    );
    component.changeResourceType(Resource.PEOPLE);
    fixture.detectChanges();

    expect(spyRouter).toHaveBeenCalledWith([`${GameStep.GAME}`]);
    expect(resourceServiceMock.currentResource.value).toBe(Resource.PEOPLE);
  });

  it('should render two buttons with correct text', () => {
    expect(Util.buttonElements.length).toBe(2);
    expect(Util.buttonElements[0].textContent).toContain('People');
    expect(Util.buttonElements[1].textContent).toContain('Starships');
  });
});
