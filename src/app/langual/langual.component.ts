import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../translation.service';
@Component({
  selector: 'app-langual',
  templateUrl: './langual.component.html',
  styleUrls: ['./langual.component.css']
})
export class LangualComponent implements OnInit {

  constructor(
    private router: Router,
    private translationService: TranslationService
  ) { }

  ngOnInit() {
  }

  onClick(country) {
    localStorage.setItem('language', country);
    this.translationService.setLanguage(country);
    this.router.navigate(['/home']);
  }
}
