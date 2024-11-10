import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { last } from 'rxjs';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [FormsModule],
  // otros imports y configuraciones
})
export class AppModule {}



@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent implements OnInit {

  multiStepForms: FormGroup;
  currentStepIndex = 0;

  public id_user:string = '';


  constructor(private fb: FormBuilder){

    this.multiStepForms = this.fb.group({
        steps: this.fb.array([
          this.fb.group({
            id_user: [ , Validators.required]
          }),
          this.fb.group({
            firstName:  [ , Validators.required],
            lastNameP:  [ , Validators.required],
            lastNameM:  [ , Validators.required ],
            phone:      [ , Validators.required ],
            birthdate:   [ , Validators.required ],
          }),
          this.fb.group({
            companyName:      [Validators.required],


          })

        ])
    });

  }

  ngOnInit(): void {
    this.id_user = localStorage.getItem('user') || this.id_user;
  }


  get steps(){
    return this.multiStepForms.get('steps') as FormArray;
  }

  get currentStep(){
    return this.steps.at(this.currentStepIndex) as FormGroup;
  }

  nextStep(){
    if(this.currentStep.valid  && this.currentStepIndex < this.steps.length -1){
      this.currentStepIndex++;
    }else if(this.currentStepIndex === 0){
      this.currentStepIndex++;
    }
  }

  previousStep(){
    if(this.currentStepIndex > 0){
      this.currentStepIndex--;
    }
  }




}
