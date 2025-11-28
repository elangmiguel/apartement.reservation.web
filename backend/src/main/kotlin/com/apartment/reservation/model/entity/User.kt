package com.apartment.reservation.model.entity

import com.apartment.reservation.model.enum.UserStatus
import com.fasterxml.jackson.annotation.JsonManagedReference
import jakarta.persistence.*

@Entity
@Table(name = "users", schema = "management")
class User(

    @Column(nullable = false, unique = true)
    var username: String,

    var domain: String? = null,

    @Column(insertable = false, updatable = false)
    var email: String? = null,

    @Column(nullable = false, name = "password_hash")
    var passwordHash: String?,

    @Enumerated(EnumType.STRING)
    var status: UserStatus = UserStatus.ACTIVE,

    // Relación con UserRole
    @OneToMany(mappedBy = "user", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    @JsonManagedReference
    val userRoles: MutableList<UserRole> = mutableListOf()

) : BaseModel() {

    // Direct access
    fun getRoles(): List<Role> = userRoles.map { it.role as Role }
}
