package ru.kata.spring.boot_security.demo.controller;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.services.RolesService;
import ru.kata.spring.boot_security.demo.services.UserService;

import java.security.Principal;
import java.util.List;

@Controller
@RequestMapping("/")
public class UsersController {
    private final UserService userService;
    private final RolesService rolesService;

    public UsersController(UserService userService, RolesService rolesService) {
        this.userService = userService;
        this.rolesService = rolesService;
    }

    @GetMapping("/login")
    public String loginByEmail() {
        return "login";
    }

    @GetMapping("/user")
    public String sayHello(Principal principal, Model model) {
        String userName = principal.getName();
        User user = userService.getUserByName(userName);
        model.addAttribute("user", user);
        return "user";
    }

    @GetMapping("/admin")
    public String showUser(Principal principal, Model model) {
        String userName = principal.getName();
        User user1 = userService.getUserByName(userName);
        model.addAttribute("user1", user1);
        model.addAttribute("roles", rolesService.listRoles());
        List<User> user = userService.listUsers();
        model.addAttribute("users", user);
        return "users";
    }
}
