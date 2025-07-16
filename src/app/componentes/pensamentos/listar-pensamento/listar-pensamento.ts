import { Component } from '@angular/core';

@Component({
  selector: 'app-listar-pensamento',
  standalone: false,
  templateUrl: './listar-pensamento.html',
  styleUrl: './listar-pensamento.css'
})
export class ListarPensamento {
  listaPensamentos = [
    {  conteudo: 'conteudo 1',
        autoria: 'autoria 1',
        modelo: 'modelo1'
    },
    {  conteudo: 'conteudo 2',
        autoria: 'autoria 2',
        modelo: 'modelo2'
    },
    {  conteudo: 'conteudo 3',
        autoria: 'autoria 3',
        modelo: 'modelo3'
    }
  ];
}
