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

    @Query("SELECT r FROM Regression r WHERE r.executionDate = :executionDate AND r.executionStatus <> 'Pass'")
    List<Regression> findAllByExectutionDateAndExecutionStatusQuery(@Param("executionDate") String executionDate);

    @Query("SELECT new Regression(r.module, r.executionDate) FROM Regression r GROUP BY r.module, r.executionDate")
    List<Regression> findAllByRegressionQuery();
    
    @Query("SELECT  new Regression(r.locale, r.executionDate, r.executionStatus) FROM Regression r WHERE r.testCaseClass = :testClassName and r.locale = :locale and rownum <= :noOfRun GROUP BY r.locale, r.executionDate, r.executionStatus ORDER BY to_date(r.executionDate,'DD/MM/YYYY') desc;")
    List<Regression> getLatestExecutionStatus(@Param("noOfRun") String noOfRun, @Param("testClassName") String testClassName, @Param("locale") String locale);
}
