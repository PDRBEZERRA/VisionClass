package com.visionclass.config;

import com.visionclass.model.Usuario;
import com.visionclass.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DatabaseSeeder {

    @Bean
    public CommandLineRunner initDatabase(
            UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {
            // Verifica se o admin já existe
            if (!usuarioRepository.existsByEmail("admin@visionclass.com")) {

                Usuario admin = new Usuario();
                admin.setNome("Administrador Padrão");
                admin.setEmail("admin@visionclass.com");

                // Senha padrão: "123456" (criptografada)
                String senhaPadraoCriptografada = passwordEncoder.encode("123456");
                admin.setSenha(senhaPadraoCriptografada);

                admin.setTipoUsuario("ADMIN");

                usuarioRepository.save(admin);

                System.out.println(">>> Usuário ADMIN padrão 'admin@visionclass.com' criado com sucesso!");
                System.out.println(">>> Senha padrão para login: 123456");
            }
        };
    }
}