package Gre.Controller;

import Gre.Entities.Words;
import Gre.jpadao.WordsJPA;
import Gre.service.ServiceGRE;
import Gre.util.populateDB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
public class GREController {

    @Autowired
    ServiceGRE serviceGRE;
    @Autowired
    populateDB populateDB;
    @RequestMapping("/")
    public String home() {

        return "Welcome";
    }

    @GetMapping("/words")
    @CrossOrigin(origins = {"http://localhost:3000","http://172.16.18.150:3000","http://:172.16.18.60:3000"})
    public List<Words> wordsList(){
return serviceGRE.getWords();
    }


    @GetMapping("/{userId}")
    @CrossOrigin(origins = {"http://localhost:3000"})
    public List<Words> getUserWords(@PathVariable int userId){
        return serviceGRE.getWordsById(userId);
    }

    @GetMapping("verify/{username}/{password}")
    @CrossOrigin(origins = {"http://localhost:3000"})
    public boolean verify(@PathVariable String username,@PathVariable String password){
        return serviceGRE.verify(username,password);
    }
}