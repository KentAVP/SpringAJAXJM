package CRUD.service;

import CRUD.model.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService extends UserDetailsService {

    List<User> getAll();


    void delete(User user);


    void add(User user);


    void update(User user);

    User getbyID(int id);

    UserDetails loadUserByUsername(String s);
}
