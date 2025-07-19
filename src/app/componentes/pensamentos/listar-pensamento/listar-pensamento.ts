import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { IPensamento } from '../pensamento';
import { PensamentoService } from '../pensamento-service';

@Component({
  selector: 'app-listar-pensamento',
  standalone: false,
  templateUrl: './listar-pensamento.html',
  styleUrl: './listar-pensamento.css'
})

export class ListarPensamento implements OnInit{

  constructor(private service : PensamentoService, private cdRef: ChangeDetectorRef){}

  listaPensamentos : IPensamento[] = [];
  paginaAtual : number = 1;
  haMaisPensamentos : boolean = true;

  ngOnInit(): void {
    this.service.listar(this.paginaAtual).subscribe((pensamentos) => {
      this.listaPensamentos = pensamentos;
      this.cdRef.detectChanges();
    });
  }

  carregarMaisPensamentos(){
    this.service.listar(++this.paginaAtual).subscribe((pensamentos) => {
      if (pensamentos.length){
        this.listaPensamentos.push(...pensamentos);
      }
      else{
        this.haMaisPensamentos = false;
      }
      this.cdRef.detectChanges();
    });
  }
}
