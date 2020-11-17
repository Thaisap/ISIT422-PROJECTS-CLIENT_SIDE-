import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-removable-chip',
  templateUrl: './removable-chip.component.html',
  styleUrls: ['./removable-chip.component.css']
})
export class RemovableChipComponent implements OnInit {
  @Input() tagName: string;
  removeTag: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  removeSelectedTag(): void{
    //call delete tag route
    this.removeTag = true;
  }

}
