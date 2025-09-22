package com.service.vehiclelicensepointsystempro.Service;

import com.service.vehiclelicensepointsystempro.Dto.TrainingDto;
import com.service.vehiclelicensepointsystempro.Entity.Training;
import org.springframework.data.domain.Page;

public interface TrainingService {
    Training assignDriverToTraining(TrainingDto dto);
    Page<TrainingDto> getAllTraining(int page, int size);

    void deleteTrainingById(String id);
}
