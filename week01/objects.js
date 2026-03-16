"use strict";

// oggetto
const movie = {
  title: "Avatar",
  genre: "Sci-fi",
  duration: 180
}

console.log(movie);
console.log(`L'unico film di questo programma è: ${movie.title}`);

// construttore
function Movie(title, genre, duration) {
  this.title = title;
  this.genre = genre;
  this.duration = duration;
  this.isLong = () => this.duration > 120; // metodo
}

const avatar = new Movie("Avatar", "Sci-fi", 180);
console.log(avatar);
console.log(avatar.isLong());