import { Productos } from "./productos";

export interface Categorias {
    id: number,
    nombre: string,
    fotoUrl: string,
    productos: Productos[];
}