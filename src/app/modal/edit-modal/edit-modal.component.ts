import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DataIn {
  isNew: boolean;
  name: string;
  lName: string;
  age: number;
}

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataIn: DataIn,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditModalComponent>,
  ) { }

  myForm = this.fb.group({
    name: new FormControl({value: '', disabled: false}),
    lName: new FormControl({value: '', disabled: false}),
    age: new FormControl({value: '', disabled: false}),
  });

  ngOnInit(): void {
    console.log(this.dataIn)
    if(!this.dataIn.isNew){
      this.myForm.patchValue({
        ...this.dataIn
      })
    }
  }

  editField(){
    //console.log(this.myForm.value)
    let response = {
      ...this.myForm.value
    }
    this.dialogRef.close({newUser: response});
  }


}
