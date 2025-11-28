package com.apartment.reservation.service

import com.apartment.reservation.model.entity.User
import com.apartment.reservation.repository.UserRepository
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service

@Service
class UserService(
    private val userRepository: UserRepository
) : UserDetailsService {

    override fun loadUserByUsername(username: String): UserDetails {
        val user: User = userRepository.findByUsername(username)
            ?: throw UsernameNotFoundException("User not found: $username")

        return org.springframework.security.core.userdetails.User.builder()
            .username(user.username)
            .password(user.passwordHash)
            .roles(*user.getRoles().map { it.name }.toTypedArray())
            .build()
    }
}
