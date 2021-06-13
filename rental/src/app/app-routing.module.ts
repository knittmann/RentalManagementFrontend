import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.components';
import { RentalCreateComponent } from './rentals/rental-create/rental-create.component';
import { RentalListComponent } from './rentals/rental-list/rental-list.component';
import { RentalUpdateComponent } from './rentals/rental-update/rental-update.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { IsLoggedInGuard } from './guards/is-logged-in.guard';

const routes: Routes = [
  { path: '', redirectTo:'',pathMatch: 'full'},
  { path: 'users', component:UserListComponent, canActivate: [IsLoggedInGuard]},
  { path: 'login', component:LoginComponent},
  { path: 'rental',component:RentalListComponent},
  { path: 'rental-create', component:RentalCreateComponent},
  { path: 'updateRental/:id', component: RentalUpdateComponent },
  { path: '**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
