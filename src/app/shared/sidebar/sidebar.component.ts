import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidebarService } from '../services/sidebar.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  private minWidthShow: number = 940;

  constructor(private sidebarService: SidebarService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // Es temporal...
    setTimeout(() => {
      this.onResize(window.innerWidth);
    }, 100)
  }

  @HostListener('window:resize', ['$event.target.innerWidth'])
  onResize(width: number): void {
    const isBigger = (width >= this.minWidthShow);
    const decideOpenClose = this.sidebarService.decideOpenClose;
    if(isBigger && decideOpenClose) {
      this.sidebarService.openWithSide();
    }
    else if(!isBigger && !decideOpenClose) {
      this.sidebarService.closeWithOver();
    }
  }
}
