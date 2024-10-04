import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TarjetaCategoriaComponent } from 'src/app/core/components/tarjeta-categoria/tarjeta-categoria.component';
import { Categorias } from 'src/app/core/interfaces/categorias';
import { CategoriasService } from 'src/app/core/services/categorias.service';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [TarjetaCategoriaComponent, CommonModule, RouterModule],
})
export class HomeComponent implements OnInit, OnDestroy{
  headerService = inject (HeaderService);
  categoriasService = inject (CategoriasService);
  categorias:WritableSignal <Categorias[]> = signal([]);

  ngOnInit(): void {
    this.headerService.titulo.set("Inicio");
    this.headerService.extendido.set(true);
    this.categoriasService.getAll().then(res => this.categorias.set(res));
  }

  ngOnDestroy(): void {
    this.headerService.extendido.set(false);
  }
}
