import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormBuilder, FormGroup, Form, Validators } from '@angular/forms'
import { ApiService } from '../api.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, CommonModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
    form!: FormGroup;
    fichier:boolean = false;

    constructor(private fb:FormBuilder, private apiService:ApiService){

      this.form = this.fb.group({
        'url': ['', [Validators.required]]
      })
    }

    // Fonction pour executer l'envoye des données

    sendData():void{
      const data = {
        'url': this.form.get('url')?.value
      }
      this.apiService.sendUrl(data).subscribe(
        {
          next: response =>{
            this.fichier = !this.fichier
           },
          error: erro =>{ }
        }
      )
    }


}
