package com.apartment.reservation.controller

import com.apartment.reservation.model.entity.UserRole
import com.apartment.reservation.model.id.UserRoleId
import com.apartment.reservation.service.UserRoleService
import org.springframework.data.domain.Page
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/user-roles")
class UserRoleController(
    private val userRoleService: UserRoleService
) {

    @PostMapping
    fun create(@RequestBody userRole: UserRole): UserRole {
        return userRoleService.create(userRole)
    }

    @PutMapping
    fun update(@RequestBody userRole: UserRole): UserRole {
        return userRoleService.update(userRole)
    }

    @DeleteMapping
    fun delete(@RequestParam userId: Long, @RequestParam roleId: Long) {
        val id = UserRoleId(userId, roleId)
        userRoleService.delete(id)
    }

    @GetMapping("/{userId}/{roleId}")
    fun findById(@PathVariable userId: Long, @PathVariable roleId: Long): UserRole? {
        val id = UserRoleId(userId, roleId)
        return userRoleService.findById(id)
    }

    @GetMapping
    fun findAll(@RequestParam page: Int = 0, @RequestParam size: Int = 10): Page<UserRole> {
        return userRoleService.findAll(page, size)
    }
}
