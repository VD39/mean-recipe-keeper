// Import dependencies
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Import services
import { AuthenticationService } from '../../../services/authentication.service';
import { RecipeService } from '../../../services/recipe.service';

// Import interfaces
import { ICourseType, IResponse } from '../../../interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  public courseTypes: ICourseType[]; // Course types
  public searchTerm: string = ''; // Search term
  public search: boolean = false; // If search should be visible

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    public authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    // Get course types
    this.recipeService.getCourseTypes().subscribe(
      (data: IResponse) => {
        this.courseTypes = data.data; // Set course types
      },
      (error: IResponse | any) => {
        this.courseTypes = []; // Set course types to empty
      });
  }

  /**
   * Logs the user out.
   */
  logout(): void {
    this.authenticationService.logout(); // Log user out
    this.router.navigate(['/']); // Navigate to home page
  }

  /**
   * Perform the search.
   */
  performSearch(): void {
    // Check if search term is set
    if (this.searchTerm) {
      this.router.navigate(['search', this.searchTerm]); // Navigate to search page with search term
      this.searchTerm = ''; // Reset search term
      this.search = false; // Set search to false
    }
  }
}
