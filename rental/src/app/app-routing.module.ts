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
import { HomeComponent } from './home/home.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { HelpComponent } from './help/help.component';
import { IsAdminGuard } from './guards/is-admin.guard';

const routes: Routes = [
  { path: '', redirectTo:'home',pathMatch: 'full'},
  { path: 'home', component:HomeComponent},
  { path: 'intro', component:IntroductionComponent},
  { path: 'help', component:HelpComponent},
  { path: 'users', component:UserListComponent, canActivate: [IsLoggedInGuard]},
  { path: 'login', component:LoginComponent},
  { path: 'rental',component:RentalListComponent, canActivate: [IsLoggedInGuard]},
  { path: 'rental-create', component:RentalCreateComponent, canActivate: [IsAdminGuard]},
  { path: 'rental-update/:id', component: RentalUpdateComponent, canActivate: [IsAdminGuard]},
  { path: '**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
