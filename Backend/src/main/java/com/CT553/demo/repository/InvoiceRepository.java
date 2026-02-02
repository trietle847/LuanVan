package com.CT553.demo.repository;

import com.CT553.demo.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    @Query("""
    SELECT COUNT(i.id), SUM(i.totalAmount)
    FROM Invoice i
    WHERE MONTH(i.createAt) = :month 
      AND YEAR(i.createAt) = :year
""")
    List<Object[]> statisticByMonth(@Param("month") int month,
                                    @Param("year") int year);

}
