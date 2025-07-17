import { Component } from '@angular/core';
import { PensamentoService } from '../pensamento-service';
import { IPensamento } from '../pensamento';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-pensamento',
  standalone: false,
  templateUrl: './criar-pensamento.html',
  styleUrl: './criar-pensamento.css'
})

export class CriarPensamento {

  pensamento : IPensamento = {
    conteudo: "",
    autoria: "",
    modelo: ""
  }

  constructor(private service : PensamentoService, private router : Router){
  }

  criarPensamento(){
    this.service.cadastrar(this.pensamento).subscribe(() => {
      this.router.navigate(['/listarPensamento']);
    });
  }

  cancelar(){
    this.router.navigate(['/listarPensamento']);
  }
}
