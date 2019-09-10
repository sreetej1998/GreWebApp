package Gre.service;

import Gre.Entities.User;
import Gre.Entities.Words;
import Gre.jpadao.UserJPA;
import Gre.jpadao.WordsJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ServiceGRE {
    @Autowired
    WordsJPA wordsJPA;
    @Autowired
    UserJPA userJPA;
    public List<Words> getWords(){
        return wordsJPA.findAll();
    }

    public List<Words> getWordsById(int userId){
        User user=userJPA.findById(userId).get();
        System.out.println(user);
        return user.getWordsSet();


    }

    public boolean verify(String username,String password){
        List<User> users=userJPA.findAll();
        for(User user:users){
            if(user.getUsername().equals(username) && user.getPassword().equals(password))
                return true;
            System.out.println(username+" "+user.getUsername());
            System.out.println(password+" "+user.getPassword());
        }
        return false;




    }

    public void saveWord(Words word){
        wordsJPA.save(word);
    }
}
