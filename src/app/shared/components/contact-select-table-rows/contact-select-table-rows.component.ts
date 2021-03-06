import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { TableComponent } from 'app/shared/components/table-template/table.component';
import { TableObject } from '../table-template/table-object';
import { StorageService } from 'app/services/storage.service';
import { Router } from '@angular/router';
import { NavigationStackUtils } from 'app/shared/utils/navigation-stack-utils';

@Component({
  selector: 'app-contact-select-table-rows',
  templateUrl: './contact-select-table-rows.component.html',
  styleUrls: ['./contact-select-table-rows.component.scss']
})

export class ContactSelectTableRowsComponent implements OnInit, TableComponent {

  @Input() data: TableObject;
  @Input() columnData: Array<any>;
  @Input() smallTable: boolean;

  @Output() selectedCount: EventEmitter<any> = new EventEmitter();

  public contacts: any;
  public paginationData: any;
  public columns: any;
  public useSmallTable: boolean;


  constructor(
    private navigationStackUtils: NavigationStackUtils,
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.contacts = this.data.data;
    this.paginationData = this.data.paginationData;
    this.columns = this.columnData;
    this.useSmallTable = this.smallTable;
  }

  selectItem(item) {
    this.storageService.state.selectedContact = item;
    if (this.navigationStackUtils.getNavigationStack()) {
      const url = this.navigationStackUtils.getLastBackUrl();
      this.navigationStackUtils.popNavigationStack();
      this.router.navigate(url);
    }
  }
}
