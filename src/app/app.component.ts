import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidebarService } from './shared/services/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  modeSidebar: any = 'side';
  title = 'Procesos Estocásticos';

  @ViewChild('sidebar') sidebar!: MatSidenav;

  constructor(
    private sidebarService: SidebarService
  ) { }

  ngAfterViewInit(): void {
    this.sidebarService.setSidenav(this.sidebar);
  }
}
