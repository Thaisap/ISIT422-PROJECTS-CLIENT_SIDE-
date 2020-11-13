import { Component, OnInit, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {
  @Input() itemName: string;
  @Input() vendorName: string;
  @Input() description: string;
  @Input() url: string;
  descriptionArray: string[];

  constructor() { }

  ngOnInit(): void {
    this.descriptionArray = this.description.split("\\n");
    console.log(this.url);
    console.log(this.description);
  }

  goToItemUrl(): void{
    //console.log(this.url);
    window.open(this.url, "_blank");
  }

}
