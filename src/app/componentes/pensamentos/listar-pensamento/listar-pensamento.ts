import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { IPensamento } from '../pensamento';
import { PensamentoService } from '../pensamento-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-pensamento',
  standalone: false,
  templateUrl: './listar-pensamento.html',
  styleUrl: './listar-pensamento.css'
})

export class ListarPensamento implements OnInit{

  constructor(private service : PensamentoService, private cdRef: ChangeDetectorRef, private router : Router){}

  listaPensamentos : IPensamento[] = [];
  paginaAtual : number = 1;
  haMaisPensamentos : boolean = true;
  filtro: string = '';
  favorito: boolean = false;
  listaFavoritos: IPensamento[] = [];
  titulo : string = 'Meu mural';
;
  ngOnInit(): void {
    this.carregarPensamentos();
  }

  carregarPensamentos(){
    this.service.listar(this.paginaAtual, this.filtro, this.favorito).subscribe((pensamentos) => {
      this.listaPensamentos = pensamentos;
      this.cdRef.detectChanges();
    });
  }

  carregarMaisPensamentos(){
    this.service.listar(++this.paginaAtual, this.filtro, this.favorito).subscribe((pensamentos) => {
      if (pensamentos.length){
        this.listaPensamentos.push(...pensamentos);
      }
      else{
        this.haMaisPensamentos = false;
      }
      this.cdRef.detectChanges();
    });
  }

  pesquisarPensamentos(){
    this.paginaAtual = 1;
    this.haMaisPensamentos = true;

    this.service.listar(this.paginaAtual, this.filtro, this.favorito).subscribe((pensamentos) => {
      this.listaPensamentos = pensamentos;
      this.cdRef.detectChanges();
    });
  }

  carregarMeusFavoritos(){
    this.titulo = "Meus favoritos";
    this.paginaAtual = 1;
    this.haMaisPensamentos = true;
    this.favorito = true;

    this.service.listar(this.paginaAtual, this.filtro, this.favorito).subscribe((pensamentos) =>{
      this.listaPensamentos = pensamentos;
      this.listaFavoritos = pensamentos;
      this.cdRef.detectChanges();
    });
  }

  atualizarFavorito(pensamento: IPensamento): void {
    this.service.mudarFavorito(pensamento).subscribe(() =>{
      if (this.favorito && !pensamento.favorito) {
        this.listaFavoritos.splice(this.listaFavoritos.indexOf(pensamento), 1);
        this.cdRef.detectChanges();
      }
    })
  }

  recarregarComponente(){
    this.titulo = "Meu mural";
    this.favorito = false;
    this.carregarPensamentos();
  }
}
