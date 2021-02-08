import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Keyboard } from '../shared/keyboard';
import { ActivatedRoute, Router } from '@angular/router';
import { KeyboardService } from '../shared/keyboard.service';

@Component({
  selector: 'app-keyboard-new',
  templateUrl: './keyboard-new.component.html',
  styleUrls: ['./keyboard-new.component.css']
})
export class KeyboardNewComponent implements OnInit {

  pageTitle = 'Keyboard New';
  errorMessage: string;
  keyboardForm: FormGroup;

  prodId:number;
  keyboard: Keyboard;

  constructor(private fb: FormBuilder,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private keyboardService: KeyboardService) {  }

  ngOnInit(): void {
    this.keyboardForm = this.fb.group({
      title: '',
      price: '',
      description: '',
      image: ''
    });

    // Read the keyboard Id from the route parameter
    this.prodId = parseInt(this.activatedroute.snapshot.params['keyboardId']);
  }

  saveKeyboard(): void {
    if (this.keyboardForm.valid) {
      if (this.keyboardForm.dirty) {
        this.keyboard = this.keyboardForm.value;
        this.keyboard.id = this.prodId;
        
        this.keyboardService.createKeyboard(this.keyboard)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
        
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.keyboardForm.reset();
    this.router.navigate(['']);
  }
  
}
