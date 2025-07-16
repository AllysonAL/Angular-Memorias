import { Component } from '@angular/core';
import { IPensamento } from '../pensamento';

@Component({
  selector: 'app-listar-pensamento',
  standalone: false,
  templateUrl: './listar-pensamento.html',
  styleUrl: './listar-pensamento.css'
})
export class ListarPensamento {
  listaPensamentos : IPensamento[] = [];
}
