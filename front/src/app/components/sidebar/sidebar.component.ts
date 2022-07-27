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
    { path: '/product', title: 'کالا و خدمات',  icon: 'fa-barcode text-danger', class: '' },
    { path: '/new-factor', title: 'ثبت فاکتور',  icon: 'fa-clipboard-list text-dark', class: '' },
    { path: '/buy-and-sell', title: 'گزارشات',  icon: 'fa-chart-pie text-success', class: '' },
    { path: '/financial', title: 'مالی',  icon: 'fa-credit-card text-warning', class: '' },
    { path: '/support', title: 'پشتیانی',  icon: 'fa-cog text-primary', class: '' }
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
