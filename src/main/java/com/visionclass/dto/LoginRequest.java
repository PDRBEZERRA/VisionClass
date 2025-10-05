package com.visionclass.dto;

// DTO (Data Transfer Object) para receber email e senha do formulário de login do React.
public class LoginRequest {

    private String email;
    private String senha;

    // Construtor, Getters e Setters (usamos o padrão Java se não tiver Lombok)

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }
}