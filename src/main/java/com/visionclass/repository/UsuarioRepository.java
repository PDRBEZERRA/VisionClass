package com.visionclass.repository;

import com.visionclass.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

// JpaRepository<[Entidade], [Tipo da PK]> fornece CRUD pronto
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    // Método que será automaticamente implementado pelo Spring Data JPA.
    Optional<Usuario> findByEmail(String email);

    // Método que verifica a existência pelo email.
    boolean existsByEmail(String email);
}