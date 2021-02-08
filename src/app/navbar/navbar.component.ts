import { Component, OnInit } from '@angular/core';
import { KeyboardService } from '../shared/keyboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  id : any;

  constructor(private keyboardService: KeyboardService, private router: Router) { }

  ngOnInit() {
  }

  newKeyboard(){
      // Get max keyboard Id from the keyboard list
      this.keyboardService.getMaxKeyboardId().subscribe(
        data => this.id = data
      );
      this.router.navigate(['/keyboards', this.id, 'new'])

  }

}
