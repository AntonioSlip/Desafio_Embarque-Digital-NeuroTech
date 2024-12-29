const formulario = document.querySelector("form")
const inputNome = document.querySelector(".nome")
const inputEmail = document.querySelector(".email")
const inputContato = document.querySelector(".contato")
const inputCompetenciasTecnicas = document.querySelector(".competenciasTecnicas")
const inputCertificacoes = document.querySelector(".certificacoes")
const inputTempoExperiencia = document.querySelector(".tempoExperiencia")
const inputUrlLinkedin = document.querySelector(".urlLinkedin")

function cadastrar() {

    fetch("http://localhost:8080/funcionarios/adicionar",
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            nome: inputNome.value,
            email: inputEmail.value,
            contato: inputContato.value,
            competenciasTecnicas: inputCompetenciasTecnicas.value,
            certificacoes: inputCertificacoes.value,
            tempoExperiencia: inputTempoExperiencia.value,
            urlLinkedin: inputUrlLinkedin.value
        })
    }).then(response => {

        alert("Cadastro Realizado com Sucesso!!")
        console.log(response.json())

    }).catch(error => {

        console.error('Houve um problema com a requisição Fetch:', error)

    })

}

function limpar() {

    inputNome.value = ""
    inputEmail.value = ""
    inputContato.value = ""
    inputCompetenciasTecnicas.value = ""
    inputCertificacoes.value = ""
    inputTempoExperiencia.value = ""
    inputUrlLinkedin.value = ""

}

formulario.addEventListener('submit', function(event) {
    
    event.preventDefault()

    cadastrar()

    limpar()

})
