package com.apartment.reservation.service.impl

import com.apartment.reservation.mapper.UserMapper
import com.apartment.reservation.model.entity.User
import com.apartment.reservation.repository.UserRepository
import com.apartment.reservation.service.CrudService
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
open class UserServiceImpl(
    private val repository: UserRepository,
    private val mapper: UserMapper
) : CrudService<User, Long> {

    @Transactional
    override fun create(entity: User): User {
        return repository.save(entity)
    }

    @Transactional
    override fun update(entity: User): User {
        return repository.save(entity)
    }

    @Transactional
    override fun delete(id: Long) {
        repository.findById(id).orElseThrow { RuntimeException("User not found with id $id") }
            .also { repository.delete(it) }
    }

    @Transactional(readOnly = true)
    override fun findById(id: Long): User? {
        return repository.findById(id).orElse(null)
    }

    @Transactional(readOnly = true)
    override fun findAll(page: Int, size: Int) =
        repository.findAll(PageRequest.of(page, size))
}
