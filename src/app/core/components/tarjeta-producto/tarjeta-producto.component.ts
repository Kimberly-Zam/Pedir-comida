import { CommonModule } from '@angular/common';
import { Component, Input, isStandalone } from '@angular/core';
import { Productos } from '../../interfaces/productos';

@Component({
  selector: 'app-tarjeta-producto',
  templateUrl: './tarjeta-producto.component.html',
  styleUrls: ['./tarjeta-producto.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class TarjetaProductoComponent {
  @Input ({required:true}) productoInput!:Productos;
}
