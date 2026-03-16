"use strict"

// costruttore di movie
function Movie(title, genre, duration){
    this.title = title;
    this.genre = genre;
    this.duration = duration;
    // this.isLong = () => { return this.duration > 120}; // metodo
    this.isLong = () => this.duration > 120;  // si può scrivere così
}

const avatar = new Movie("Avatar", "Sci-fi", 180);
console.log(avatar);
console.log(avatar.isLong());       // true

/*
// Costruttore di classe
class Movie {
    constructor(title, genre, duration) {
        this.title = title;
        this.genre = genre;
        this.duration = duration;
        // this.isLong = () => { return this.duration > 120}; // metodo
        this.isLong = () => this.duration > 120; // si può scrivere così
    }
}
*/