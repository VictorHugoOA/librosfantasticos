import { Component, OnInit, Input } from '@angular/core';
import { UsuariosService } from '../Services/usuarios/usuarios.service';
import { prestamo } from '../Services/prestamos/prestamos.service';
import { LibrosService, libro } from '../services/libros.service';
import { AccesibilidadService } from '../Services/accesibilidad.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  @Input() userData: any;

  libros:any[] = null;
  prestamos:any[] = null;
  allowed: boolean = false;
  today:Date = new Date();

  constructor(private users: UsuariosService, private libroSer: LibrosService, private access: AccesibilidadService) { }

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

      console.log(this.prestamos);
      console.log(this.libros)
      this.allowed = true;
    })
  }

}
