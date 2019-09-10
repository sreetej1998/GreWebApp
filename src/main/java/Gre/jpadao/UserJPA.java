package Gre.jpadao;

import Gre.Entities.User;
import Gre.Entities.Words;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface UserJPA extends JpaRepository<User,Integer> {

}
