import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataEntity } from 'src/app/model/entity';

@Component({
  selector: 'app-dialog-example',
  templateUrl: './dialog-example.component.html',
  styleUrls: ['./dialog-example.component.scss']
})
export class DialogExampleComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogExampleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataEntity,
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
