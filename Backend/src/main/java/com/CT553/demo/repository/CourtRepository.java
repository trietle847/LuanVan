package com.CT553.demo.repository;

import com.CT553.demo.entity.Court;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CourtRepository extends JpaRepository<Court, Long> {
    @Query("""
        SELECT c FROM Court c
        WHERE (:typeCourtId IS NULL OR c.typeCourt.id = :typeCourtId)
          AND (
              :keyword IS NULL 
              OR LOWER(c.name) LIKE LOWER(CONCAT('%', :keyword, '%'))
          )
    """)
    Page<Court> search(
            @Param("typeCourtId") Long typeCourtId,
            @Param("keyword") String keyword,
            Pageable pageable
    );
}
