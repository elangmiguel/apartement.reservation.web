package com.apartment.reservation.dto.response

import org.springframework.data.domain.Page

data class PaginatedResponseDTO<R>(
    val docs: List<R>,
    val totalDocs: Long,
    val offset: Int,
    val limit: Int,
    val totalPages: Int,
    val page: Int,
    val pagingCounter: Int,
    val hasPrevPage: Boolean,
    val hasNextPage: Boolean,
    val prevPage: Int?,
    val nextPage: Int?
) {
    companion object {
        fun <E : Any, R : Any> fromPage(page: Page<E>, docs: List<R>): PaginatedResponseDTO<R> {
            val currentPage = page.number + 1
            return PaginatedResponseDTO(
                docs = docs,
                totalDocs = page.totalElements,
                offset = page.number * page.size,
                limit = page.size,
                totalPages = page.totalPages,
                page = currentPage,
                pagingCounter = (page.number * page.size) + 1,
                hasPrevPage = page.hasPrevious(),
                hasNextPage = page.hasNext(),
                prevPage = if (page.hasPrevious()) currentPage - 1 else null,
                nextPage = if (page.hasNext()) currentPage + 1 else null
            )
        }
    }
}
