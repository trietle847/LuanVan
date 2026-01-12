package com.CT553.demo.repository;

import com.CT553.demo.entity.BookingProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingProductRepository extends JpaRepository<BookingProduct, Long> {
}
