package com.visionclass.controller;

import com.visionclass.dto.LoginRequest; // Importa o DTO que criamos para o login
import com.visionclass.model.Usuario;
import com.visionclass.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

// Habilita a comunicação entre portas diferentes (Frontend React e Backend Java)
// Configure o "origins" com a URL do seu frontend em desenvolvimento (geralmente 5173 ou 3000)
@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api/usuarios") // URL base: http://localhost:8080/api/usuarios
public class UsuarioController {

    private final UsuarioService usuarioService;

    @Autowired
    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    /**
     * Endpoint para CADASTRO de novos usuários (NovoUsuario.tsx).
     * Método: POST
     * URL: /api/usuarios
     * Retorna: 201 Created ou 400 Bad Request
     */
    @PostMapping
    public ResponseEntity<Usuario> criarUsuario(@RequestBody Usuario usuario) {
        try {
            Usuario novoUsuario = usuarioService.criarNovoUsuario(usuario);
            // O Spring retornará 201 (Created) e o objeto do usuário criado
            return new ResponseEntity<>(novoUsuario, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            // Captura erro de e-mail já existente do Service
            // Retorna 400 (Bad Request)
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Endpoint para LOGIN (Autenticação) (Login.tsx).
     * Método: POST
     * URL: /api/usuarios/login
     * Retorna: 200 OK (com dados do usuário) ou 401 Unauthorized
     */
    @PostMapping("/login") // Endpoint específico: /api/usuarios/login
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {

        Optional<Usuario> usuarioAutenticado = usuarioService.autenticar(
                loginRequest.getEmail(),
                loginRequest.getSenha()
        );

        if (usuarioAutenticado.isPresent()) {
            // Autenticação bem-sucedida (Status 200 OK)

            // Nota de Implementação Futura:
            // Em produção, aqui seria o local ideal para gerar e retornar um
            // JWT (JSON Web Token) em vez do objeto Usuario completo.

            return new ResponseEntity<>(usuarioAutenticado.get(), HttpStatus.OK);
        } else {
            // Falha na autenticação (Status 401 Unauthorized)
            Map<String, String> erro = new HashMap<>();
            erro.put("mensagem", "Credenciais inválidas. Verifique seu email e senha.");
            return new ResponseEntity<>(erro, HttpStatus.UNAUTHORIZED);
        }
    }

    /**
     * Endpoint para buscar TODOS os usuários.
     * Método: GET
     * URL: /api/usuarios
     * (Este método deve ser restrito a ADMINs em uma aplicação real usando Spring Security)
     */
    @GetMapping
    public ResponseEntity<List<Usuario>> buscarTodosUsuarios() {
        List<Usuario> usuarios = usuarioService.buscarTodos();
        return new ResponseEntity<>(usuarios, HttpStatus.OK);
    }
}