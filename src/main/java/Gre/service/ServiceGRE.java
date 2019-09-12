package Gre.service;

import Gre.Entities.User;
import Gre.Entities.Words;
import Gre.jpadao.UserJPA;
import Gre.jpadao.WordsJPA;
import Gre.util.Learnt;
import Gre.util.Ques;
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

    public List<Ques> generateQuiz(String username){
        User user=getUser(username);
        List<Words> words=user.getWordsSet();
        List<Ques> questions= new ArrayList();
        if(words.size()<10){
            for(Words word:words){
                Ques question= new Ques();
                question.setAnswer(word.getMeaning());
                question.setQuestion(word.getWord());
                question.setOptions(generateRandomWords(3));
                question.getOptions().add(question.getAnswer());
                questions.add(question);
            }
        }
        return questions;
    }

    public List<String> generateRandomWords(int size){
        List<String> options= new ArrayList<>();
        List<Words> words= getWords();
        for(int i=0;i<size;i++){
            int index=(int)Math.floor(Math.random()*100) % words.size();
            String meaning=words.get(index).getMeaning();
            options.add(meaning);
        }
        return options;
    }


}
