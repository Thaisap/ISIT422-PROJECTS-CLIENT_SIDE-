import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-add-tags-modal',
  templateUrl: './add-tags-modal.component.html',
  styleUrls: ['./add-tags-modal.component.css']
})
export class AddTagsModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) {}
  ngOnInit(): void {
  }

}
