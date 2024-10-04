import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, signal, ViewChild, WritableSignal} from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { ContadorCantidadComponent } from "../../core/components/contador-cantidad/contador-cantidad.component";
import { ProductosService } from 'src/app/core/services/productos.service';
import { Productos } from 'src/app/core/interfaces/productos';
import { Router, RouterLink } from '@angular/router';
import { PerfilService } from 'src/app/core/services/perfil.service';
import { numeroWhatsapp } from 'src/app/core/constantes/telefono.whatsapp';
import { ConfigService } from 'src/app/core/services/config.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
  imports: [CommonModule, ContadorCantidadComponent, RouterLink],
  standalone: true,
})
export class CarritoComponent {
  headerService = inject (HeaderService);
  cartService = inject (CartService);
  productoService = inject (ProductosService);
  perfilService = inject(PerfilService);
  configService = inject (ConfigService);
  router = inject(Router);

  productosCarrito: WritableSignal<Productos[]> = signal([]);

  subtotal = 0;
  total = 0;

  @ViewChild("dialog") dialog!: ElementRef<HTMLDialogElement>;
  @ViewChild("dialog2") dialog2!: ElementRef<HTMLDialogElement>;

  ngOnInit(): void {
    this.headerService.titulo.set("Carrito");
    this.buscarInformacionProductos().then(() => {
      this.calcularInformacion();
    });
  }

  async buscarInformacionProductos () {
    for (let i = 0; i < this.cartService.carrito.length; i++) {
      const itemCarrito = this.cartService.carrito [i];
      const res = await this.productoService.getById(itemCarrito.idProducto);
      if (res) this.productosCarrito.set([...this.productosCarrito(),res]);
    }
  }
  eliminarProducto(idProducto:number) {
    this.cartService.eliminarProducto (idProducto);
    this.calcularInformacion();
  }

  calcularInformacion() {
    this.subtotal = 0;
    for( let i = 0; i < this.cartService.carrito.length; i++){
      this.subtotal += this.productosCarrito()[i].precio * this.cartService.carrito[i].cantidad;
    }
    this.total = this.subtotal + this.configService.configuracion().costoEnvio;
  }

  cambiarCantidadProducto(id:number, cantidad:number) {
    this.cartService.cambiaCantidadProducto(id, cantidad);
    this.calcularInformacion();
  }

  async enviarMensaje() {
    let pedido = "";
    for (let i = 0; i < this.cartService.carrito.length; i++){
      const producto = await this.productoService.getById(this.cartService.carrito[i].idProducto);
      pedido += `* ${this.cartService.carrito[i].cantidad} x ${producto?.nombre}
`
    }

    const mensaje = `Hola! Soy ${this.perfilService.perfil()?.nombre}, y te quiero hacer el siguiente pedido:
${pedido}
Si te quieres comunicar conmigo hazlo al N° del que te hablo o al ${this.perfilService.perfil()?.telefono}
La dirección de envio es: ${this.perfilService.perfil()?.direccion} - ${this.perfilService.perfil()?.detalleEntrega}
Muchas gracias.
`;

    const link = `https://wa.me/${numeroWhatsapp}?text=${encodeURI(mensaje)}`;
    window.open(link, '_blank');
    this.dialog.nativeElement.showModal();
  }

  finalizarPedido() {
    this.cartService.vaciar();
    this.dialog.nativeElement.close();
    this.router.navigate  (['/']);
  }

  editarPedido() {
    this.dialog.nativeElement.close();
  }

}
