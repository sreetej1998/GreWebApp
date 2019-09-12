package Gre.Controller;
import Gre.Entities.Words;
import Gre.jpadao.WordsJPA;
import Gre.service.ServiceGRE;
import Gre.util.Learnt;
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


    @GetMapping("/{username}")
    @CrossOrigin(origins = {"http://localhost:3000"})
    public List<Words> getUserWords(@PathVariable String username){
        return serviceGRE.getLearntWords(username);
    }

    @GetMapping("verify/{username}/{password}")
    @CrossOrigin(origins = {"http://localhost:3000"})
    public boolean verify(@PathVariable String username,@PathVariable String password){
        return serviceGRE.verify(username,password);
    }

    @PostMapping("/learnt")
    @CrossOrigin(origins = {"http://localhost:3000"})
    public String putLearntWord(@RequestBody Learnt learntWord){
        return serviceGRE.putLearntWords(learntWord);
    }

    @PostMapping("/unlearn")
    @CrossOrigin(origins = {"http://localhost:3000"})
    public String removeLearntWord(@RequestBody Learnt learntWord){
        return serviceGRE.removeLearntWords(learntWord);
    }
}