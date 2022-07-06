import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'داشبورد',  icon: 'fa-chalkboard text-success', class: '' },
    { path: '/people', title: 'اشخاص',  icon: 'fa-users text-info', class: '' },
    { path: '/products', title: 'کالا و خدمات',  icon: 'fa-barcode text-danger', class: '' },
    { path: '/banking', title: 'بانکداری',  icon: 'fa-credit-card text-primary', class: '' },
    { path: '/buyandsell', title: 'خرید و فروش',  icon: 'fa-chart-pie text-success', class: '' },
    { path: '/payandget', title: 'دریافت و پرداخت',  icon: 'fa-shopping-cart text-dark', class: '' },
    { path: '/incomeandexpenses', title: 'درآمد و هزینه',  icon: 'fa-percent text-warning', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
