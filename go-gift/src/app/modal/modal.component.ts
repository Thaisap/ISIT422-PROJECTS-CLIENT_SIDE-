import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent {
  @Input() buttonName: string;
  @Input() modalTitle: string;

  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(ModalContent);
    modalRef.componentInstance.heading = this.modalTitle;
  }
}

@Component({
  selector: 'app-modal-content',
  template: `
    <div class="modal-header">
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
    </div>
    <div class="modal-footer">
      <div type="button" class="button" (click)="activeModal.close('Close click')">Close</div>
    </div>
  `
})

export class ModalContent {
  constructor(public activeModal: NgbActiveModal) {}
}

