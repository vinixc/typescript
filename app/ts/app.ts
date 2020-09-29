import {NegociacaoController } from './controllers/NegociacaoController'

const controller = new NegociacaoController();

//usando jQuery
$('.form').submit(controller.adiciona.bind(controller));

$('#botao-importar').click(controller.importaDados.bind(controller));