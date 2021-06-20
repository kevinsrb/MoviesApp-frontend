export class Movie {
    constructor(_id = "", name = "", director = "", clasification = "") {
        this._id = _id;
        this.name = name;
        this.director = director;
        this.clasification = clasification;

      }
    
      _id: string;
      name: string;
      director: string;
      clasification: string;
}