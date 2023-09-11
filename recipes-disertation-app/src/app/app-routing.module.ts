import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from './core/environments/environment';
import { LayoutComponent } from './core/components/layout/layout.component';
import { LoginComponent } from './features/auth/components/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'login',
        pathMatch: 'full',
        component: LoginComponent,
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('../app/features/auth/auth.module').then(
            (m) => m.AuthModule
          ),
        // canActivate: [AuthGuard, RoleGuard],
        // data: { feature: Features.Dashboard },
      },
      {
        path: 'fridge',
        loadChildren: () =>
          import('../app/features/fridge/fridge.module').then(
            (m) => m.FridgeModule
          ),
        // canActivate: [AuthGuard, RoleGuard],
        // data: { feature: Features.Employees },
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../app/features/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
        // canActivate: [AuthGuard, RoleGuard],
        // data: { feature: Features.Employees },
      },
      {
        path: 'home',
        loadChildren: () =>
          import('../app/features/home/home.module').then(
            (m) => m.HomeModule
          ),
        // canActivate: [AuthGuard, RoleGuard],
        // data: { feature: Features.Employees },
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('../app/features/cart/cart.module').then(
            (m) => m.CartModule
          ),
        // canActivate: [AuthGuard, RoleGuard],
        // data: { feature: Features.Employees },
      },
      {
        path: 'recipe',
        loadChildren: () =>
          import('../app/features/about-product/about-product.module').then(
            (m) => m.ProductModule
          ),
        // canActivate: [AuthGuard, RoleGuard],
        // data: { feature: Features.Employees },
      },
      // {
      //   path: 'profile',
      //   loadChildren: () =>
      //     import('./views/profile/profile.module').then((m) => m.ProfileModule),
      //   // canActivate: [AuthGuard, RoleGuard],
      //   // data: { feature: Features.Profile },
      // },
    ],
  },
];

const routes_dev: Routes = [
  {
    path: 'style',
    loadChildren: () =>
      import('./styles/style.module').then((m) => m.StyleModule),
  },
];

if (!environment.production) {
  routes.push(...routes_dev);
}


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
