package br.porto.restapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.porto.restapi.model.Funcionario;

public interface FuncinarioRepository extends JpaRepository<Funcionario, Long>{
    
}
