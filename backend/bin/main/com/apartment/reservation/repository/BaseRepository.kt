package com.apartment.reservation.repository

import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.repository.NoRepositoryBean
import org.springframework.data.jpa.repository.JpaRepository

@NoRepositoryBean
interface BaseRepository<T: Any, ID: Any> : JpaRepository<T, ID> {
    /**
     * Búsqueda paginada con filtros opcionales.
     * Por defecto devuelve todos los registros si no hay filtros.
     */
    override fun findAll(pageable: Pageable): Page<T>
}
