package com.apartment.reservation.model.entity

import com.apartment.reservation.model.entity.BaseModel
import com.apartment.reservation.model.enum.ContactType
import jakarta.persistence.*
import org.springframework.data.annotation.Id
import java.time.LocalDateTime

@Entity
@Table(
    name = "contacts",
    schema = "management",
    uniqueConstraints = [
        UniqueConstraint(name = "contacts_person_type_unique", columnNames = ["person_id", "type", "value"])
    ]
)
class Contact(

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "person_id", nullable = false)
    var person: Person,

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    var type: ContactType,

    @Column(nullable = false)
    var value: String,

    @Column(nullable = false)
    var main: Boolean = false,

    ) : BaseModel()
