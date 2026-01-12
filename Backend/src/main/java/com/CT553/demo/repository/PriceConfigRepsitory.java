package com.CT553.demo.repository;

import com.CT553.demo.entity.PriceConfig;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PriceConfigRepsitory extends JpaRepository<PriceConfig, Long> {
    List<PriceConfig> findByTypeCourt_Id(Long typeCourtId);
}
