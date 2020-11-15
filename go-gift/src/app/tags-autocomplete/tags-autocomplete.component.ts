import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import {Observable} from 'rxjs';
import {NgbTypeaheadConfig} from '@ng-bootstrap/ng-bootstrap';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { allTags } from '../allTags';
import { UserService } from '../user.service';

@Component({
  selector: 'app-tags-autocomplete',
  templateUrl: './tags-autocomplete.component.html',
  styleUrls: ['./tags-autocomplete.component.css'],
  providers: [NgbTypeaheadConfig] 
})
export class TagsAutocompleteComponent implements OnInit {
  @Input() buttonName: string;
  @Output() enterFunc = new EventEmitter();
  @Output() clickFunc = new EventEmitter();
  tagName: string;
  allTagNames: string[];

  constructor(config: NgbTypeaheadConfig, private userService: UserService) {
      config.showHint = true;
   }

  ngOnInit(): void {
    this.getAllTags();
  }

  getAllTags(): void{
    this.userService.getAllTags()
    .subscribe(allTags => this.allTagNames = allTags.tags);
  }

  keyPressEnter(): void{
    this.enterFunc.emit(this.tagName);
    this.tagName = '';
  }

  buttonClick(): void{
    this.clickFunc.emit(this.tagName);
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.allTagNames.filter(v => v.toLowerCase().startsWith(term.toLocaleLowerCase())).splice(0, 10))
    )

}
