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
                limparCampos();
                return null;
            }
        })
        .then(funcionario => {
            if (funcionario) {
                const dadosHtml = `
                    <strong>ID:</strong> ${funcionario.id}<br>
                    <strong>Nome:</strong> ${funcionario.nome}<br>
                    <strong>Email:</strong> ${funcionario.email}<br>
                    <strong>Contato:</strong> ${funcionario.contato}<br>
                    <strong>Competências Técnicas:</strong> ${funcionario.competenciasTecnicas}<br>
                    <strong>Certificações:</strong> ${funcionario.certificacoes}<br>
                    <strong>Tempo de Experiência:</strong> ${funcionario.tempoExperiencia}<br>
                    <strong>URL LinkedIn:</strong> ${funcionario.urlLinkedin}<br>
                `;
                document.getElementById('dadosFuncionario').innerHTML = dadosHtml;
                document.getElementById('info').style.display = 'block';
                document.querySelector("button[onclick='deletarPorId()']").disabled = false; // Habilitar botão de deletar
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao tentar buscar o funcionário!');
            limparCampos();
        });
}

function deletarPorId() {
    const id = document.getElementById('id').value;
    if (confirm('Tem certeza que deseja deletar este funcionário?')) {
        fetch(`http://localhost:8080/funcionarios/deletar/${id}`, { method: 'DELETE' })
            .then(response => {
                if (response.status === 204) {
                    alert('Funcionário deletado com sucesso!');
                    limparCampos();
                } else {
                    alert('Ocorreu um erro ao deletar o funcionário.');
                    limparCampos();
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Erro ao tentar deletar o funcionário.');
                limparCampos();
            });
    }
    else {
        alert('Exclusão Cancelada!');
        limparCampos();
    }
}

function limparCampos() {
    document.getElementById('info').style.display = 'none';
    document.getElementById('id').value = "";
}