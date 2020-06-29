import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { AboutComponent } from './components/about/about.component';
import { PreguntasComponent } from './components/preguntas/preguntas.component';
import { BibliotecaComponent } from './components/biblioteca/biblioteca.component';
import { AdminComponent } from './components/admin/admin.component';
import { LibroInfoComponent } from './components/libro-info/libro-info.component';
import { SearchComponent } from './components/search/search.component';



const routes: Routes = [ 
  {path: "Home",component:HomeComponent},
  {path: "Biblioteca", component:BibliotecaComponent},
  {path: "Contacto", component:ContactoComponent},
  {path: "About", component:AboutComponent},
  {path: "Preguntas", component:PreguntasComponent},
  {path: "Admin", component:AdminComponent},
  {path: "Libro/:key", component:LibroInfoComponent},
  {path: "Buscar/:b", component:SearchComponent},
  {path: "**", pathMatch:'full', redirectTo:"Home"}
  ];
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
