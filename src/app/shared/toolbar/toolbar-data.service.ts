import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolbarDataService {
  private toolbarData: any = {};

  private localStorageKey = 'toolbarData';

  setToolbarData(data: any) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(data));
  }

  getToolbarData() {
    const data = localStorage.getItem(this.localStorageKey);

    console.log('GETTING TOOLBAR DATA', data)
    return data ? JSON.parse(data) : null;
  }
}