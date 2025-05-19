import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsFeedbacksComponent } from './clients-feedbacks.component';

describe('ClientsFeedbacksComponent', () => {
  let component: ClientsFeedbacksComponent;
  let fixture: ComponentFixture<ClientsFeedbacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsFeedbacksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsFeedbacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
