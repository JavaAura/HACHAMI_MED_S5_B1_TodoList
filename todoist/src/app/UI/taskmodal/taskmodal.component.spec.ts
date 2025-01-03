import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskmodalComponent } from './taskmodal.component';

describe('TaskmodalComponent', () => {
  let component: TaskmodalComponent;
  let fixture: ComponentFixture<TaskmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskmodalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
