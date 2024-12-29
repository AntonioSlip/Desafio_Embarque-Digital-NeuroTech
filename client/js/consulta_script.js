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
                const listaFuncionarios = document.getElementById('dadosFuncionario');
                listaFuncionarios.innerHTML = '';
                let listaHTML = '<ul class="lista-funcionarios">';
                listaHTML += `
                    <li>
                        <h3>${funcionario.nome}</h3>
                        <p><strong>ID:</strong> ${funcionario.id}</p>
                        <p><strong>Email:</strong> ${funcionario.email}</p>
                        <p><strong>Contato:</strong> ${funcionario.contato}</p>
                        <p><strong>Competências Técnicas:</strong> ${funcionario.competenciasTecnicas}</p>
                        <p><strong>Certificações:</strong> ${funcionario.certificacoes}</p>
                        <p><strong>Tempo de Experiência:</strong> ${funcionario.tempoExperiencia}</p>
                        <p><strong>URL Linkedin:</strong> <a href="${funcionario.urlLinkedin} " target="_blank">${funcionario.urlLinkedin}</a></p>
                    </li>
                `;
                listaHTML += '</ul>';
                listaFuncionarios.innerHTML = listaHTML;
                document.getElementById('info').style.display = 'block';  
            }  
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao tentar buscar o funcionário!');
            document.getElementById('id').value = "";
        });
}

function listarTodos() {
    fetch("http://localhost:8080/funcionarios/listarTodos")
        .then(response => {
            if(response.status === 200) {
                return response.json();
            }
            document.getElementById('information').style.display = 'none';
        })
        .then(data =>{
            if (data && data.length > 0) {
                const listaFuncionarios = document.getElementById('dadosFuncionarios');
                listaFuncionarios.innerHTML = '';
                let listaHTML = '<ul class="lista-funcionarios">';
                data.forEach(funcionario => {
                    listaHTML += `
                        <li>
                            <h3>${funcionario.nome}</h3>
                            <p><strong>ID:</strong> ${funcionario.id}</p>
                            <p><strong>Email:</strong> ${funcionario.email}</p>
                            <p><strong>Contato:</strong> ${funcionario.contato}</p>
                            <p><strong>Competências Técnicas:</strong> ${funcionario.competenciasTecnicas}</p>
                            <p><strong>Certificações:</strong> ${funcionario.certificacoes}</p>
                            <p><strong>Tempo de Experiência:</strong> ${funcionario.tempoExperiencia}</p>
                            <p><strong>URL Linkedin:</strong> <a href="${funcionario.urlLinkedin} " target="_blank">${funcionario.urlLinkedin}</a></p>
                        </li>
                    `;
                });
                listaHTML += '</ul>';
                listaFuncionarios.innerHTML = listaHTML;
                document.getElementById('information').style.display = 'block';
            } else {
                alert('Não existem funcionários cadastrados!');
                document.getElementById('information').style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Houve um problema com a requisição Fetch: ', error)
            alert('Erro ao tentar listar os funcionários!')
        });
}