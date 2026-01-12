package com.CT553.demo.repository;

import com.CT553.demo.entity.SportCenter;
import com.CT553.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SportCenterRepository extends JpaRepository<SportCenter, Long> {
    List<SportCenter> findByUser(User user);

}