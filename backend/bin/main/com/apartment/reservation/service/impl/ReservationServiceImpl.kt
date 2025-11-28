package com.apartment.reservation.service.impl

import com.apartment.reservation.mapper.ReservationMapper
import com.apartment.reservation.model.entity.Reservation
import com.apartment.reservation.repository.ReservationRepository
import com.apartment.reservation.service.CrudService
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
open class ReservationServiceImpl(
    private val repository: ReservationRepository,
    private val mapper: ReservationMapper
) : CrudService<Reservation, Long> {

    @Transactional
    override fun create(entity: Reservation): Reservation {
        return repository.save(entity)
    }

    @Transactional
    override fun update(entity: Reservation): Reservation {
        return repository.save(entity)
    }

    @Transactional
    override fun delete(id: Long) {
        repository.findById(id).orElseThrow { RuntimeException("Reservation not found with id $id") }
            .also { repository.delete(it) }
    }

    @Transactional(readOnly = true)
    override fun findById(id: Long): Reservation? {
        return repository.findById(id).orElse(null)
    }

    @Transactional(readOnly = true)
    override fun findAll(page: Int, size: Int) =
        repository.findAll(PageRequest.of(page, size))
}