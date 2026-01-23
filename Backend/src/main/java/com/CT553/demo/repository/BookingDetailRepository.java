package com.CT553.demo.repository;

import com.CT553.demo.entity.BookingDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookingDetailRepository extends JpaRepository<BookingDetail, Long> {
    List<BookingDetail> findByCourt_Id(Long courtId);
    List<BookingDetail> findByUserId(Long userId);
}