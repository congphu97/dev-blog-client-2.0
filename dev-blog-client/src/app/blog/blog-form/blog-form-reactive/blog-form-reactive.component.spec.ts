import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BlogFormReactiveComponent } from './blog-form-reactive.component';

describe('BlogFormReactiveComponent', () => {
  let component: BlogFormReactiveComponent;
  let fixture: ComponentFixture<BlogFormReactiveComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BlogFormReactiveComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BlogFormReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Form is valid', () => {
    // 1. Arrange: Lấy control title ra
    const titleControl = component.blogForm.get('title');
    // 2. Act: Gán giá trị chỉ có 2 ký tự
    titleControl?.setValue('@');
    // 3. Assert: Kiểm tra xem có sinh ra lỗi minlength hay không
    expect(component.blogForm?.valid).toBeFalse();
    expect(titleControl?.hasError('minlength')).toBeTrue();
  });

  it('nên báo lỗi minlength khi tiêu đề dưới 3 ký tự', () => {
    // 1. Arrange: Lấy control title ra
    const titleControl = component.blogForm.get('title');
    // 2. Act: Gán giá trị chỉ có 2 ký tự
    titleControl?.setValue('Ab');
    // 3. Assert: Kiểm tra xem có sinh ra lỗi minlength hay không
    expect(titleControl?.valid).toBeFalse();
    expect(titleControl?.hasError('minlength')).toBeTrue();
  });

});
