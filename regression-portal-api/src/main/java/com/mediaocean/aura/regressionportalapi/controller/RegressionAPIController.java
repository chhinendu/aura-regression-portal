package com.mediaocean.aura.regressionportalapi.controller;

import com.mediaocean.aura.regressionportalapi.entity.Regression;
import com.mediaocean.aura.regressionportalapi.repository.RegressionRepository;
import com.mediaocean.aura.regressionportalapi.service.MaintenanceRequiredApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/regression-api")
public class RegressionAPIController {

    @Autowired
    RegressionRepository regressionRepository;

    @Autowired
    MaintenanceRequiredApi maintenanceRequiredApi;

    @PostMapping(value = "/")
    public List<Regression> get() {
        List<Regression> regressionList = regressionRepository.findAllByExectutionDateAndExecutionStatusQuery("19/09/2019");
        /*List<RegressionDTO> regressionDTOList = new ArrayList<>();
        regressionList.forEach(regression ->
                regressionDTOList.add(new RegressionDTO(regression, maintenanceRequiredApi.get(3, regression.getTestCaseClass(), regression.getLocale()))));
        return regressionDTOList;*/
        return regressionList;
    }

    @GetMapping(value = "/regressions")
    public List<Regression> getRegressions() {
        return regressionRepository.findAllByRegressionQuery();
    }

    @PostMapping(value = "/detail")
    public Regression getDetails() {
        return regressionRepository.getByTestCaseClassAndExecutionDateAndModule("Smoke_Test_Suite.Main.QATEST_15389_15390", "19/09/2019", "TIME");
    }
}
