package com.apartment.reservation.config

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.security.Keys
import org.springframework.stereotype.Component
import java.util.*


@Component
class JwtTokenProvider {

    private val key = Keys.secretKeyFor(SignatureAlgorithm.HS256)
    private val validityInMs: Long = 3600000 // 1 hora

    fun generateToken(username: String, roles: List<String>): String {
        val now = Date()
        val expiry = Date(now.time + validityInMs)

        return Jwts.builder()
            .setSubject(username)
            .claim("roles", roles)
            .setIssuedAt(now)
            .setExpiration(expiry)
            .signWith(key)
            .compact()
    }

    fun getUsername(token: String): String =
        Jwts.parserBuilder().setSigningKey(key).build()
            .parseClaimsJws(token)
            .body.subject

    fun getRoles(token: String): List<String> =
        Jwts.parserBuilder().setSigningKey(key).build()
            .parseClaimsJws(token)
            .body["roles"] as List<String>

    fun validateToken(token: String): Boolean =
        try {
            val claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token)
            !claims.body.expiration.before(Date())
        } catch (ex: Exception) {
            false
        }
}
