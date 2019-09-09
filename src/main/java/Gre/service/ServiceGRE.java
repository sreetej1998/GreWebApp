package Gre.service;

import Gre.Entities.Words;
import Gre.jpadao.WordsJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceGRE {
    @Autowired
    WordsJPA wordsJPA;
    public List<Words> getWords(){
        return wordsJPA.findAll();
    }

    public void saveWord(Words word){
        wordsJPA.save(word);
    }
}
