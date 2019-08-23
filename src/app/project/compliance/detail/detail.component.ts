import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { Compliance } from 'app/models/compliance';
import { Project } from 'app/models/project';
import { ApiService } from 'app/services/api';
import { StorageService } from 'app/services/storage.service';
import { DocumentService } from 'app/services/document.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-compliance-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class ComplianceDetailComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<boolean> = new Subject<boolean>();
  public document: Compliance = null;
  public currentProject: Project = null;
  public publishText: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public api: ApiService,
    private _changeDetectionRef: ChangeDetectorRef,
    private storageService: StorageService,
    private snackBar: MatSnackBar,
    private documentService: DocumentService,
  ) {
  }

  ngOnInit() {
    this.currentProject = this.storageService.state.currentProject.data;

    this.route.data
      .takeUntil(this.ngUnsubscribe)
      .subscribe((res: any) => {
        this.document = res.compliance.data;
        this._changeDetectionRef.detectChanges();
      });
  }

  download(item) {
    console.log('DOWNLOAD TODO:', item);
  }

  public openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
