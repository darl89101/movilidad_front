import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SearchService } from '../../core/services/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  formFilter: FormGroup;
  private subscriptions: Subscription[] = [];
  constructor(
    private readonly router: Router,
    private readonly searchService: SearchService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((m) => m.unsubscribe());
  }

  initForm() {
    this.formFilter = this.fb.group({
      searchTerm: [''],
    });

    const searchEvent = this.formFilter.controls.searchTerm.valueChanges
      .pipe(debounceTime(150), distinctUntilChanged())
      .subscribe((val) => this.search(val));
    this.subscriptions.push(searchEvent);
  }

  search(filter: string) {
    this.searchService.search(filter);
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/auth/login');
  }
}
