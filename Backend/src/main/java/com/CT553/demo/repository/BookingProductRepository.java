package com.CT553.demo.repository;

import com.CT553.demo.entity.BookingProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookingProductRepository extends JpaRepository<BookingProduct, Long> {
    @Query("""
        SELECT 
            p.id,
            p.name,
            SUM(bp.quantity)
        FROM BookingProduct bp
        JOIN bp.product p
        JOIN bp.bookingDetail bd
        WHERE MONTH(bd.createAt) = :month
          AND YEAR(bd.createAt) = :year
        GROUP BY p.id, p.name
        ORDER BY SUM(bp.quantity) DESC
    """)
    List<Object[]> statisticProductByMonth(@Param("month") int month,
                                           @Param("year") int year);
}
