package Gre.Entities;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="user")
public class User {
    @Id
    @Column(name="user_id")
    int userId;
    @Column(name="username")
    String username;

    public int getUserId() {
        return userId;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public void setWordsSet(List<Words> wordsSet) {
        this.wordsSet = wordsSet;
    }

    public List<Words> getWordsSet() {
        return wordsSet;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", wordsSet=" + wordsSet +
                '}';
    }

    @Column(name="password")
    String password;

    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(
            name="status",
            joinColumns = { @JoinColumn(name = "user_id") },
            inverseJoinColumns = { @JoinColumn(name = "word_id")}
    )
    List<Words> wordsSet;

}
