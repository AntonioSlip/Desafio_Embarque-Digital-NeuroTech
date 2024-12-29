function buscarFuncionario() {
    const id = document.getElementById('id').value;
    if(!id) {
        alert('Por favor, insira um ID válido!');
        return;
    }
    fetch(`http://localhost:8080/funcionarios/listar/${id}`) 
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 404) {
                alert('Funcionário não encontrado!');
                document.getElementById('info').style.display = 'none';
                document.getElementById('id').value = "";
                return null;
            }
        })
        .then(funcionario => {
            if (funcionario) {
                document.getElementById('dadosFuncionario').innerHTML = `
                    <p><strong>ID:</strong> ${funcionario.id}</p>
                    <p><strong>Nome:</strong> ${funcionario.nome}</p>
                    <p><strong>Email:</strong> ${funcionario.email}</p>
                    <p><strong>Contato:</strong> ${funcionario.contato}</p>
                    <p><strong>Competências Técnicas:</strong> ${funcionario.competenciasTecnicas}</p>
                    <p><strong>Certificações:</strong> ${funcionario.certificacoes}</p>
                    <p><strong>Tempo de Experiência:</strong> ${funcionario.tempoExperiencia}</p>
                    <p><strong>LinkedIn:</strong> ${funcionario.urlLinkedin}</p>
                `;
                document.getElementById('info').style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao tentar buscar o funcionário!');
            document.getElementById('id').value = "";
        });
}

document.querySelectorAll('.editable').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const inputField = document.getElementById(this.dataset.field);
        inputField.disabled = !this.checked;
    });
    const inputField = document.getElementById(checkbox.dataset.field);
    inputField.disabled = !checkbox.checked;
});

document.getElementById("updateForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const id = document.getElementById("id").value;
    const funcionarioData = {};
    const dadosFormulario = {
        nome : document.getElementById("nome").value,
        email : document.getElementById("email").value,
        contato : document.getElementById("contato").value,
        competenciasTecnicas : document.getElementById("competenciasTecnicas").value,
        certificacoes : document.getElementById("certificacoes").value,
        tempoExperiencia : document.getElementById("tempoExperiencia").value,
        urlLinkedin : document.getElementById("urlLinkedin").value
    };
    if(dadosFormulario.nome === "" && dadosFormulario.email === "" && dadosFormulario.contato === "" &&
        dadosFormulario.competenciasTecnicas === "" && dadosFormulario.certificacoes === "" &&
        dadosFormulario.tempoExperiencia === "" && dadosFormulario.urlLinkedin === "") {
            alert('Escolha pelo menos um campo para atualizar!');
    }
    else {
        if(confirm('Tem certeza que deseja alterar este funcionário?')) {
            fetch(`http://localhost:8080/funcionarios/listar/${id}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Erro ao buscar dados antigos');
            })
            .then(dadosAntigos => {
                document.querySelectorAll('.editable').forEach(checkbox => {
                    if (checkbox.checked) {
                        funcionarioData[checkbox.dataset.field] = document.getElementById(checkbox.dataset.field).value;
                    } else {
                        if (dadosFormulario.nome === "") {
                            funcionarioData.nome = dadosAntigos.nome;
                        }
                        if (dadosFormulario.email === "") {
                            funcionarioData.email = dadosAntigos.email;
                        }
                        if (dadosFormulario.contato === "") {
                            funcionarioData.contato = dadosAntigos.contato;
                        }
                        if (dadosFormulario.competenciasTecnicas === "") {
                            funcionarioData.competenciasTecnicas = dadosAntigos.competenciasTecnicas;
                        }
                        if (dadosFormulario.certificacoes === "") {
                            funcionarioData.certificacoes = dadosAntigos.certificacoes;
                        }
                        if (dadosFormulario.tempoExperiencia === "") {
                            funcionarioData.tempoExperiencia = dadosAntigos.tempoExperiencia;
                        }
                        if (dadosFormulario.urlLinkedin === "") {
                            funcionarioData.urlLinkedin = dadosAntigos.urlLinkedin;
                        }
                    }
                });
                return fetch(`http://localhost:8080/funcionarios/atualizar/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(funcionarioData)
                });
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Erro na atualização!');
                }
            })
            .then(data => {
                alert('Funcionário atualizado com sucesso!');
                console.log(data);
                limparCampos();
            })
            .catch(error => {
                alert(error.message);
            });
        }
        else {
            alert('Alteração Cancelada!');
            limparCampos();
        }
    }
});

function limparCampos() {
    document.getElementById('info').style.display = 'none';
    document.getElementById('nome').value = "";
    document.getElementById('email').value = "";
    document.getElementById('contato').value = "";
    document.getElementById('competenciasTecnicas').value = "";
    document.getElementById('certificacoes').value = "";
    document.getElementById('tempoExperiencia').value = "";
    document.getElementById('urlLinkedin').value = "";
    document.getElementById('id').value = "";
}