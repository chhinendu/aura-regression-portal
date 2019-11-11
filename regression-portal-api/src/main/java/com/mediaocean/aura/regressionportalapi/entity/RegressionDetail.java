package com.mediaocean.aura.regressionportalapi.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Data
@Table(name = "AURA_TESTCASE_EXECUTION_STATUS")
@NoArgsConstructor
public class RegressionDetail {

    @EmbeddedId
    private RegressionPK id;

    @Column(name = "MODULE")
    private String module;

    @Column(name = "CONTINENT")
    private String continent;

    @Column(name = "TESTCASECLASS", insertable = false, updatable = false)
    private String testCaseClass;

    @Column(name = "TESTCASEMETHOD")
    private String testCaseMethod;

    @Column(name = "RUNNUMBER")
    private int runNumber;

    @Column(name = "FAILUREREASON")
    private String failureReason;

    @Column(name = "EXECUTIONDATE", insertable = false, updatable = false)
    private String executionDate;

    @Column(name = "EXECUTIONSTATUS")
    private String executionStatus;

    @Column(name = "LOCALE")
    private String locale;
}
