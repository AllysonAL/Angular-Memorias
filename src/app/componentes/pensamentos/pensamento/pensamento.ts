import { IPensamento } from './../pensamento';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pensamento',
  standalone: false,
  templateUrl: './pensamento.html',
  styleUrl: './pensamento.css'
})
export class Pensamento {

 @Input() pensamento : IPensamento = {
        id: 0,
        conteudo: '...',
        autoria: '...',
        modelo: 'modelo3'
    }

 larguraPensamento(): string {
    if(this.pensamento.conteudo.length >= 256) {
      return 'pensamento-g'
    }
    return 'pensamento-p'
  }
}
