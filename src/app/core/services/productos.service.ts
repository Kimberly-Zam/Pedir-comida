import { Injectable } from '@angular/core';
import { Productos } from '../interfaces/productos';
import { Categorias } from '../interfaces/categorias';
import { CategoriasService } from './categorias.service';
import { Busqueda } from '../interfaces/busqueda';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor() { }

  async getByCategoria (id:number):Promise <Productos[]> {
    const res = await fetch ("../../../assets/data/database.json");
    const resJson: Categorias[] = await res.json();
    const productos = resJson.find(categoria => categoria.id === id)?.productos;
    if (productos) return productos;
    return [];
  }

  async getAll ():Promise<Productos []> {
    const res = await fetch ("../../../assets/data/database.json");
    const resJson: Categorias[] = await res.json();
    let productos:Productos[] = [];
    resJson.forEach(categoria => {
      productos = [...productos, ...categoria.productos]
    })
    return productos;
  }

  async getById (id:number):Promise <Productos | undefined> {
    const productos = await this.getAll();
    const productoElegido = productos.find(producto => producto.id === id);
    return productoElegido ? productoElegido : undefined;
  }

  async buscar (parametros:Busqueda) {
    const productos = await this.getAll();
    const productosFiltrados = productos.filter(producto => {
      if(parametros.aptoCeliaco && !producto.esCeliaco ) return false;
      if(parametros.aptoVegano && !producto.esVegano ) return false;
      const busquedaTitulo = producto.nombre.toLowerCase().includes(parametros.texto);
      if (busquedaTitulo) return true;
      for (let i = 0; i < producto.ingredientes.length; i++){
        const ingrediente = producto.ingredientes [i];
        if (ingrediente.toLowerCase().includes(parametros.texto.toLowerCase())) return true;
      }
      return false;
    })
    return productosFiltrados;
  }
}