// Adapter.getUsers().then(userData => {
//   userData.forEach(user => {
//     new User(user)
//   })
// })

document.addEventListener('DOMContentLoaded', () => {
  const noteUl = document.querySelector('ul.list-group');
  const noteDetailDiv = document.querySelector('div#list-details');
  const noteListDiv = document.querySelector('div#note-list')
  const noteSearchInput =  document.querySelector('input#note-search-input')

  // Adapter.getUsers().then(userData => {
  //   userData.forEach(user => {
  //     const newUser = new User(user)
  //     const ulHTML = newUser.notes.map(note => note.sideDisplay()).join("")
  //     noteUl.innerHTML = ulHTML
  //   })
  // })

  Adapter.getNotes().then(noteData => {
    noteData.forEach(note => {
      const newNote = new Note(note)
      const ulHTML = newNote.sideDisplay()
      noteUl.innerHTML += ulHTML
    })
  })

  noteUl.addEventListener('click', (e) => {
    // console.dir(e.target.parentElement.className)
    // console.log(e.target.parentElement.dataset.id)
    if (e.target.parentElement.className === "list-group-item") {
      const clickedNote = Note.all.find(note => note.id === parseInt(e.target.parentElement.dataset.id))
      noteDetailDiv.innerHTML = clickedNote.fullDisplay()
    }
  })

  noteDetailDiv.addEventListener('input', (e) => {
    // console.log(event.target.type === 'textarea')
    if (e.target.type === 'textarea' && e.target.className === "note-area") {
      // console.log(typeof event.target.dataset.id)
      const noteToUpdate = Note.all.find(note => note.id === parseInt(e.target.dataset.id))
      noteToUpdate.cleanBody = e.target.value
      noteToUpdate.sideBody = noteToUpdate.cleanBody.split(" ").slice(0,10).join(" ")+"..."
      // `img[data-id="${targetId}"]`
      const liTag = document.querySelector(`li[data-id="${e.target.dataset.id}"]`)
      liTag.innerHTML = noteToUpdate.sideDisplayUpate()
      setTimeout(Adapter.updateNote(noteToUpdate), 1000)
    }
  })

  noteDetailDiv.addEventListener('click', (e) => {
    // console.log(e.target.innerText)
    // console.log(e.target.dataset.id)
    if (e.target.innerText === 'Delete') {
      // console.log(event.target.value)
      const noteToDelete = Note.all.find(note => note.id === parseInt(e.target.dataset.id))
      Note.all = Note.all.filter(note => note !== noteToDelete)
      setTimeout(Adapter.deleteNote(noteToDelete), 1000)
      const liTag = document.querySelector(`li[data-id="${e.target.dataset.id}"]`)
      liTag.remove()
      noteDetailDiv.innerHTML = ""
    }else if(e.target.innerText === 'Save'){
      const title = document.querySelector('input[name="title"]')
      if (title) {
        const body = document.querySelector('textarea.new-note-area')
        Adapter.createNote({body: body.value, title: title.value}).then(newNote => {
          const noteToAdd = new Note(newNote)
          noteUl.innerHTML += noteToAdd.sideDisplay()
          title.value = ""
          body.value = ""
        })
      }
    }
  })

  noteListDiv.addEventListener('click', (e) => {
    // console.log(e.target.innerText)
    // console.log(e.target.dataset.id)
    if (e.target.innerText === 'Create') {
      // console.log(event.target.innerText)
      // console.log(Note.createForm())
      noteDetailDiv.innerHTML = Note.createForm()
    }
  })

  noteSearchInput.addEventListener("input", e => {
    e.preventDefault()
    const searchTerm = e.target.value.trim()
    if (searchTerm) {
      const notesToDisplay = Note.all.filter(note =>{
        return note.title.includes(searchTerm)
      })
      // console.log(notesToDisplay)
      noteUl.innerHTML = notesToDisplay.map(note => note.sideDisplay()).join("")
    }else {
      const notesToDisplay = Note.all
      noteUl.innerHTML = notesToDisplay.map(note => note.sideDisplay()).join("")
    }
  })

})
