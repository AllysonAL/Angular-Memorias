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

  ngOnInit(): void {
    this.service.listar().subscribe((pensamentos) => {
      this.listaPensamentos = pensamentos;
      this.cdRef.detectChanges();
    });
  }
}
