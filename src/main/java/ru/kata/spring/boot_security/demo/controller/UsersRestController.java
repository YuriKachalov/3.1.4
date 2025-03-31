package ru.kata.spring.boot_security.demo.controller;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.services.RolesService;
import ru.kata.spring.boot_security.demo.services.UserService;

import java.security.Principal;
import java.util.*;

@RestController
@RequestMapping("/api")
public class UsersRestController {
    private final UserService userService;
    private final RolesService rolesService;

    @Value("${server.url}")
    private String serverUrl;

    @GetMapping("/config")
    public String getServerUrl() {
        return serverUrl;
    }

    public UsersRestController(UserService userService, RolesService rolesService) {
        this.userService = userService;
        this.rolesService = rolesService;
    }

    @GetMapping("/user")
    public ResponseEntity<User> getUser(Principal principal) {
        String userName = principal.getName();
        User user = userService.getUserByName(userName);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/admin")
    public ResponseEntity<List<User>> showUser() {
        List<User> users = userService.listUsers();
        return ResponseEntity.ok(users);
    }

    @PutMapping("/admin-edit")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        Set<Role> roleList = new HashSet<>();

        for (Role selectedRole : user.getRoleSet()) {
            Role existingRole = rolesService.findByRole(selectedRole.getRole());
            if (existingRole != null) {
                roleList.add(existingRole);
            }
        }
        user.setRoleSet(roleList);
        userService.saveUser(user, new ArrayList<>(roleList));
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/admin-delete")
    public ResponseEntity<HttpStatus> deleteUser(@RequestBody Map<String, Integer> request) {
        int id = request.get("id");
        userService.deleteUser(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PostMapping("/admin-update")
    public ResponseEntity<User> addNewUser(@RequestBody User user) {
        Set<Role> roleList = new HashSet<>();

        for (Role selectedRole : user.getRoleSet()) {
            Role existingRole = rolesService.findByRole(selectedRole.getRole());
            if (existingRole != null) {
                roleList.add(existingRole);
            }
        }
        user.setRoleSet(roleList);
        userService.saveUser(user, new ArrayList<>(roleList));
        return ResponseEntity.ok(user);
    }

    @GetMapping("/roles")
    public List<Role> getAllRoles() {
        return rolesService.listRoles();
    }
}
