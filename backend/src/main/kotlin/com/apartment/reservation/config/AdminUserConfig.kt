package com.apartment.reservation.config

import com.apartment.reservation.model.entity.Role
import com.apartment.reservation.model.entity.User
import com.apartment.reservation.model.entity.UserRole
import com.apartment.reservation.repository.RoleRepository
import com.apartment.reservation.repository.UserRepository
import jakarta.annotation.PostConstruct
import org.springframework.context.annotation.Configuration
import org.springframework.security.crypto.password.PasswordEncoder

@Configuration
class AdminUserConfig(
    private val userRepository: UserRepository,
    private val roleRepository: RoleRepository,
    private val passwordEncoder: PasswordEncoder
) {

    @PostConstruct
    fun initAdmin() {

        val adminRole = roleRepository.findByName("ADMIN")
            ?: roleRepository.save(Role(name = "ADMIN"))

        if (!userRepository.existsByUsername("admin")) {

            val adminUser = User(
                username = "admin",
                domain = null,
                passwordHash = passwordEncoder.encode("12345678")
            )

            val userRole = UserRole(
                user = adminUser,
                role = adminRole
            )

            adminUser.userRoles.add(userRole)

            userRepository.save(adminUser)
        }
    }
}