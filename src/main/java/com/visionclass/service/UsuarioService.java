package com.visionclass.service;

import com.visionclass.model.Usuario;
import com.visionclass.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired // O Spring injeta as dependências necessárias
    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Lógica para cadastrar um novo usuário.
     * 1. Valida se o e-mail já existe.
     * 2. Criptografa a senha.
     * 3. Define o papel padrão (ALUNO).
     * 4. Salva no banco.
     */
    public Usuario criarNovoUsuario(Usuario usuario) {
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new IllegalArgumentException("Erro: O e-mail " + usuario.getEmail() + " já está cadastrado.");
        }

        // Criptografia da senha (USANDO O BCRYPT)
        String senhaCriptografada = passwordEncoder.encode(usuario.getSenha());
        usuario.setSenha(senhaCriptografada);

        // Define papel padrão se não for fornecido
        if (usuario.getTipoUsuario() == null || usuario.getTipoUsuario().isEmpty()) {
            usuario.setTipoUsuario("ALUNO");
        }

        return usuarioRepository.save(usuario);
    }

    /**
     * Lógica para realizar o login (autenticação).
     * 1. Busca o usuário pelo email.
     * 2. Compara a senha fornecida (texto puro) com a senha hash do banco.
     * @param email O e-mail fornecido no login.
     * @param senha A senha fornecida no login (texto puro).
     * @return O usuário autenticado ou um Optional vazio (se falhar).
     */
    public Optional<Usuario> autenticar(String email, String senha) {
        // 1. Busca o usuário pelo e-mail
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(email);

        if (usuarioOpt.isEmpty()) {
            return Optional.empty(); // Usuário não encontrado
        }

        Usuario usuario = usuarioOpt.get();

        // 2. Compara a senha fornecida com o hash no banco.
        // O passwordEncoder faz o trabalho de descriptografar e comparar internamente.
        if (passwordEncoder.matches(senha, usuario.getSenha())) {
            // As senhas conferem, retorna o usuário autenticado.
            return Optional.of(usuario);
        } else {
            return Optional.empty(); // Senha incorreta
        }
    }

    // --- Métodos CRUD básicos ---

    public List<Usuario> buscarTodos() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> buscarPorId(Long id) {
        return usuarioRepository.findById(id);
    }
}