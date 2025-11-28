package com.apartment.reservation.model.entity

import jakarta.persistence.Column
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.MappedSuperclass
import org.hibernate.annotations.CreationTimestamp
import org.hibernate.annotations.UpdateTimestamp
import java.time.LocalDateTime


@MappedSuperclass
abstract class BaseModel(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    open var id: Long? = null,

    @Column(name = "created_at")
    @CreationTimestamp
    open var createdAt: LocalDateTime? = null,

    @Column(name = "updated_at")
    @UpdateTimestamp
    open var updatedAt: LocalDateTime? = null
)



/**
 * Although ID should be immutable, JPA does not allow this.
 * It is due entities are created in memory with ID = null, then
 * the Database supplies the ID for JPA set it in the object
 */
