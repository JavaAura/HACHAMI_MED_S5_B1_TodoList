import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./pages/home/home.module").then(m => m.HomeModule)
  },

  {
    path: "dashboard",
    loadChildren: () => import("./pages/dashboard/dashboard.module").then(m => m.DashboardModule)
  },
  {
    path: "category",
    loadChildren: () => import("./pages/categories/category.module").then(m => m.CategoryModule)
  },


  // { path: 'login', component: LoginComponent },


  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
