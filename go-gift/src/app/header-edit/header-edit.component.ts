import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header-edit',
  templateUrl: './header-edit.component.html',
  styleUrls: ['./header-edit.component.css']
})
export class HeaderEditComponent implements OnInit {
  @Input() title: string;
  @Output() clickFunc = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  buttonClick(){
    this.clickFunc.emit();
  }

}
