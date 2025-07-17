import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IPensamento } from '../pensamento';
import { PensamentoService } from '../pensamento-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-pensamento',
  standalone: false,
  templateUrl: './editar-pensamento.html',
  styleUrl: './editar-pensamento.css'
})

export class EditarPensamento implements OnInit{
  pensamento! : IPensamento;

  constructor(private service : PensamentoService, private router : Router, private route : ActivatedRoute, private cdr : ChangeDetectorRef){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if(id){
      this.service.buscarPorId(id).subscribe((pensamento) =>{
          this.pensamento = pensamento;
          this.cdr.detectChanges();
      })
    }
  }

  editarPensamento(){
    this.service.editar(this.pensamento).subscribe(() =>{
      this.router.navigate(['/listarPensamento']);
    })
  }

  cancelar(){
    this.router.navigate(['/listarPensamento']);
  }
}
