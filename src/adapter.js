class Adapter{
  static getUsers(){
    return fetch('http://localhost:3000/api/v1/users').then(resp => resp.json())
  }

  static getNotes(){
    return fetch('http://localhost:3000/api/v1/notes').then(resp => resp.json())
  }

  static updateNote(noteToUpdate){
    return fetch(`http://localhost:3000/api/v1/notes/${noteToUpdate.id}`,{
      method: 'PATCH',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({body: noteToUpdate.cleanBody, title: noteToUpdate.title})
    }).then(resp => resp.json())
  }

  static deleteNote(noteToDelete){
    return fetch(`http://localhost:3000/api/v1/notes/${noteToDelete.id}`,{
      method: 'DELETE',
      headers: {"Content-Type": "application/json"}
    }).then(resp => resp.json())
  }

  static createNote(noteToCreate){
    return fetch(`http://localhost:3000/api/v1/notes`,{
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({body: noteToCreate.body, title: noteToCreate.title})
    }).then(resp => resp.json())
  }
}
