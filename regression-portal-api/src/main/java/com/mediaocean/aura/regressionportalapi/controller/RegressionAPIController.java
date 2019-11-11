package com.mediaocean.aura.regressionportalapi.controller;

import com.mediaocean.aura.regressionportalapi.entity.Regression;
import com.mediaocean.aura.regressionportalapi.repository.RegressionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/regression-api")
public class RegressionAPIController {

    @Autowired
    RegressionRepository regressionRepository;

    @GetMapping(value = "/")
    public List<Regression> get() {
        return regressionRepository.findAllByExectutionDateAndModule("19/09/2019", "TIME");
    }
}
