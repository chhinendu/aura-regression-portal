package com.mediaocean.aura.regressionportalapi.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Embeddable
@Data
class RegressionPK implements Serializable {

    @Column(name = "TESTCASECLASS")
    private String testCaseClass;

    @Column(name = "TESTCASEMETHOD")
    private String testCaseMethod;

    @Column(name = "EXECUTIONDATE")
    private String exectutionDate;
}

@Entity
@Data
@Table(name = "AURA_TESTCASE_EXECUTION_STATUS")
@NoArgsConstructor
public class Regression {

    @EmbeddedId
    private RegressionPK id;

    @Column(name = "MODULE")
    private String module;

    @Column(name = "CONTINENT")
    private String continent;

    @Column(name = "TESTCASECLASS", insertable = false, updatable = false)
    private String testCaseClass;

    @Column(name = "TESTCASEMETHOD", insertable = false, updatable = false)
    private String testCaseMethod;

    @Column(name = "RUNNUMBER")
    private int runNumber;

    @Column(name = "EXECUTIONDATE", insertable = false, updatable = false)
    private String executionDate;

    @Column(name = "EXECUTIONSTATUS")
    private String executionStatus;

    @Column(name = "LOCALE")
    private String locale;

    public Regression(String module, String executionDate) {
        this.module = module;
        this.executionDate = executionDate;
    }
    
    public Regression(String locale, String executionDate, String executionStatus) {
    	this.locale = locale;
        this.executionDate = executionDate;
        this.executionStatus = executionStatus;
    }
}
