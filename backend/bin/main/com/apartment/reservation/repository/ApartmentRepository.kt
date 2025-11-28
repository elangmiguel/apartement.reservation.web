package com.apartment.reservation.repository

import com.apartment.reservation.model.entity.Apartment
import org.springframework.stereotype.Repository

@Repository
interface ApartmentRepository : BaseRepository<Apartment, Long> {
    fun findByBuildingId(buildingId: Long): List<Apartment>
    fun findByStatus(status: String): List<Apartment>
    fun existsByBuildingIdAndFloorAndNumber(buildingId: Long, floor: Int, number: Int): Boolean
}
