import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuariosService } from '../Services/usuarios/usuarios.service';
import { prestamo } from '../Services/prestamos/prestamos.service';
import { LibrosService, libro } from '../services/libros.service';

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

//prestamos: prestamo[];
  constructor(private users: UsuariosService, private libroSer: LibrosService) { }

  ngOnInit(): void {
    this.users.getUserPrestamos(this.userData.uid).snapshotChanges().subscribe((el) =>
    {
      this.prestamos = [];
      this.libros = [];
      el.forEach((obj) =>
      {
        var x = new prestamo();
        x.fechaInicio = new Date(obj.payload.doc.data()['fecha'].toDate());
        x.fechaEntrega = new Date();
        x.fechaEntrega.setDate(x.fechaInicio.getDate() + 3);
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

      console.log(this.prestamos);
      console.log(this.libros)
    })
  }

}
