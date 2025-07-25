import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPensamento } from './pensamento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PensamentoService {

  private readonly API = 'http://localhost:3000/pensamentos';

  constructor(private http : HttpClient) { }

  listar(pagina : number, filtro : string, favorito : boolean) : Observable<IPensamento[]> {
    const itensPorPagina = 6;

    let params = new HttpParams()
      .set("_page", pagina)
      .set("_limit", itensPorPagina);

      if (filtro.trim().length > 2){
        params = params.set("autoria", filtro);
      }

      if (favorito){
        params = params.set("favorito", favorito);
      }

      return this.http.get<IPensamento[]>(this.API, {params});
  }

  cadastrar(pensamento : IPensamento) : Observable<IPensamento> {
    return this.http.post<IPensamento>(this.API, pensamento);
  }

  editar(pensamento : IPensamento) : Observable<IPensamento> {
    const url = `${this.API}/${pensamento.id}`;
    return this.http.put<IPensamento>(url, pensamento);
  }

  mudarFavorito(pensamento : IPensamento) : Observable<IPensamento> {
    pensamento.favorito = !pensamento.favorito;
    return this.editar(pensamento);
  }

  buscarPorId(id : string) : Observable<IPensamento>{
    const url = `${this.API}/${id}`;
    return this.http.get<IPensamento>(url);
  }

  excluir(id : string) : Observable<IPensamento> {
    const url = `${this.API}/${id}`;
    return this.http.delete<IPensamento>(url);
  }
}
