package com.service.vehiclelicensepointsystempro.Service.Impl;

import com.service.vehiclelicensepointsystempro.Dto.TrainingDto;
import com.service.vehiclelicensepointsystempro.Entity.Driver;
import com.service.vehiclelicensepointsystempro.Entity.SuspendLic;
import com.service.vehiclelicensepointsystempro.Entity.Training;
import com.service.vehiclelicensepointsystempro.Repo.DriverRepository;
import com.service.vehiclelicensepointsystempro.Repo.SuspendLicRepository;
import com.service.vehiclelicensepointsystempro.Repo.TrainingRepository;
import com.service.vehiclelicensepointsystempro.Service.SuspendService;
import com.service.vehiclelicensepointsystempro.Service.TrainingService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class TrainingServiceImpl implements TrainingService {


    private final TrainingRepository trainingRepository;
    private final DriverRepository driverRepository;
    private final SuspendLicRepository suspendLicRepository;
    private final SuspendService suspendService;
    private final ModelMapper modelMapper;

    @Override
    public Training assignDriverToTraining(TrainingDto dto) {
        Driver driver = driverRepository.findById(dto.getDriverId())
                .orElseThrow(() -> new RuntimeException("Driver not found"));
        SuspendLic suspendLic = suspendLicRepository.findByDriver(driver)
                .orElseThrow(() -> new RuntimeException("Driver not found"));


        Training training = Training.builder()
                .driver(driver)
                .name(dto.getName())
                .duration(LocalDate.parse(suspendLic.getTimeDuration()))
                .suspendedPoint(driver.getTotalPoint())
                .TrainingStartDate(LocalDate.now())
                .build();

        return trainingRepository.save(training);
    }

    @Override
    public Page<TrainingDto> getAllTraining(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("courseId").ascending());
        Page<Training> trainingPage = trainingRepository.findAll(pageable);

        return trainingPage.map(training -> {
            TrainingDto dto = modelMapper.map(training, TrainingDto.class);
            if (training.getDriver() != null) {
                dto.setDriverId(training.getDriver().getDrivingLicNum());
                dto.setDuration(training.getTrainingStartDate());
            }
            return dto;
        });
    }

    @Override
    @Transactional
    public void deleteTrainingById(String id){
        Driver driver = driverRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Driver not found"));

         Training training = (Training) trainingRepository.findByDriver(driver)
                .orElseThrow(() -> new RuntimeException("Driver not found"));
        System.out.println(training.getDriver().getDrivingLicNum());

        trainingRepository.delete(training);

        driver.setTotalPoint(0);
        driverRepository.save(driver);

        suspendService.deleteSuspendLic(driver.getDrivingLicNum());

    }



}
