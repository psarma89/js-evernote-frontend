class User{
  constructor(obj){
    this.id = obj.id;
    this.name = obj.name;
    this.notes = obj.notes;
    User.all.push(this);
  }
}

User.all = []
