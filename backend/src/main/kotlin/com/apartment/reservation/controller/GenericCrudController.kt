package com.apartment.reservation.controller

import com.apartment.reservation.dto.response.PaginatedResponseDTO
import com.apartment.reservation.service.CrudService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.Parameter
import io.swagger.v3.oas.annotations.media.Content
import io.swagger.v3.oas.annotations.media.Schema
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import org.springframework.data.domain.Page
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*

/**
 * Controller genérico para operaciones CRUD.
 *
 * T: Tipo de entidad
 * ID: Tipo de id de la entidad
 * Req: DTO de request
 * Res: DTO de response
 * Patch: DTO de patch
 */
abstract class GenericCrudController<T: Any, ID: Any, Req, Res : Any, Patch>(
    private val service: CrudService<T, ID>
) {

    abstract fun toEntity(dto: Req): T
    abstract fun toResponse(entity: T): Res
    abstract fun updateEntity(entity: T, patch: Patch): T

    @Operation(summary = "Crear entidad")
    @ApiResponses(
        ApiResponse(responseCode = "201", description = "Entidad creada correctamente",
            content = [Content(schema = Schema(implementation = Any::class))])
    )
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun create(@RequestBody dto: Req): Res {
        val entity = toEntity(dto)
        return toResponse(service.create(entity))
    }

    @Operation(summary = "Actualizar entidad completamente por ID")
    @PutMapping("/{id}")
    fun update(
        @Parameter(description = "ID de la entidad a actualizar") @PathVariable id: ID,
        @RequestBody dto: Req
    ): Res {
        val entity = service.findById(id) ?: throw NoSuchElementException("Entity not found")
        val updatedEntity = toEntity(dto)
        // Mantener el ID original
        updatedEntity.apply {
            val k = this::class.members.find { it.name == "id" }
            k?.let { it.call(this) } // Opcional, depende del BaseModel
        }
        return toResponse(service.update(updatedEntity))
    }

    @Operation(summary = "Actualizar parcialmente una entidad por ID")
    @PatchMapping("/{id}")
    fun patch(
        @Parameter(description = "ID de la entidad a actualizar parcialmente") @PathVariable id: ID,
        @RequestBody dto: Patch
    ): Res {
        val entity = service.findById(id) ?: throw NoSuchElementException("Entity not found")
        val updated = updateEntity(entity, dto)
        return toResponse(service.update(updated))
    }

    @Operation(summary = "Eliminar entidad por ID")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun delete(
        @Parameter(description = "ID de la entidad a eliminar") @PathVariable id: ID
    ) = service.delete(id)

    @Operation(summary = "Obtener entidad por ID")
    @GetMapping("/{id}")
    fun getById(
        @Parameter(description = "ID de la entidad a obtener") @PathVariable id: ID
    ): Res {
        val entity = service.findById(id) ?: throw NoSuchElementException("Entity not found")
        return toResponse(entity)
    }

    @Operation(summary = "Listar entidades con paginación")
    @GetMapping
    fun list(
        @Parameter(description = "Número de página (default 0)") @RequestParam(defaultValue = "0") page: Int,
        @Parameter(description = "Tamaño de página (default 10)") @RequestParam(defaultValue = "10") size: Int
    ): PaginatedResponseDTO<Res> {
        val result: Page<T> = service.findAll(page, size)
        val docs = result.content.map { toResponse(it) }

        return PaginatedResponseDTO.fromPage(result, docs)
    }
}
