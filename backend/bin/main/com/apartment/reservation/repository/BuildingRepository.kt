package com.apartment.reservation.repository

import com.apartment.reservation.model.entity.Building
import org.springframework.stereotype.Repository

@Repository
interface BuildingRepository : BaseRepository<Building, Long> {
    fun findByName(name: String): Building?
}
