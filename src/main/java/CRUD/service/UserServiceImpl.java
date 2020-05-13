package CRUD.service;

import CRUD.dao.UserDAO;
import CRUD.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    
    private final UserDAO userDao;

    @Autowired
    public UserServiceImpl(UserDAO userDAO) {
        userDao = userDAO;
    }


    public List<User> getAll() {
        return userDao.getAll();
    }


    public void delete(User user) {
        userDao.delete(user);
    }


    public void add(User user) {
        userDao.add(user);
    }


    public void update(User user) {
        userDao.update(user);
    }

    public User getbyID(int id) {
        return userDao.getbyID(id);
    }


    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User byLogin = userDao.findByUsername(s);
        String s1 = byLogin.getRoles().toString();
        System.out.println(s1);


        if (byLogin == null) {
            throw new UsernameNotFoundException("User " + s + " was not found in the database");
        }

        return byLogin;
    }
}
