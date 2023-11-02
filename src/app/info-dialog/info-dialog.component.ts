import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss']
})
/**
 * Component representing an informational dialog.
 */
export class InfoDialogComponent {
  title: string;
  content: string;

  /**
   * Constructs the dialog component.
   * @param data Data passed to the dialog containing title and content.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.title;
    this.content = data.content;
  }

  /**
   * Method to close the dialog.
   */
  onClose(): void {
    // Close the dialog
  }
}