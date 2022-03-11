import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Components
import { SidebarComponent } from './sidebar/sidebar.component';

// Modules
import { SharedRoutingModule } from './shared-routing.module';

// Angular Material
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ListItemComponent } from './sidebar/list-item/list-item.component';

@NgModule({
  declarations: [
    SidebarComponent,
    ListItemComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    RouterModule,
    SharedRoutingModule
  ],
  exports: [
    SidebarComponent
  ]
})
export class SharedModule { }
