package Gre.Controller;

import Gre.Entities.Words;
import Gre.jpadao.WordsJPA;
import Gre.service.ServiceGRE;
import Gre.util.populateDB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class GREController {

    @Autowired
    ServiceGRE serviceGRE;
    @Autowired
    populateDB populateDB;
    @RequestMapping("/")
    public String home() {

        try {
            populateDB.fill();
        }catch(Exception e){e.printStackTrace();}

        return "Welcome";
    }

    @GetMapping("/words")
    @CrossOrigin(origins = {"http://localhost:3000","http://172.16.18.150:3000","http://:172.16.18.60:3000"})
    public List<Words> wordsList(){
return serviceGRE.getWords();
    }
}