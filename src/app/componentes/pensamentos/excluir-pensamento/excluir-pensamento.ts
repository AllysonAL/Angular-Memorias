import { Component } from '@angular/core';
import { PensamentoService } from '../pensamento-service';
import { IPensamento } from '../pensamento';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-excluir-pensamento',
  standalone: false,
  templateUrl: './excluir-pensamento.html',
  styleUrl: './excluir-pensamento.css'
})
export class ExcluirPensamento{

  pensamento! : IPensamento;

  constructor(private service : PensamentoService, private router : Router, private route : ActivatedRoute){}

  excluirPensamento(){
    const id = this.route.snapshot.paramMap.get('id');

    if (id)
    this.service.excluir(id).subscribe(() => {
      this.router.navigate(['/listarPensamento']);
    })
  }

  cancelar(){
    this.router.navigate(['/listarPensamento']);
  }
}
