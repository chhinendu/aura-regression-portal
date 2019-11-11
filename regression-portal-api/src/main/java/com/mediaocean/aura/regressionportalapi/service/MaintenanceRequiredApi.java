package com.mediaocean.aura.regressionportalapi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mediaocean.aura.regressionportalapi.entity.Regression;
import com.mediaocean.aura.regressionportalapi.repository.RegressionRepository;

@RestController
@RequestMapping("/is-maintenance-required")
public class MaintenanceRequiredApi {

	 @Autowired
	    RegressionRepository regressionRepository;
	
	@GetMapping(value = "/")//TODO need to ask
    public boolean get(String noOfRun, String testClassName, String continent) {
		List<Regression> data = regressionRepository.getLatestExecutionStatus(noOfRun, testClassName, continent);
		int latestRunNum = Integer.parseInt(noOfRun);
		
		for(Regression record: data) {
			//record.
		}
        return true;
        
    }
}
