package com.mediaocean.aura.regressionportalapi.repository;

import com.mediaocean.aura.regressionportalapi.entity.Regression;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegressionRepository extends JpaRepository<Regression, Long> {
    @Query("SELECT r FROM Regression r WHERE r.executionDate = :executionDate AND r.module = :module AND r.executionStatus <> 'Pass'")
    List<Regression> findAllByExectutionDateAndModuleAndExecutionStatusQuery(@Param("executionDate") String executionDate, @Param("module") String module);
}
