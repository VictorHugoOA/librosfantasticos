import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PreguntasComponent } from './components/preguntas/preguntas.component';
import { HomeComponent } from './components/home/home.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { AboutComponent } from './components/about/about.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LibrosService } from './components/services/libros.service'
import { FlexLayoutModule } from '@angular/flex-layout';
import { A11yModule } from '@angular/cdk/a11y';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { BibliotecaComponent } from './components/biblioteca/biblioteca.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { environment } from 'src/environments/environment';

//Servicios de Firebase y conexion
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import {AngularFireAnalyticsModule} from '@angular/fire/analytics';

import { AdminComponent } from './components/admin/admin.component';
import { AngularFireStorageModule } from '@angular/fire/storage';

//QR Y GRAFICAS
import { QRCodeModule } from 'angularx-qrcode';
import { FichaLibroComponent } from './components/ficha-libro/ficha-libro.component';
import { GraficaComponent } from './components/grafica/grafica.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { SearchComponent } from './components/search/search.component';
import { LibroInfoComponent } from './components/libro-info/libro-info.component';
import { QrComponent } from './components/qr/qr.component';

//Servicio de autenticacion
import { AuthService } from './components/Services/auth/auth.service';
import { RegisterComponent } from './components/register/register.component';

//Toastr para las notificaciones.
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './components/login/login.component';
import { AccesibilidadService } from './components/Services/accesibilidad.service';

//Realizar peticiones
import { HttpClientModule } from '@angular/common/http';
import { PrestamosService } from './components/Services/prestamos/prestamos.service';
import { CuentaComponent } from './components/cuenta/cuenta.component';
import { UsuariosService } from './components/Services/usuarios/usuarios.service';


import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { RegistrocelComponent } from './components/registrocel/registrocel.component';
import { LoadingComponent } from './components/loading/loading.component';


@NgModule({
  declarations: [
    AppComponent,
    PreguntasComponent,
    HomeComponent,
    ContactoComponent,
    AboutComponent,
    NavbarComponent,
    BibliotecaComponent,
    FooterComponent,
    AdminComponent,
    FichaLibroComponent,
    GraficaComponent,
    UsuarioComponent,
    RegisterComponent,
    LoginComponent,
    SearchComponent,
    LibroInfoComponent,
    QrComponent,
    CuentaComponent,
    UsuariosComponent,
    RegistrocelComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    FlexLayoutModule,
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
    QRCodeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    AngularFireStorageModule,
    AngularFireAnalyticsModule
  ],
  providers: [LibrosService, AuthService, AccesibilidadService, PrestamosService, UsuariosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
