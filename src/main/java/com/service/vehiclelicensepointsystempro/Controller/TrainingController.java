package com.service.vehiclelicensepointsystempro.Controller;

import com.service.vehiclelicensepointsystempro.Dto.TrainingDto;
import com.service.vehiclelicensepointsystempro.Service.TrainingService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/training")
@RequiredArgsConstructor
public class TrainingController {

    private final TrainingService trainingService;

    @PostMapping("/add")
    public ResponseEntity<?> assignTraining(@RequestBody TrainingDto dto) {
        try {
            trainingService.assignDriverToTraining(dto);
            return ResponseEntity.ok("Driver assigned successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/all")
    public Page<TrainingDto> getAllTraining() {
            return trainingService.getAllTraining(0, 5);

    }

    @DeleteMapping("/complete/{trainingId}")
    public ResponseEntity<?> completeTraining(@PathVariable String trainingId) {
        try {
            trainingService.deleteTrainingById(trainingId);
            return ResponseEntity.ok("Training completed successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }


}

