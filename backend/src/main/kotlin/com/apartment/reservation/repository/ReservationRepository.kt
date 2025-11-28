package com.apartment.reservation.repository

import com.apartment.reservation.model.entity.Reservation
import org.springframework.stereotype.Repository

@Repository
interface ReservationRepository : BaseRepository<Reservation, Long> {
    fun findByApartmentId(apartmentId: Long): List<Reservation>
    fun findByUserId(userId: Long): List<Reservation>
}
