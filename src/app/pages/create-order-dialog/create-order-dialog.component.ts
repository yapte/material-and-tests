import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-order-dialog',
  templateUrl: './create-order-dialog.component.html',
  styleUrls: ['./create-order-dialog.component.scss']
})
export class CreateOrderDialogComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    comment: new FormControl(),
  });

  constructor(private _dialogRef: DialogRef) { }

  ngOnInit(): void {
  }

  close() {
    this._dialogRef.close();
  }

  submit() {
    console.log(this.form.value);
  }

}
