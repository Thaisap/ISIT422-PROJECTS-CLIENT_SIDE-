import { Component, OnInit, Input, EventEmitter, Output  } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {UserService} from '../user.service';


@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {
  @Input() itemName: string;
  @Input() vendorName: string;
  @Input() itemPrice: string;
  @Input() url: string;
  @Input() itemId: string;
  descriptionArray: string[];
  @Output() buttonName = new EventEmitter();

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  
  }

  goToItemUrl(): void{
    window.open(this.url, "_blank");
  }
 addItemToUserWishlist(itemId) : void{
    this.userService.addItemToUserWishlist('5f9725288c008df2d8d1c241', itemId)
    .subscribe((info) => console.log(info));
 
 };
 buttonClick2(){
  this.buttonName.emit();
};

};
