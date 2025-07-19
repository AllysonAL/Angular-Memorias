import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PensamentoService } from '../pensamento-service';
import { IPensamento } from '../pensamento';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-criar-pensamento',
  standalone: false,
  templateUrl: './criar-pensamento.html',
  styleUrl: './criar-pensamento.css'
})

export class CriarPensamento implements OnInit{

  formulario! : FormGroup;

  constructor(private service : PensamentoService, private router : Router, private formBuilder : FormBuilder, private cdr : ChangeDetectorRef){
  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      conteudo: ['', Validators.compose([Validators.required, Validators.pattern(/(.|\s)*\S(.|\s)*/)])],
      autoria: ['',  Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern(/^[^A-Z]*$/)])],
      modelo: ['',  [Validators.required]]
    });
  }

  criarPensamento(){
    if (this.formulario.status){
        this.service.cadastrar(this.formulario.value).subscribe(() => {
        this.router.navigate(['/listarPensamento']);
      });
    }
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
