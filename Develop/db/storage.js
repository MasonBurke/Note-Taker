const util = require("util")
const fs = require("fs")

const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)
var id = 0


class Storage {
    read(){
        return readFileAsync("db/db.json", "utf8")
    }
    write(note){
        return writeFileAsync("db/db.json", JSON.stringify(note))
    }
    get(){
        return this.read().then(notes => {
            let parseNotes;
            try {
                parseNotes = [].concat(JSON.parse(notes))
            }
            catch (err){
                parseNotes = []
            }
            return parseNotes
        })
    }
    addNote(note){
        const {title, text} = note
        if( !title || !text ){
            throw new Error("title and text cannot be blank")
        } 
        const newNote = {title, text, id:id}

        return this.get().then(notes => {
            [...notes, newNote]

        }).then(updatedNotes => {
            this.write(updatedNotes)
        }).then(() => newNote)
    }
    removeNote(id){
        return this.get().then( notes => {
            notes.filter(note => note.id !== id)
        }).then(filteredNotes => this.write(filteredNotes))
    }
}

module.exports = new Storage()