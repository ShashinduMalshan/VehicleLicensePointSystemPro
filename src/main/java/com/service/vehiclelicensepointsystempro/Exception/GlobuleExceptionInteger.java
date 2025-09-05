package com.service.vehiclelicensepointsystempro.Exception;

import com.service.vehiclelicensepointsystempro.Dto.ApiResponse;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobuleExceptionInteger {

    @ExceptionHandler(UsernameNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ApiResponse handleUsernameNotFoundException(UsernameNotFoundException e) {
        return new ApiResponse(
                404,
                "User Not Found",
                null
        );
    }

    @ExceptionHandler(BadCredentialsException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiResponse handleBadCredentialsException(BadCredentialsException e) {
        return new ApiResponse(
                400,
                "Bad Credentials",
                null
        );
    }


    @ExceptionHandler(ExpiredJwtException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ApiResponse handleExpiredJwtException(ExpiredJwtException e) {
        return new ApiResponse(
                401,
                "Unauthorized",
                null
        );
    }


    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ApiResponse handleRuntimeException(RuntimeException e) {
        return new ApiResponse(
                500,
                "Internal Server Error",
                null
        );
    }





}
