import { PensamentoService } from '../pensamento-service';
import { IPensamento } from './../pensamento';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pensamento',
  standalone: false,
  templateUrl: './pensamento.html',
  styleUrl: './pensamento.css'
})

export class Pensamento {

  constructor(private service : PensamentoService){}

  @Input() pensamento!: IPensamento;

 larguraPensamento(): string {
    if(this.pensamento.conteudo.length >= 256) {
      return 'pensamento-g'
    }
    return 'pensamento-p'
  }

  obterFavoritoAtividade(){
    if (this.pensamento.favorito){
      return 'ativo'
    }
    return 'inativo'
  }

  atualizarFavorito(){
    this.service.mudarFavorito(this.pensamento).subscribe();
  }
}
