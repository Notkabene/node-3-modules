const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')
const notesPath = path.join(__dirname, 'db.json')

async function addNote(title) {
  const notes = await getNotes()
  const note = {
    title,
    id: Date.now().toString()
  }

  notes.push(note)

  await fs.writeFile(notesPath, JSON.stringify(notes))

  console.log(chalk.bgGreen('Note was add'))
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, {encoding: 'utf-8'})
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function removeNote(id) {
  const notes = await getNotes()
  const newNotes = notes.filter(note => note.id !== id)
  await fs.writeFile(notesPath, JSON.stringify(newNotes))
  console.log(chalk.red('You removed Notes with id', id))
}

async function updateNote(id, newTitle) {
  const notes = await getNotes()
  const newNotes = notes.map(note => {
    if (note.id === id) {
      note.title = newTitle
      return note
    }
    return note
  })
  await fs.writeFile(notesPath, JSON.stringify(newNotes))
  console.log(chalk.yellow('You updated title Note. New title:', newTitle))
}

async function printNotesList() {
  const notes = await getNotes()
  console.log(chalk.bgBlue('Here is the list of notes:'))
  notes.forEach(note => {
    console.log('title', chalk.blue(note.title), 'id', chalk.yellow(note.id))
  })
}

module.exports = {
  addNote, printNotesList, removeNote, updateNote
}