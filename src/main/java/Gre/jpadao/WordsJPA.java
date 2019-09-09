package Gre.jpadao;

import Gre.Entities.Words;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface WordsJPA extends JpaRepository<Words,String> {
}
