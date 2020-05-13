package CRUD.dao;

import CRUD.model.User;

import java.util.List;

public interface UserDAO {

    List<User> getAll() ;

    void delete(User user) ;

    void add(User user) ;

    void update(User user) ;

    User getbyID(int id) ;

    User findByUsername(String username) ;
}
