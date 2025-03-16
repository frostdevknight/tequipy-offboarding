import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OffboardingDialogFormComponent } from '../offboarding-dialog-form/offboarding-dialog-form.component';
import { Employee } from '../employees.service';

@Component({
  selector: 'app-offboarding-dialog',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './offboarding-dialog.component.html',
  styleUrl: './offboarding-dialog.component.scss'
})
export class OffboardingDialogComponent {
  readonly dialog = inject(MatDialog);
  employee = input.required<Employee>();
  id = input.required<string>();

  openDialog() {
    const dialogRef = this.dialog.open(OffboardingDialogFormComponent, { data: { id: this.id() } });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
