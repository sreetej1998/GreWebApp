package Gre.Entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

//@JsonIgnoreProperties
@Entity
@Table(name="words")
public class Words {
    public String getWord() {
        return word;
    }

    public void setWord(String word) {
        this.word = word;
    }

    public String getMeaning() {
        return meaning;
    }

    public void setMeaning(String meaning) {
        this.meaning = meaning;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }


    @Column(name="word")
    private String word;
    @Id
    @Column
    private String id;
    @Column(name="meaning")
    private String meaning;

    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(
            name="status",
            joinColumns = { @JoinColumn(name = "word_id") },
            inverseJoinColumns = { @JoinColumn(name ="user_id" )}
    )
    List<User> userSets;


}
