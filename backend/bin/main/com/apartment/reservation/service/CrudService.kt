package com.apartment.reservation.service

import org.springframework.data.domain.Page

interface CrudService<T : Any, ID : Any> {
    fun create(entity: T): T
    fun update(entity: T): T
    fun delete(id: ID)
    fun findById(id: ID): T?
    fun findAll(page: Int, size: Int): Page<T>
}
