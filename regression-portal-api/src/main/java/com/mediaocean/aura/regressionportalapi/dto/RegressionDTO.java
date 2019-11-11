package com.mediaocean.aura.regressionportalapi.dto;

import com.mediaocean.aura.regressionportalapi.entity.Regression;
import lombok.Data;

@Data
public class RegressionDTO {

    private String module;

    private String continent;

    private String testCaseClass;

    private String testCaseMethod;

    private int runNumber;

    private String executionDate;

    private String executionStatus;

    private String locale;

    private boolean maintenanceRequired;

    public RegressionDTO(Regression regression, boolean maintenanceRequired) {
        this.module = regression.getModule();
        this.continent = regression.getContinent();
        this.testCaseClass = regression.getTestCaseClass();
        this.testCaseMethod = regression.getTestCaseMethod();
        this.runNumber = regression.getRunNumber();
        this.executionDate = regression.getExecutionDate();
        this.executionStatus = regression.getExecutionStatus();
        this.locale = regression.getLocale();
        this.maintenanceRequired = maintenanceRequired;
    }
}
