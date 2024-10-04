import { CommonModule } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TarjetaProductoComponent } from 'src/app/core/components/tarjeta-producto/tarjeta-producto.component';
import { Productos } from 'src/app/core/interfaces/productos';
import { CategoriasService } from 'src/app/core/services/categorias.service';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-rubro',
  templateUrl: './rubro.component.html',
  styleUrls: ['./rubro.component.scss'],
  standalone: true,
  imports: [TarjetaProductoComponent,CommonModule, RouterLink],
})
export class RubroComponent {
  headerService = inject (HeaderService);
  categoriasServices = inject(CategoriasService);
  ac = inject (ActivatedRoute);
  productosArray:WritableSignal<Productos[]> = signal([]);

  ngOnInit(): void {
      this.ac.params.subscribe(params => {
        if (params['id']){
          this.categoriasServices.getById(parseInt(params['id']))
          .then( categoria => {
            if(categoria){
            this.productosArray.set(categoria.productos);
            this.headerService.titulo.set(categoria.nombre);
            }
          })
        }
      });
  }
}
