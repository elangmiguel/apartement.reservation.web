# web-apartment-reservation-system

A web application designed to manage the reservation and scheduling of apartments within a residential building. It provides functionality for listing available units, managing booking requests, registering users, and administrating reservation workflows.

- model/entity → entidades JPA que representan tablas.
- model/enum → enumeraciones persistibles en columnas PostgreSQL.
- model/id → claves compuestas (@Embeddable).
- model/template → clases base reutilizables (herencia por entidades).

```sh
web-apartment-reservation-system/
│
├── build.gradle.kts
├── settings.gradle.kts
├── gradlew
├── gradlew.bat
├── gradle/
│
├── src/
│   ├── main/
│   │   ├── kotlin/
│   │   │   └── com/
│   │   │       └── apartment/
│   │   │           └── reservation/
│   │   │               ├── WebApartmentReservationSystemApplication.kt
│   │   │               │
│   │   │               ├── config/            # Seguridad, CORS, JWT
│   │   │               ├── controller/        # Controladores REST MVC
│   │   │               ├── service/           # Lógica de negocio
│   │   │               ├── service/impl/      # Implementaciones
│   │   │               ├── repository/        # JPA Repositories
│   │   │               ├── model/             # Entidades JPA
│   │   │               ├── dto/               # DTOs, requests, responses
│   │   │               ├── exception/         # Manejo de excepciones
│   │   │               └── util/              # Utilidades
│   │   │
│   │   ├── resources/
│   │       ├── application.properties (o .yml)
│   │       ├── static/           # CSS, JS
│   │       └── templates/        # Thymeleaf
│   │
│   └── test/
│       └── java/
│           └── com.apartment.reservation/...
│
└── README.md
```

## respuesta paginada

```sh
docs:  Doc[];
totalDocs: int;
offset: int;
limit: int;
totalPages: int;
pages: int:
pagingCounter: int;
hasPrevPage: boolean;
hasNextPage: boolean;
prevPage: null|int;
nextPage: null|int;
```
