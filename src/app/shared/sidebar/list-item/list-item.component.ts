import { Component, Input, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  private minWidthShow: number = 940;

  @Input('routeLink') routeLink!: string;
  @Input('titleItem') titleItem!: string;
  @Input('iconItem') iconItem!: string;

  constructor(
    private sidebarService: SidebarService
  ) { }

  ngOnInit(): void {
  }

  closeSidebar = () => {
    if(window.innerWidth < this.minWidthShow)
      this.sidebarService.close()
  }
}
