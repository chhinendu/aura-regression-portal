package com.mediaocean.aura.regressionportalapi.controller;

import com.mediaocean.aura.regressionportalapi.entity.Regression;
import com.mediaocean.aura.regressionportalapi.entity.RegressionDetail;
import com.mediaocean.aura.regressionportalapi.repository.RegressionDetailRepository;
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
    RegressionDetailRepository regressionDetailRepository;

    @Autowired
    MaintenanceRequiredApi maintenanceRequiredApi;

    @GetMapping(value = "/")
    public List<Regression> get(@RequestParam String module, @RequestParam String date) {
        List<Regression> regressionList = regressionRepository.findAllByExectutionDateAndModuleAndExecutionStatusQuery(date, module);
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

    @GetMapping(value = "/detail")
    public RegressionDetail getDetails(@RequestParam String module, @RequestParam String date, @RequestParam String testCase) {
        return regressionDetailRepository.getByTestCaseClassAndExecutionDateAndModule(testCase, date, module);
    }
}
