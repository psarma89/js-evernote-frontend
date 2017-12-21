class Note{
  constructor(obj){
    this.id = obj.id;
    this.title = obj.title
    this.body = obj.body
    this.updatedAt = new Date(Date.parse(obj.updated_at)).toDateString()
    this.cleanBody = obj.body.replace(/(\r\n|\n|\r)/gm,"")
    this.sideBody = this.cleanBody.split(" ").slice(0,10).join(" ") +"..."
    Note.all.push(this)
  }
  sideDisplay(){
    return `<li class="list-group-item" data-id=${this.id}>
    <b>${this.title}</b><br>
    <span style="color:blue">${this.updatedAt}</span> - <span>${this.sideBody}</span><br>
    </li>`
  }

  sideDisplayUpate(){
    return `<b>${this.title}</b><br>
    <span style="color:blue">${this.updatedAt}</span> - <span>${this.sideBody}</span><br>`
  }

  fullDisplay(){
    return `<span style="color:blue"><p class="list-group" data-id=${this.id}><b>${this.title}</b></p></span>
    <textarea data-id=${this.id} class="note-area" rows="10" cols="100">${this.cleanBody}</textarea><br>
    <button type="button" data-id=${this.id}>Delete</button>
    `
  }
  static createForm(){
    return `Title: <input type="text" name="title">
    <button type="button">Save</button>
    <p></p>
    <textarea class = "new-note-area" rows="10" cols="100" name="body" form="note-form"></textarea>
    `
  }
}

Note.all = []
