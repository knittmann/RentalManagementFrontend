import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.components';
import { RentalCreateComponent } from './rentals/rental-create/rental-create.component';
import { RentalListComponent } from './rentals/rental-list/rental-list.component';
import { RentalUpdateComponent } from './rentals/rental-update/rental-update.component';
import { UserComponent } from './users/user.component';

const routes: Routes = [
  { path: '', redirectTo:'',pathMatch: 'full'},
  { path: 'user',component: UserComponent},
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
