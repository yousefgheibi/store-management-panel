import { Routes } from '@angular/router';
import { BuyAndSellComponent } from 'src/app/pages/buy-and-sell/buy-and-sell.component';
import { IncomeAndExpensesComponent } from 'src/app/pages/income-and-expenses/income-and-expenses.component';
import { NewFactorComponent } from 'src/app/pages/new-factor/new-factor.component';
import { PeopleComponent } from 'src/app/pages/people/people.component';
import { ProductComponent } from 'src/app/pages/product/product.component';
import { SupportComponent } from 'src/app/pages/support/support.component';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'buy-and-sell',   component: BuyAndSellComponent },
    { path: 'financial',  component: IncomeAndExpensesComponent },
    { path: 'people',   component: PeopleComponent },
    { path: 'product',      component: ProductComponent },
    { path: 'support',      component: SupportComponent },
    { path: 'new-factor',      component: NewFactorComponent }
    
];
