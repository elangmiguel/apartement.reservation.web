package com.apartment.reservation.repository

import com.apartment.reservation.model.entity.Person
import org.springframework.stereotype.Repository

@Repository
interface PersonRepository : BaseRepository<Person, Long> {
    fun findByidentityValue(identityValue: String): Person?
}
