package com.CT553.demo.repository;

import com.CT553.demo.entity.BookingDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BookingDetailRepository extends JpaRepository<BookingDetail, Long> {
    List<BookingDetail> findByCourt_Id(Long courtId);
    List<BookingDetail> findByUserId(Long userId);

    @Query("""
        SELECT 
            c.id,
            c.name,
            COUNT(bd.id)
        FROM BookingDetail bd
        JOIN bd.court c
        WHERE MONTH(bd.createAt) = :month
          AND YEAR(bd.createAt) = :year
        GROUP BY c.id, c.name
        ORDER BY COUNT(bd.id) DESC
    """)
    List<Object[]> statisticCourtUsage(@Param("month") int month,
                                       @Param("year") int year);
    @Query("""
    SELECT 
        DAY(bd.date),
        COUNT(bd.id)
    FROM BookingDetail bd
    WHERE MONTH(bd.date) = :month
      AND YEAR(bd.date) = :year
    GROUP BY DAY(bd.date)
    ORDER BY DAY(bd.date)
""")
    List<Object[]> statisticBookingByDay(@Param("month") int month,
                                         @Param("year") int year);

    @Query("""
    SELECT 
        ct.id,
        ct.name,
        COUNT(bd.id)
    FROM BookingDetail bd
    JOIN bd.court c
    JOIN c.typeCourt ct
    WHERE MONTH(bd.date) = :month
      AND YEAR(bd.date) = :year
    GROUP BY ct.id, ct.name
    ORDER BY COUNT(bd.id) DESC
""")
    List<Object[]> statisticCourtTypeUsage(@Param("month") int month,
                                           @Param("year") int year);

}