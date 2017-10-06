// Import dependencies
import { NgModule } from '@angular/core';
import {
  MatCardModule,
  MatGridListModule,
  MatButtonModule,
  MatCheckboxModule,
  MatTabsModule,
  MatInputModule,
  MatSelectModule,
  MatMenuModule,
  MatProgressBarModule,
  MatDialogModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule
} from '@angular/material';

// Material imports for material design
const MATERIAL_IMPORTS = [
  MatListModule,
  MatCardModule,
  MatGridListModule,
  MatButtonModule,
  MatCheckboxModule,
  MatTabsModule,
  MatInputModule,
  MatSelectModule,
  MatMenuModule,
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
