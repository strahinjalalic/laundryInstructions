import Category from '../models/category';


export const CATEGORIES = [
    new Category('c1', 'Masine za perenje vesa', require("../assets/images/masina.jpg")),
    new Category('c2', 'Masine za susenje vesa', require("../assets/images/masina2.jpg")),
    new Category('c3', 'Masina za pranje sudova', require("../assets/images/sudovi.jpg")),
    new Category('c4', 'Samostalni frizideri', require("../assets/images/frizider.jpg")),
];
