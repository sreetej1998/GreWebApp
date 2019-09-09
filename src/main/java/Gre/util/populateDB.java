package Gre.util;

import Gre.Entities.Words;
import Gre.jpadao.WordsJPA;
import Gre.service.ServiceGRE;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.util.List;
@Component
public class populateDB {
    @Autowired
    ServiceGRE serviceGRE;

    public void  fill() throws Exception {

ObjectMapper mapper= new ObjectMapper();
        Words[] words=mapper.readValue(
            new File("/home/user/Desktop/greApp/src/main/java/Gre/util/data.json")
            ,Words[].class);

        System.out.println(serviceGRE);
        for(Words word:words){
            serviceGRE.saveWord(word);
        }

    }


}

