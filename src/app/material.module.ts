import { NgModule } from '@angular/core';

import {
  MatCardModule,
  MatGridListModule,
  MatButtonModule,
  MatCheckboxModule,
  MatTabsModule,
  MatTooltipModule,
  MatAutocompleteModule,
  MatInputModule,
  MatSelectModule,
  MatSliderModule,
  MatMenuModule,
  MatSidenavModule,
  MatProgressBarModule,
  MatDialogModule,
  MatSnackBarModule,
  MatToolbarModule,
  MdMenuModule,
  MatIconModule,
  MatListModule
} from '@angular/material';

export const MATERIAL_IMPORTS = [
  MatListModule,
  MdMenuModule,
  MatCardModule,
  MatGridListModule,
  MatButtonModule,
  MatCheckboxModule,
  MatTabsModule,
  MatTooltipModule,
  MatAutocompleteModule,
  MatInputModule,
  MatSelectModule,
  MatSliderModule,
  MatMenuModule,
  MatSidenavModule,
  MatProgressBarModule,
  MatDialogModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatIconModule

];

@NgModule({
  imports: [...MATERIAL_IMPORTS],
  exports: [...MATERIAL_IMPORTS],
})

export class MaterialModule { }
