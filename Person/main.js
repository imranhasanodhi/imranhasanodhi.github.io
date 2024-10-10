const names = document.querySelectorAll('#name')
const usernames = document.querySelectorAll('#username')
const emails = document.querySelectorAll('#email')
const imgs = document.querySelectorAll('#img')


let userUrl = "https://jsonplaceholder.typicode.com/users"



const getData = async () => {
    let response = await fetch(userUrl);
    let users = await response.json();
    for (let i = 0; i < 10; i++) {
        names[i].innerHTML = users[i].name
        usernames[i].innerHTML = users[i].username
        emails[i].innerHTML = users[i].email
        let robUrl = `https://robohash.org/${i}`
        imgs[i].src = robUrl

    }
}


getData()
