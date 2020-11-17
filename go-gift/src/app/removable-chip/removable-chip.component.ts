import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-removable-chip',
  templateUrl: './removable-chip.component.html',
  styleUrls: ['./removable-chip.component.css']
})
export class RemovableChipComponent implements OnInit {
  @Input() tagName: string;
  @Output() clickFunc = new EventEmitter();
  removeTag: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  removeSelectedTag(): void{
    //call delete tag route
    this.removeTag = true;
    this.clickFunc.emit();
  }

}
