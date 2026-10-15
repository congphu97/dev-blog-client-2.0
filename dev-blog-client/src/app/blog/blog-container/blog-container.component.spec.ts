import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BlogContainerComponent } from './blog-container.component';

describe('BlogContainerComponent', () => {
  let component: BlogContainerComponent;
  let fixture: ComponentFixture<BlogContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BlogContainerComponent, IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BlogContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
