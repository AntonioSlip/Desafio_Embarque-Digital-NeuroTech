package br.porto.restapi.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Funcionario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String nome;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String contato;
    @Column(nullable = false)
    private String competenciasTecnicas;
    @Column(nullable = false)
    private String certificacoes;
    @Column(nullable = false)
    private String tempoExperiencia;
    @Column(nullable = false)
    private String urlLinkedin;

    public Funcionario() {

    }

    public Funcionario(String certificacoes, String competenciasTecnicas, String contato, String email, Long id, String nome, String tempoExperiencia, String urlLinkedin) {

        this.certificacoes = certificacoes;
        this.competenciasTecnicas = competenciasTecnicas;
        this.contato = contato;
        this.email = email;
        this.id = id;
        this.nome = nome;
        this.tempoExperiencia = tempoExperiencia;
        this.urlLinkedin = urlLinkedin;
        
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContato() {
        return contato;
    }

    public void setContato(String contato) {
        this.contato = contato;
    }

    public String getCompetenciasTecnicas() {
        return competenciasTecnicas;
    }

    public void setCompetenciasTecnicas(String competenciasTecnicas) {
        this.competenciasTecnicas = competenciasTecnicas;
    }

    public String getCertificacoes() {
        return certificacoes;
    }

    public void setCertificacoes(String certificacoes) {
        this.certificacoes = certificacoes;
    }

    public String getTempoExperiencia() {
        return tempoExperiencia;
    }

    public void setTempoExperiencia(String tempoExperiencia) {
        this.tempoExperiencia = tempoExperiencia;
    }

    public String getUrlLinkedin() {
        return urlLinkedin;
    }

    public void setUrlLinkedin(String urlLinkedin) {
        this.urlLinkedin = urlLinkedin;
    }

}
