import { HostListener, Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable()
export class SidebarService {
  private sidebar!: MatSidenav;
  private _decideOpenClose: boolean = true;

  public setSidenav = (sidebar: MatSidenav) => {
    this.sidebar = sidebar;
  }

  public set decideOpenClose(value: boolean) {
    this._decideOpenClose = value;
  }

  public get decideOpenClose(): boolean {
    return this._decideOpenClose
  }

  public open = () => {
    this.sidebar.open();
  }

  public close = () => {
    this.sidebar.close();
  }

  public toggle= () => {
    return this.sidebar.toggle();
  }

  public mode = (mode: any) => {
    return this.sidebar.mode = mode
  }

  public openWithSide() {
    this.open();
    this.mode('side');
    this.decideOpenClose = false;
  }

  public closeWithOver() {
    this.close();
    this.mode('over');
    this.decideOpenClose = true;
  }
}
