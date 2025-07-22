import { PensamentoService } from '../pensamento-service';
import { IPensamento } from './../pensamento';
import { Component, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pensamento',
  standalone: false,
  templateUrl: './pensamento.html',
  styleUrl: './pensamento.css'
})

export class Pensamento {

  constructor(private cdr : ChangeDetectorRef){}

  @Input() pensamento!: IPensamento;
  @Output() atualizacaoFavorito = new EventEmitter();

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
    this.atualizacaoFavorito.emit(this.pensamento);
    this.cdr.detectChanges();
  }
}
