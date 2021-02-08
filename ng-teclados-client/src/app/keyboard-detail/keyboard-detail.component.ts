import {Component, OnInit} from '@angular/core';
import {KeyboardService} from '../shared/keyboard.service';
import {Keyboard} from '../shared/keyboard';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-keyboard-detail',
  templateUrl: './keyboard-detail.component.html',
  styleUrls: ['./keyboard-detail.component.css']
})
export class KeyboardDetailComponent implements OnInit {

  keyboard: Keyboard;
  prodId: number;

  constructor(private activatedroute: ActivatedRoute, private router: Router, private keyboardService: KeyboardService) {}

  ngOnInit() {
    this.prodId = parseInt(this.activatedroute.snapshot.params['keyboardId']);
    this.keyboardService.getKeyboardById(this.prodId).subscribe(
      (data: Keyboard) => this.keyboard = data
    );
  }
  goEdit():void{
    this.router.navigate(['/keyboards', this.prodId, 'edit']);
  }
  onBack(): void {
    this.router.navigate(['']);
  }

}
