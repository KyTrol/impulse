import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder) { 
    this.searchForm = formBuilder.group({
      query: ['', Validators.required ]
    });
  }

  search(value): void {
    
  }
  
  ngOnInit() {
    
  }

}
