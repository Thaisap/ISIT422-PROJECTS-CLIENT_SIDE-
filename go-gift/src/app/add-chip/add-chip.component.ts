import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-chip',
  templateUrl: './add-chip.component.html',
  styleUrls: ['./add-chip.component.css']
})
export class AddChipComponent implements OnInit {
  @Output() clickFun = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  buttonClick(){
    this.clickFun.emit();
  }
}
