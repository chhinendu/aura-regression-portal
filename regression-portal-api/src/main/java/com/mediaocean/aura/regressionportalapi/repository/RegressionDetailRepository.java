package com.mediaocean.aura.regressionportalapi.repository;

import com.mediaocean.aura.regressionportalapi.entity.RegressionDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegressionDetailRepository extends JpaRepository<RegressionDetail, Long> {

    RegressionDetail getByTestCaseClassAndExecutionDateAndModule(String testCaseClass, String executionDate, String module);
}
