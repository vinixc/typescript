import {NegociacoesView, MensagemView} from '../views/index';
import {Negociacoes, Negociacao, NegociacaoParcial} from '../models/index';
import {domInject,throttle} from '../helpers/decorators/index';
import {NegociacaoService} from '../services/index';
import { data } from 'jquery';
import { imprime } from '../helpers/index';

export class NegociacaoController{

    @domInject('#data')
    private _inputData : JQuery;
    @domInject('#quantidade')
    private _inputQuantidade : JQuery;
    @domInject('#valor')
    private _inputValor : JQuery;

    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacaoView');
    private _mensagemView = new MensagemView('#mensagemView');

    private _service = new NegociacaoService();

    constructor(){
        this._negociacoesView.update(this._negociacoes);
    }

    @throttle()
    adiciona(){
        
        let data = new Date(this._inputData.val().replace(/-/g,','));

        if(!this._ehDiaUtil(data)){

            this._mensagemView.update('Somente negociações em dias uteis.');
            return;
        }

        const negociacao = new Negociacao(
            new Date(this._inputData.val().replace(/-/g,',')),
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );

        this._negociacoes.adiciona(negociacao);
        imprime(negociacao, this._negociacoes);

        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociação adicionada com sucesso!');
       
    }

    private _ehDiaUtil(data: Date){
        return data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo;
    }

    @throttle()
    importaDados(){

        function isOk(res : Response){
            if(res.ok){
                return res;
            }else{
                throw new Error(res.statusText);
            }
        }

        this._service.obterNegociacoes(isOk)
            .then(negociacoesParaImportar => {

                const negociacoesJaImportadas = this._negociacoes.paraArray();

                negociacoesParaImportar
                    .filter(negociacao => 
                        !negociacoesJaImportadas.some(jaImportada =>
                                negociacao.ehIgual(jaImportada)))
                    
                    .forEach(negociacao => 
                        this._negociacoes.adiciona(negociacao));
                
                this._negociacoesView.update(this._negociacoes);
                
            });
        
    }
}

enum DiaDaSemana{

    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}