// console.log('Starting App.js');


// const os = require('os');
const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const notes = require('./notes.js');

const titleOptions = {
		describe: 'Title of Note',
		demand : true,
		alias: 't' 
	}
	const bodyOptions = {
		describe: 'Body of Note',
		demand : true,
		alias: 'b' 
	}

/*const argv = yargs.argv;*/
const argv = yargs
.command('add', 'Add a new note', {
	title: titleOptions,
	body: bodyOptions
})
.command('list', 'List of all Notes')
.command('read', 'Read a note', {
	title: titleOptions	
})
.command('remove', 'Remove a note', {
	title: titleOptions	
})
.help()
.argv;


// var command = process.argv[2];
var command = argv._[0];
// console.log('process ',process.argv);
// console.log('yarg', argv);


if(command === 'add'){
	var note = notes.addNote(argv.title, argv.body);
	if(note){
		console.log('Note Created');
		notes.logNote(note);
	} else {
		console.log('note title taken');
	}
} else if (command === 'list') {
	var allnote = notes.getAll();
	console.log(`printing ${allnote.length} note(s).`);
	allnote.forEach((note) => notes.logNote(note)); 
} else if (command === 'read') {
	var note = notes.getNote(argv.title);
	if(note){
		console.log('Note Found');
		notes.logNote(note);
	} else {
		console.log('Note not found');
	}
} else if (command === 'remove') {
	var noteRemoved = notes.removeNote(argv.title);
	var message = noteRemoved ? 'Note Removed' : 'Note not found';
	console.log(message);
} else {
	console.log('command not recognized');
}












// console.log(_.isString(89));
// console.log(_.uniq(['mike',2, 1, 2]));

// var res = notes.addNote();
// var sum = notes.add_mumber(5, -2);

// console.log('Result: ' + sum);

//var user = os.userInfo();
//console.log(user.username);
//fs.appendFile('greetins.txt', 'Hello '+ user.username, function (err)  {
//fs.appendFile('greetins.txt', ` Hi ${user.username} you are ${notes.age} !`, function (err)  {
//  if (err) throw err;
//  console.log('The "data to append" was appended to file!');
//});

