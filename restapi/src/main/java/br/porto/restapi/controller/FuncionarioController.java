package br.porto.restapi.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.porto.restapi.model.Funcionario;
import br.porto.restapi.repository.FuncinarioRepository;

@RestController
@CrossOrigin("*")
@RequestMapping("/funcionarios")
public class FuncionarioController {

    @Autowired
    private FuncinarioRepository repositorio;

    @GetMapping("/listarTodos")
    public ResponseEntity<List<Funcionario>> listarTodos() {
        
        List<Funcionario> listarTodos = repositorio.findAll();
        return ResponseEntity.status(200).body(listarTodos);

    }

    @GetMapping("/listar/{id}")
    public ResponseEntity<Funcionario> listarPorID(@PathVariable("id") Long id) {

        if(!repositorio.findById(id).equals(Optional.empty())) {

            Funcionario listarPorID = repositorio.findById(id).get();
            return ResponseEntity.status(200).body(listarPorID);

        }
        
        return ResponseEntity.notFound().build();

    }
    
    @PostMapping("/adicionar")
    public ResponseEntity<Funcionario> adicionar(@RequestBody Funcionario funcionario) {

        Funcionario adicionar =  repositorio.save(funcionario);
        return ResponseEntity.status(201).body(adicionar);

    }

    @PutMapping("/atualizar/{id}")
    public ResponseEntity<Funcionario> atualizarPorID(@PathVariable("id") Long id, @RequestBody Map<String, String> body) {
        
        if(!repositorio.findById(id).equals(Optional.empty())) {

            Funcionario funcionario = repositorio.findById(id).get();
            funcionario.setNome(body.get("nome"));
            funcionario.setEmail(body.get("email"));
            funcionario.setContato(body.get("contato"));
            funcionario.setCompetenciasTecnicas(body.get("competenciasTecnicas"));
            funcionario.setCertificacoes(body.get("certificacoes"));
            funcionario.setTempoExperiencia(body.get("tempoExperiencia"));
            funcionario.setUrlLinkedin(body.get("urlLinkedin"));
            Funcionario atualizarPorId = repositorio.save(funcionario);
            return ResponseEntity.status(201).body(atualizarPorId);

        }

        return ResponseEntity.notFound().build();

    }
    
    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<?> deletarPorId(@PathVariable("id") Long id) {

        if(!repositorio.findById(id).equals(Optional.empty())) {

            repositorio.deleteById(id);
            return ResponseEntity.status(204).build();

        }

        return ResponseEntity.notFound().build();

    }
}