import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidTokenGuard } from './guards/valid-token.guard';

const routes: Routes = [
  // implementing lazy load
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule)
  },
  // protected routes with guards
  {
    path: 'dashboard',
    loadChildren: () => import('./protected/protected.module').then(module => module.ProtectedModule),
    // GUARDS IMPLEMENTATION TO PROTECT ROUTE
    canActivate: [ValidTokenGuard]
  },

  // default routes
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
