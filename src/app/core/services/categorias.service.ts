import { Injectable } from '@angular/core';
import { Categorias } from '../interfaces/categorias';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor() { }

  async getAll (): Promise <Categorias[]> {
    const res = await fetch("../../../assets/data/database.json");
    const resJson = await res.json();
    return resJson;
  }

  async getById (id:number):Promise <Categorias| undefined> {
    const res = await fetch ("../../../assets/data/database.json");
    const resJson: Categorias[] = await res.json();
    const categoria = resJson.find(categoria => categoria.id === id);
    if (categoria) return categoria;
    return;
  }
}
