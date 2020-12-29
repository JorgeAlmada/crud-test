import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { EditModalComponent } from './modal/edit-modal/edit-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(
    public dialog: MatDialog
    ){

    }

  public dataSource = [{name: 'Jorge', lName: 'Almada', age: 25}];
  @ViewChild(MatTable) table: MatTable<any>;

  public displayedColumns: string[] = ['position', 'name', 'lName', 'age', 'edit', 'delete'];

  title = 'crud';

  ngOnInit(): void {
  }

  editModal(user, index){
    console.log(user)
    let dialogRef = this.dialog.open(EditModalComponent, {
      data: {
        isNew: false,
        name: user.name,
        lName: user.lName,
        age: user.age
      },
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().pipe().subscribe((response) => {
      if(response && response.newUser){
        console.log(response.newUser)
        this.dataSource[index] = response.newUser
        this.table.renderRows();
      }
      console.log(this.dataSource)
    });
  }

  newUser(){
    let dialogRef = this.dialog.open(EditModalComponent, {
      data: {
        isNew: true
      },
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().pipe().subscribe((response) => {
      if(response && response.newUser){
        console.log(response.newUser)
        this.dataSource.push(response.newUser)
        this.table.renderRows();
      }
      console.log(this.dataSource)
    });
  }

  deleteUser(index){
    this.dataSource.splice(index, 1)
    this.table.renderRows();
  }
}
