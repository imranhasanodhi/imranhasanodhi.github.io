
const names = document.querySelectorAll('#name');
const usernames = document.querySelectorAll('#username');
const emails = document.querySelectorAll('#email');
const imgs = document.querySelectorAll('#img');

//API URL to fetch user data.
let userUrl = "https://jsonplaceholder.typicode.com/users";

const getData = async () => {
    // Fetch data from the user API and wait for the response.
    let response = await fetch(userUrl);
    
    // Parse the JSON data from the response into a JavaScript object.
    let users = await response.json();
    

    for (let i = 0; i < 10; i++) {
        names[i].innerHTML = users[i].name;
        usernames[i].innerHTML = users[i].username;
        emails[i].innerHTML = users[i].email;

        // Generate a unique URL for a robot avatar based on the user's index.
        let robUrl = `https://robohash.org/${i}`;
        
        // Set the src attribute of the 'img' elements.
        imgs[i].src = robUrl;
    }
}
getData();
