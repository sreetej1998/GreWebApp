package Gre.service;

import Gre.Entities.User;
import Gre.Entities.Words;
import Gre.jpadao.UserJPA;
import Gre.jpadao.WordsJPA;
import Gre.util.Learnt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

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
        }
        return false;
    }

    public void saveWord(Words word){
        wordsJPA.save(word);
    }

    public List<Words> getLearntWords(String username){
        List<User> users=userJPA.findAll();
        for(User user:users){
            if(user.getUsername().equals(username)){
                return user.getWordsSet();
            }
        }
        return new ArrayList();
    }

    public String putLearntWords(Learnt learnt){
        User user=getUser(learnt.getUsername());
        Words word=getWord(learnt.getWord());
        //insertion code for status
        List<Words> words=user.getWordsSet();
        if(!words.contains(word)) words.add(word);
        userJPA.save(user);
        return "added";
    }

    public String removeLearntWords(Learnt learnt){
        User user=getUser(learnt.getUsername());
        Words word=getWord(learnt.getWord());
        //deletion code for status
        List<Words> words=user.getWordsSet();
        words.remove(word);
        userJPA.save(user);
        return "deleted";


    }

    public User getUser(String username){
        List<User> users=userJPA.findAll();
        for(User user:users){
            if(username.equals(user.getUsername()))
                return user;
        }
        return null;
    }

    public Words getWord(String word){
        List<Words> words=wordsJPA.findAll();
        for(Words words1:words){
            if (words1.getWord().equals(word)) {
                return words1;
            }}
        return null;
    }
}
