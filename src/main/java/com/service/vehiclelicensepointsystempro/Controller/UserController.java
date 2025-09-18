package com.service.vehiclelicensepointsystempro.Controller;

import com.service.vehiclelicensepointsystempro.Dto.*;
import com.service.vehiclelicensepointsystempro.Service.OfficerService;
import com.service.vehiclelicensepointsystempro.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:63342")  // allow frontend origin
@RequestMapping("/api/v1/user")
@RestController
@RequiredArgsConstructor
public class UserController {

private final UserService userService;
private final OfficerService officerService;


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

    @PutMapping("changePass")
    public ResponseEntity<ApiResponse> changePassword(@RequestBody ChangePassDto changePassDto){
        return userService.changePassword(changePassDto);

    }

    @GetMapping("getAdmins")
    public List<AdminDto> getAllAdmins(){
        return  userService.getAllAdmins();
    }

    @GetMapping("getOfficer")
    public List<AdminDto> getAllOfficers(){
        return  userService.getAllOfficers();
    }

    @PutMapping("addAdmins")
    public ResponseEntity<ApiResponse> addAdmin(@RequestBody OfficerDto officerDto){
        System.out.println("checking addAdmin Api "+userService.addAdmin(officerDto));
        return userService.addAdmin(officerDto);

    }


}
