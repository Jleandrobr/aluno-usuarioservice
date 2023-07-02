import { Component } from '@angular/core';
import {Usuario} from '../../shared/modelo/usuario';
import {USUARIOS} from '../../shared/modelo/USUARIOS';
import {ActivatedRoute, Router} from '@angular/router';
import {UsuarioService} from "../../shared/services/usuario.service";

@Component({
  selector: 'app-mantem-usuario',
  templateUrl: './mantem-usuario.component.html',
  styleUrls: ['./mantem-usuario.component.css']
})
export class MantemUsuarioComponent {

  usuarioDeManutencao: Usuario;
  estahCadastrando = true;
  nomeBotaoManutencao = 'Cadastrar';

  // usuarios = USUARIOS;
  usuarios: Usuario[] = [];
  constructor(private rotaAtual: ActivatedRoute, private roteador: Router, private usuarioService: UsuarioService) {
    this.usuarioDeManutencao = new Usuario('', 0);
    const idParaEdicao = this.rotaAtual.snapshot.paramMap.get('id');
    if (idParaEdicao) {
      // editando
      this.usuarioService.pesquisarPorId(idParaEdicao).subscribe(
        usuarioEncontrado => {
          this.usuarioDeManutencao = usuarioEncontrado
          this.estahCadastrando = false;
          this.nomeBotaoManutencao = 'Salvar'
        }
      );
    } else {
      this.nomeBotaoManutencao = 'Cadastrar';
    }
  }

  manter(): void {
    if (this.estahCadastrando && this.usuarioDeManutencao) {
      this.usuarioService.inserir(this.usuarioDeManutencao).subscribe(
        usuarioInserido => console.log(usuarioInserido)
      );
    }
    else{
      this.usuarioService.atualizar(this.usuarioDeManutencao).subscribe(
        usuarioAtualizado => console.log(usuarioAtualizado)
      )
}
    this.usuarioDeManutencao = new Usuario();
    this.nomeBotaoManutencao = 'Cadastrar';
    this.roteador.navigate(['listagemusuarios']);
  }

}
