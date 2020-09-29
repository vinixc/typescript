import {Imprimivel} from './Imprimivel';
import {Negociacao} from './Negociacao';
import {Igualavel} from './Igualavel';

export class Negociacoes implements Imprimivel, Igualavel<Negociacoes>{
    
    private _negociacoes : Negociacao[] = [];

    adiciona(negociacao:Negociacao){
        this._negociacoes.push(negociacao);
    }

    paraArray(): Negociacao[]{
        return ([] as Negociacao[]).concat(this._negociacoes);
    }

    paraTexto(){
        console.log(JSON.stringify(this._negociacoes));
    }

    ehIgual(negociacoes : Negociacoes): boolean{
        return JSON.stringify(this._negociacoes) == JSON.stringify(negociacoes);
    }

}