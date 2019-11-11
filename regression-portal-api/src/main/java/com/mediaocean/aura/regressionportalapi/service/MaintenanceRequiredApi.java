package com.mediaocean.aura.regressionportalapi.service;

import com.mediaocean.aura.regressionportalapi.entity.Regression;
import com.mediaocean.aura.regressionportalapi.repository.RegressionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaintenanceRequiredApi {

	 @Autowired
	 RegressionRepository regressionRepository;


	public boolean get(int noOfRun, String testClassName, String continent) {
		List<Regression> data = regressionRepository.getLatestExecutionStatus(noOfRun, testClassName, continent);
		int count = 0;
		for(Regression record: data) {
			if (record.getExecutionStatus().equals("Fail"))
				count++;
		}
		return (noOfRun == count);
        
    }
}
