package ru.kata.spring.boot_security.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.kata.spring.boot_security.demo.model.Role;

import java.util.List;
import java.util.Optional;

public interface RoleRepositori extends JpaRepository<Role, Integer> {

    List<Role> findAllByIdIn(List<Integer> ids);

    @Query("SELECT r FROM Role r WHERE r.role = :roleName")
    Optional<Role> findByRole(@Param("roleName") String roleName);

}
