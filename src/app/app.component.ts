import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;
  projectStatuses = ['Stable', 'Critical', 'Finished'];

  ngOnInit() {
    this.projectForm = new FormGroup({
      'projectName': new FormControl(null, Validators.required, this.noTestAsync),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'projectStatus': new FormControl('Stable')
    });
  }

  onSubmit() {
    console.log(this.projectForm);
  }

  // noTest(control: FormControl): {[s: string]: boolean} {
  //   if (control.value === 'Test') {
  //     return {'noTest': true};
  //   }
  //   return null;
  // }

  noTestAsync(control: FormControl): Promise<any> | Observable<any> {
    return new Promise<any>((resolve, reject) => {
      const v = control.value;
      setTimeout(() => {
        if (v === 'Test') {
          resolve({'noTest': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
  }
}
