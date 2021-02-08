import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Keyboard } from '../shared/keyboard';
import { KeyboardService } from '../shared/keyboard.service';

@Component({
  templateUrl: './keyboard-edit.component.html'
})
export class KeyboardEditComponent implements OnInit{

  pageTitle = 'Keyboard Edit';
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
    this.prodId = parseInt(this.activatedroute.snapshot.params['id']);
    this.getKeyboard(this.prodId);
  }

  getKeyboard(id: number): void {
    this.keyboardService.getKeyboardById(id)
      .subscribe(
        (keyboard: Keyboard) => this.displayKeyboard(keyboard),
        (error: any) => this.errorMessage = <any>error
      );
  }

  displayKeyboard(keyboard: Keyboard): void {
    if (this.keyboardForm) {
      this.keyboardForm.reset();
    }
    this.keyboard = keyboard;
    this.pageTitle = `Edit Keyboard: ${this.keyboard.title}`;

    // Update the data on the form
    this.keyboardForm.patchValue({
      title: this.keyboard.title,
      price: this.keyboard.price,
      description: this.keyboard.description,
      image: this.keyboard.image
    });
  }

  deleteKeyboard(): void {
    if (this.keyboard.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the keyboard: ${this.keyboard.title}?`)) {
        this.keyboardService.deleteKeyboard(this.keyboard.id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }


  saveKeyboard(): void {
    if (this.keyboardForm.valid) {
      if (this.keyboardForm.dirty) {
        this.keyboard = this.keyboardForm.value;
        this.keyboard.id = this.prodId;
        
        this.keyboardService.updateKeyboard(this.keyboard)
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
