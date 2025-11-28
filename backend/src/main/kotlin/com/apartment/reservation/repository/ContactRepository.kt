package com.apartment.reservation.repository

import com.apartment.reservation.model.entity.Contact
import org.springframework.stereotype.Repository

@Repository
interface ContactRepository : BaseRepository<Contact, Long> {
    fun findByPersonId(personId: Long): List<Contact>
}
