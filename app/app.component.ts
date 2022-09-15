import { DialogExampleComponent } from './components/dialog-example/dialog-example.component';
import { Entity, DataEntity } from './model/entity';
import { EntityService } from './services/entity.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  public title = 'testTableRest';
  public dataSource = new MatTableDataSource<DataEntity>([]);
  public displayedColumns: string[] = [
    'code',
    'name',
    'identificationNumber',
    'expirationDate',
    'contactName',
    'contactMail',
    'ipAddress',
    'logo',
    'actions'
  ];

  constructor(private entityService: EntityService, public dialog: MatDialog) {
  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.entityService.getEntities().subscribe({
      error: console.error,
      next: (value: Entity[]) => {
        // this.dataSource = value.map((value: Entity) => ({ ...value.data, code: value.code }));
        let dataWithCode: DataEntity[] = value.map((value: Entity) => ({
          ...value.data,
          code: value.code
        }));
        this.dataSource.data = dataWithCode;
        this.dataSource.sort = this.sort;
      }
    });
  }

  openDialog(data: DataEntity): void {
    const dialogRef = this.dialog.open(DialogExampleComponent, {
      width: '250px',
      data
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
  }

  eliminarAction(element: DataEntity) {
    alert(`No se puede eliminar ${element.name}, pero buen intento`);
  }

  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();

    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
    } else {
      this.dataSource.data = data.sort((a, b) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }
}
