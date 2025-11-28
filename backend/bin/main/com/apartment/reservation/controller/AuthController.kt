package com.apartment.reservation.controller

import com.apartment.reservation.config.JwtTokenProvider
import com.apartment.reservation.service.UserService
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.web.bind.annotation.*

data class LoginRequest(val username: String, val password: String)
data class LoginResponse(val token: String)

@RestController
@RequestMapping("/api/auth")
class AuthController(
    private val authenticationManager: AuthenticationManager,
    private val jwtTokenProvider: JwtTokenProvider,
    private val userService: UserService
) {

    @PostMapping("/login")
    fun login(@RequestBody request: LoginRequest): ResponseEntity<LoginResponse> {
        val auth = authenticationManager.authenticate(
            UsernamePasswordAuthenticationToken(request.username, request.password)
        )
        val userDetails = userService.loadUserByUsername(request.username)
        val roles = userDetails.authorities.map { it.authority?.removePrefix("ROLE_") }
        val token = jwtTokenProvider.generateToken(request.username, roles as List<String>)
        return ResponseEntity.ok(LoginResponse(token))
    }
}
