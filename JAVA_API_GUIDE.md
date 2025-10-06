# Guia para Criar a API Java (Spring Boot)

## 1. Criar o Projeto Spring Boot

```bash
# Usando Spring Initializr (https://start.spring.io/)
# Dependências necessárias:
- Spring Web
- Spring Data JPA
- PostgreSQL Driver (ou MySQL)
- Spring Security
- Lombok
```

## 2. Configurar CORS

```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins(
                            "http://localhost:8080",
                            "https://seu-app.lovable.app"
                        )
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
```

## 3. Exemplo de Controller

```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id) {
        return ResponseEntity.ok(userService.findById(id));
    }
    
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.create(user));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(
        @PathVariable String id,
        @RequestBody User user
    ) {
        return ResponseEntity.ok(userService.update(id, user));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
```

## 4. Configurar JWT Authentication

```java
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        // Validar credenciais
        // Gerar JWT token
        // Retornar token + dados do usuário
    }
    
    @PostMapping("/register")
    public ResponseEntity<LoginResponse> register(@RequestBody RegisterRequest request) {
        // Criar novo usuário
        // Gerar JWT token
        // Retornar token + dados do usuário
    }
}
```

## 5. application.properties

```properties
# Porta do servidor
server.port=8080

# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/visionclass
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha

# JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# JWT
jwt.secret=seu_secret_super_seguro
jwt.expiration=86400000
```

## 6. Deploy Recomendado

### Railway (mais fácil):
1. Criar conta no Railway.app
2. Conectar repositório GitHub
3. Configurar variáveis de ambiente
4. Deploy automático

### Heroku:
1. Criar `Procfile`: `web: java -jar target/seu-app.jar`
2. `heroku create`
3. `git push heroku main`

## 7. Endpoints que o Frontend Espera

### Autenticação:
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Registro

### Usuários:
- `GET /api/users` - Listar todos
- `GET /api/users/{id}` - Buscar por ID
- `POST /api/users` - Criar
- `PUT /api/users/{id}` - Atualizar
- `DELETE /api/users/{id}` - Deletar

## 8. Formato de Resposta Esperado

### Login/Register Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123",
    "email": "usuario@email.com",
    "name": "Nome do Usuário",
    "role": "admin"
  }
}
```

### User Object:
```json
{
  "id": "123",
  "name": "Nome",
  "email": "email@email.com",
  "role": "admin",
  "createdAt": "2025-01-01T00:00:00Z"
}
```

## Próximos Passos:

1. ✅ Frontend já está configurado
2. ⏳ Você cria a API Java seguindo este guia
3. ⏳ Faz deploy (Railway/Heroku)
4. ⏳ Atualiza a URL em `src/services/api.ts`
5. ✅ Tudo funcionando!
