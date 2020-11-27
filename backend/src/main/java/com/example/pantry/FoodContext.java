package com.example.pantry;

public class FoodContext{
    public Item item;
    public User user;

    public void setItem(Item item) {

        this.item = item;
    }

    public void setUser(User user) {

        this.user = user;
    }

    public Item getItem() {

        return item;
    }

    public User getUser() {

        return user;
    }

}
