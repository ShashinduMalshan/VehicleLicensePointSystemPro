package com.service.vehiclelicensepointsystempro.Controller;

import com.service.vehiclelicensepointsystempro.Dto.ApiResponse;
import com.service.vehiclelicensepointsystempro.Dto.ChangePassDto;
import com.service.vehiclelicensepointsystempro.Dto.LoginRequest;
import com.service.vehiclelicensepointsystempro.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:63342")  // allow frontend origin
@RequestMapping("/api/v1/user")
@RestController
@RequiredArgsConstructor
public class UserController {

private final UserService userService;


    @GetMapping("/hello")
    public void hello(){
        System.out.println("hello");
    }

    @PutMapping("username/{currentUsername}")
//  @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<String> ChangeUserName(@PathVariable String currentUsername , @RequestParam String newUsername){

        return userService.update(currentUsername,newUsername);
    }

    @PostMapping("checkPassword")
    public ResponseEntity<ApiResponse> checkPassword(@RequestBody LoginRequest loginRequest){

        return userService.checkPassword(loginRequest.getUsername(), loginRequest.getPassword());

    }

    @PostMapping("changePassword")
    public ResponseEntity<ApiResponse> changePassword(@RequestBody ChangePassDto changePassDto){

        return userService.changePassword(changePassDto);

    }



}
