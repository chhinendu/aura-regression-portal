package com.mediaocean.aura.regressionportalapi.repository;

import com.mediaocean.aura.regressionportalapi.entity.Regression;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegressionRepository extends JpaRepository<Regression, Long> {
    List<Regression> findAllByExectutionDateAndModule(String executionDate, String module);
}
