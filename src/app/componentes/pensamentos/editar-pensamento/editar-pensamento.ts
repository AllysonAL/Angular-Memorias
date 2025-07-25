import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IPensamento } from '../pensamento';
import { PensamentoService } from '../pensamento-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-pensamento',
  standalone: false,
  templateUrl: './editar-pensamento.html',
  styleUrl: './editar-pensamento.css'
})

export class EditarPensamento implements OnInit{
  formulario! : FormGroup;

  constructor(private service : PensamentoService, private router : Router, private route : ActivatedRoute, private cdr : ChangeDetectorRef, private formBuilder : FormBuilder){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if(id){
      this.service.buscarPorId(id).subscribe((pensamento) =>{
        this.formulario = this.formBuilder.group({
        id: [id],
        conteudo: [pensamento.conteudo, Validators.compose([Validators.required, Validators.pattern(/(.|\s)*\S(.|\s)*/)])],
        autoria: [pensamento.autoria,  Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern(/^[^A-Z]*$/)])],
        modelo: [pensamento.modelo,  [Validators.required]],
        favorito : [false]
      });
        this.cdr.detectChanges();
      })
    }
  }

  editarPensamento(){
    this.service.editar(this.formulario.value).subscribe(() =>{
      this.router.navigate(['/listarPensamento']);
    })
  }

  cancelar(){
    this.router.navigate(['/listarPensamento']);
  }

  habilitarBotao() : string {
    if (this.formulario.valid){
      return 'botao';
    }
    else{
      return 'botao__desabilitado';
    }
  }
}
