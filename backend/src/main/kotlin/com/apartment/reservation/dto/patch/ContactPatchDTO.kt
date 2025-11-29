package com.apartment.reservation.dto.patch

import com.apartment.reservation.model.enum.ContactType

data class ContactPatchDTO(
    val type: ContactType? = null,
    val value: String? = null,
    val main: Boolean? = null
)
