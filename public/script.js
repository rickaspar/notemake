const myId = "";

const renderNotes = (data) => {
  const notesListEl = document.querySelector(".note-list");
  while (notesListEl.hasChildNodes()) {
  notesListEl.removeChild(notesListEl.firstChild);
  }

  data.forEach((note) => {
    const { age, height, name, id } = note;

    const noteEl = document.createElement("div");
    const noteSentence = document.createElement("p");
    const noteId = document.createElement("button");
    noteEl.className = "note-item";
    noteSentence.className= "note-sentence"
    noteId.className = "note-id";
    noteEl.id = id;
    noteId.id = id+"-i"
    noteSentence.id = id+"-p";
    noteId.textContent= `Select this record`;
    noteSentence.textContent = `${name} is ${height}cm and ${age} years old`;
    noteEl.appendChild(noteId);
    noteEl.appendChild(noteSentence);
    notesListEl.appendChild(noteEl);
    document.getElementById(id+"-i").addEventListener("click", function(){
      document.getElementById(id+"-i").innerText = "selected";
      document.getElementById("note-id").innerHTML = id;
      document.getElementById("note-name").value = name;
      document.getElementById("note-age").value = age;
      document.getElementById("note-height").value= height;
    });
  });
};

document.getElementById("crud-read").addEventListener("click", function () {
  fetch("http://localhost:3001/data")
    .then((response) => response.json())
    .then((data) => renderNotes(data))
    .catch((err) => console.error(err));
});


// for new note 
//const newData = document.getElementById("input-data").innerHTML; 


document.getElementById('crud-create').addEventListener("click", function(){
  //document.getElementById("myId").innerHTML = "pressed";

  fetch("http://localhost:3001/data", {
    method: "POST",
    body: JSON.stringify({
      name: document.getElementById("note-name").value,
      age : document.getElementById("note-age").value,
      height: document.getElementById("note-height").value
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then((response) =>{
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse the JSON response
  })
  .then(data => {
    console.log('Response:', data);
  })
    .then(fetch("http://localhost:3001/data")
    .then((response) => response.json())
    .then((data) => renderNotes(data))
    .catch((err) => console.error(err)))

  .catch(error => {
    console.error('There was a problem with your fetch operation:', error);
  })
  .then((json) => console.log(json));
});

document.getElementById("crud-update").addEventListener("click", function(){
  //the data to update
  const id_update = document.getElementById("note-id").innerHTML;
const updateData = {
  
  id: document.getElementById("note-id").innerHTML ,
  name: document.getElementById("note-name").value,
  age: document.getElementById("note-age").value,
  height: document.getElementById("note-height").value
};

// Convert the data to JSON format
const jsonData = JSON.stringify(updateData);

// Define the URL of the server endpoint
const url = 'http://localhost:3001/data/'+id_update; // 

// Configure the fetch options
const options = {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: jsonData
};

// Make the PUT request using the fetch API
fetch(url,  {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: jsonData
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse the JSON response
  })

  .then(data => {
    console.log('Resource updated successfully:', data);
  })
    .then(fetch("http://localhost:3001/data")
    .then((response) => response.json())
    .then((data) => renderNotes(data))
    .catch((err) => console.error(err)))
  .catch(error => {
    console.error('There was a problem with your fetch operation:', error);
  });

} );




document.getElementById("crud-delete").addEventListener("click", function(){

record_id = document.getElementById("note-id").innerHTML;  

    // URL of the resource to be deleted
const url = 'http://localhost:3001/data/'+record_id;

// Configuration object for the fetch request
const options = {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json', // Specify the content type if necessary
    // Additional headers can be included as needed, such as authentication tokens
  },
};

// Send the DELETE request using fetch
fetch(url, options)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    console.log('Resource deleted successfully');
     // remove the element from the list
  })
  .then(fetch("http://localhost:3001/data")
    .then((response) => response.json())
    .then((data) => renderNotes(data))
    .catch((err) => console.error(err)))
    
  .catch(error => {
    console.error('There was a problem with the DELETE request:', error.message);
  });

})




