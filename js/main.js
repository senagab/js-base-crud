


var response = undefined
var httpClient = new XMLHttpRequest();
httpClient.onreadystatechange = function(request){
	if(httpClient.readyState == 4 && httpClient.status == 200) {
		console.log("Mudou!", httpClient.response);
		response = JSON.parse(httpClient.response);
	}
	
};

httpClient.open("GET", "https://api-pacientes.herokuapp.com/pacientes")
httpClient.send();

function bindLinha(linhaPaciente) {
	linhaPaciente.addEventListener('dblclick', function(evento) {
		console.log("Clicou!!!", evento)
		linhaPaciente.remove();
	})
}

// Primeiro 
var inputNome = document.querySelector("#nome");
var inputPeso = document.querySelector("#peso");
var inputAltura = document.querySelector("#altura");
var inputGordura = document.querySelector("#gordura");
var tabelaPacientes = document.querySelector("#tabela-pacientes");

// Segundo
var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener('click', function(evento) {
	evento.preventDefault();
	var linhaTabela = tabelaPacientes.insertRow();
	var colunaNome = linhaTabela.insertCell();
	var colunaPeso = linhaTabela.insertCell();
	var colunaAltura = linhaTabela.insertCell();
	var colunaGordura = linhaTabela.insertCell();
	var colunaIMC = linhaTabela.insertCell();

	colunaNome.textContent = inputNome.value;
	colunaPeso.textContent = inputPeso.value;
	colunaAltura.textContent = inputAltura.value;
	colunaGordura.textContent = inputGordura.value;

	//Calculo do IMC
	var imc = inputPeso.value / (inputAltura.value * inputAltura.value);
	colunaIMC.textContent = imc;	

	bindLinha(linhaTabela);
});

var linhasPaciente = document.querySelectorAll(".paciente");
linhasPaciente.forEach( function(linhaPaciente) {
	bindLinha(linhaPaciente);
});

var inputFiltro = document.querySelector("#filtro");
inputFiltro.addEventListener('keyup', function(evento) {
	console.log("Mudou!!!", evento);
	console.log("Valor filtro: ", inputFiltro.value);
	for(var i = 0; i < tabelaPacientes.rows.length; i ++) {
		let q = inputFiltro.value.toLowerCase();
		if(tabelaPacientes.
				rows[i].cells[0].
				textContent.toLowerCase().
				match(q)) {
			tabelaPacientes.rows[i].classList.remove('oculto');
		} else {
			tabelaPacientes.rows[i].classList.add('oculto');	
		}
	}
});

