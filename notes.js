// console.log('Starting notes.js');

const fs = require('fs');

var fetchNotes = () =>{
	try{
		var notesString = fs.readFileSync('notes-data.json');
		return JSON.parse(notesString);
	} catch (e){
		return [];
	}

};

var saveNotes = (notes) =>{
	fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) =>{
	var notes = fetchNotes();
	var note = {
		title,
		body
	};

	var duplicateNotes = notes.filter((note) =>{
		return note.title === title
	});
	if(duplicateNotes.length === 0){
		notes.push(note);
		saveNotes(notes);
		return note;
	}
};
var getAll = () =>{
	// console.log('Listing Notes');
	return fetchNotes();
};
var getNote = (title) =>{
	// console.log('Reading Note ', title);
	var note = fetchNotes();
	var filterNotes = note.filter((note) => note.title === title);
	return filterNotes[0];
};
var removeNote = (title) =>{
//fetcht notes
var notes = fetchNotes();
// filter notes, removing the one with title of argument
var filterNotes = notes.filter((note) => note.title !== title);
// save new notes array
saveNotes(filterNotes);

return notes.length !== filterNotes.length;
};

var logNote = (note) =>{
	console.log('---');
	console.log(`Title: ${note.title}`);
	console.log(`Body: ${note.body}`);
};

module.exports = {
	addNote,
	getAll,
	getNote,
	removeNote,
	logNote
};










//console.log(module);
//module.exports.age = 30;  

//arrow functions  new era function  remove function keyword and replace it with a =>
//regular es5 function(){}
// module.exports.addNote = () => {
// 	console.log('addNote');
// 	return 'New Note';
// }

// module.exports.add_mumber = (a, b) => {
// 	var sum = a + b;
// 	return sum;
// }