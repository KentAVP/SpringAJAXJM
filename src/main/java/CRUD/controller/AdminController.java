package CRUD.controller;

import CRUD.model.Role;
import CRUD.model.User;
import CRUD.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;


@RestController
@RequestMapping("/admin/*")
public class AdminController {
    @Autowired
    private UserService userService;

     @GetMapping("list")
    public ResponseEntity<List<User>> getCompanyList() {
        return new ResponseEntity<List<User>>(userService.getAll(),HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCompany(@PathVariable Integer id) {
        User us = userService.getbyID(id);
         userService.delete(us);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    @PostMapping("/save")
    public ResponseEntity<Void> saveOrUpdateCompany(@RequestBody User user) {
        userService.add(user);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getCompany(@PathVariable Integer id) {
        return new ResponseEntity<User>(userService.getbyID(id), HttpStatus.OK);
    }

    @GetMapping("auth")
    public ResponseEntity getAuth() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return new ResponseEntity(auth.getName().toString(),HttpStatus.OK);
    }

    @GetMapping("authRole")
    public ResponseEntity getRole() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User us = (User) userService.loadUserByUsername(auth.getName());
        return new ResponseEntity(us.getRoles().toString(),HttpStatus.OK);
    }

}
