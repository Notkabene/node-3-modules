const yargs = require('yargs')
const {addNote, printNotesList, removeNote} = require('./notes.controller')

yargs.command({
  command: 'add',
  describe: 'Add new note to list',
  builder: {
    title: {
      type: 'string',
      describe: 'Note title',
      demandOption: true
    }
  },
  handler({title}) {
    addNote(title)
  }
})

yargs.command({
  command: 'list',
  describe: 'Print All notes',
  async handler() {
    printNotesList()
  }
})

yargs.command({
  command: 'remove',
  describe: 'Remove note by id',
  builder: {
    id: {
      type: 'string',
      describe: 'Note id',
      demandOption: true
    }
  },
  async handler({id}) {
    removeNote(id)
  }
})

yargs.parse()