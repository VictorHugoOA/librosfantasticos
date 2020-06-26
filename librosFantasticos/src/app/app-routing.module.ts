import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { AboutComponent } from './components/about/about.component';
import { PreguntasComponent } from './components/preguntas/preguntas.component';
import { BibliotecaComponent } from './components/biblioteca/biblioteca.component';
import { RegisterComponent } from './components/register/register.component';



const routes: Routes = [ 
  {path: "Home",component:HomeComponent},
  {path: "Biblioteca", component:BibliotecaComponent},
  {path: "Contacto", component:ContactoComponent},
  {path: "About", component:AboutComponent},
  {path: "Preguntas", component:PreguntasComponent},
  {path: 'register', component:RegisterComponent},
  {path: "**", pathMatch:'full', redirectTo:"Home"},
  ];
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
