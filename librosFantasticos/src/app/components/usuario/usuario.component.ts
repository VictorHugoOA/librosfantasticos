import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuariosService } from '../Services/usuarios/usuarios.service';
import { prestamo } from '../Services/prestamos/prestamos.service';
import { LibrosService, libro } from '../services/libros.service';
import { AccesibilidadService } from '../Services/accesibilidad.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  @Input() userData: any;
  prestamos: prestamo[] = null;
  today:Date = new Date();
  libros:libro[] = null;
  cargo: number;

  allowed: boolean = false;

//prestamos: prestamo[];
  constructor(private users: UsuariosService, private libroSer: LibrosService, private access: AccesibilidadService) {
   }

  ngOnInit(): void {
    this.users.getUserPrestamos(this.userData.uid).snapshotChanges().pipe(take(1)).subscribe( async (el) =>
    {
      this.userData.cargos = 0;
      this.prestamos = [];
      this.libros = [];
      await el.forEach((obj) =>
      {
        var x = new prestamo();
        x.fechaInicio = new Date(obj.payload.doc.data()['fecha'].toDate());
        x.fechaEntrega = new Date();
        x.fechaEntrega.setTime(x.fechaInicio.getTime() + (1000*60*60*24)*3);
        if(this.today > x.fechaEntrega)
        {
          this.userData.cargos += 10.0;
        }
        x.renovable = obj.payload.doc.data()['renovable'];
        console.log( this.today <= x.fechaEntrega);
        x.$key = obj.payload.doc.id;

        x.modalidad = obj.payload.doc.data()['prestamo'];
        x.libro = obj.payload.doc.data()['libro'];


        this.prestamos.push(x);
        this.libroSer.getLibroUid(x.libro).snapshotChanges().subscribe((mm) =>
        {
          let y = new libro();
          y.$key = mm.payload.id;
          y.nombre = mm.payload.data()['nombre'];
          y.autor = mm.payload.data()['autor'];
          y.sinopsis = mm.payload.data()['sinopsis'];
          y.img = mm.payload.data()['img'];
          this.libros.push(y);
        })
      })

      this.users.getUserAccount(this.userData.uid).update({cargos: this.userData.cargos});

      console.log(this.prestamos);
      console.log(this.libros)
      this.allowed = true;
    })
  }

  speech(msg: string) {
    this.access.getSpeech(msg);
  }

  renovar(prestamo: any)
  {
    let n = new Date(prestamo.fechaInicio);
    n.setTime(n.getTime() + (1000*60*60*24)*3);
    this.users.getUserPrestamos(this.userData.uid).doc(prestamo.$key).update({fecha: n, renovable: false});
  }

}
