import { CommonModule } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Busqueda } from 'src/app/core/interfaces/busqueda';
import { Productos } from 'src/app/core/interfaces/productos';
import { HeaderService } from 'src/app/core/services/header.service';
import { ProductosService } from 'src/app/core/services/productos.service';
import { TarjetaProductoComponent } from "../../core/components/tarjeta-producto/tarjeta-producto.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss'],
  imports: [CommonModule, FormsModule, TarjetaProductoComponent, RouterModule],
  standalone: true,
})
export class BuscarComponent {
  headerService = inject (HeaderService);
  productosService = inject(ProductosService);

  productos: WritableSignal<Productos[]> = signal([]);

  ngOnInit(): void {
      this.headerService.titulo.set("Buscar");
      this.productosService.getAll().then(res => this.productos.set(res));
  }

  parametrosBusqueda: Busqueda = {
    texto: "",
    aptoCeliaco: false,
    aptoVegano: false
  }

  async buscar () {
    this.productos.set(await this.productosService.buscar(this.parametrosBusqueda));
  }
}
