import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule} from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RentalUpdateComponent} from './rentals/rental-update/rental-update.component';
import { RentalCreateComponent } from './rentals/rental-create/rental-create.component';
import { RentalDeleteComponent } from './rentals/rental-delete/rental-delete.component';
import { RentalListComponent } from './rentals/rental-list/rental-list.component';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { RentalComponent } from './rental/rental.component';
import { UserListComponent } from './user/user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RentalUpdateComponent,
    RentalCreateComponent,
    RentalDeleteComponent,
    RentalListComponent,
    SidenavComponent,
    HeaderComponent
    RentalComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatSidenavModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
