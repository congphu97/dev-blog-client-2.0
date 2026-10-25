import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ModalController } from '@ionic/angular/standalone';

import { BlogContainerComponent } from './blog-container.component';

describe('BlogContainerComponent', () => {
  let component: BlogContainerComponent;
  let fixture: ComponentFixture<BlogContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BlogContainerComponent],
      providers: [
        {
          provide: ModalController,
          useValue: {
            create: jasmine.createSpy('create').and.resolveTo({
              present: jasmine.createSpy('present').and.resolveTo(),
              onDidDismiss: jasmine.createSpy('onDidDismiss').and.resolveTo({ data: null, role: 'cancel' })
            })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BlogContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
