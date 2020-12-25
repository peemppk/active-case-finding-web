import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-langual',
  templateUrl: './langual.component.html',
  styleUrls: ['./langual.component.css']
})
export class LangualComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  onClick(){
    this.router.navigate(['/home']);
  }
}
