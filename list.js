function clearList() {
    const userList = document.getElementById('user_list');
    while (userList.firstChild) {
        userList.removeChild(userList.firstChild);
    }
}

function appendUser(users) {
    users.forEach(function (user) {
        const li = document.createElement('li');
        li.innerHTML = `${user.name} ${user.age}`;
        li.setAttribute('data-id', user.id);
        //create button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function () {
            deleteUserById(user.id);
        });
        li.appendChild(deleteButton);
        document.getElementById('user_list').appendChild(li);
    });
}

function getList() {
    console.log('getList is fired');
    const url='http://localhost:8000/api/users';
    axios.get(url)
    .then (function(res) {
        console.log('Success:', res);
        const users = res.data.data;
        clearList();
        appendUser(users);
    })
    .catch (function(err) {
        console.log('Error fetching user list:', error);
    });
}

function postUser() {
    console.log('postUser is fired');
    const url = 'http://localhost:8000/api/users';
    const name = document.getElementById('username').value;
    const age = document.getElementById('age').value;
    console.log(name, age);
    if (!name || !age) return;
    const body = {
            name: name,
            age: age,
        }
    axios.post(url, body)
        .then(function (res) {
            const updatedUsers = res.data.data;
            clearList();
            
     })
        .catch(function (err) {
            console.error('Error adding users:',err)
    })
}
    


function deleteList() {
    console.log('deleteList is fired');
        const url='http://localhost:8000/api/users';
        axios.delete(url)
        .then (function(res) {
            console.log('user list cleared in backend',res);
            getList();
        })
        .catch (function(err) {
            console.log('Error deleting user list:',err);
        });
}

function deleteUserById(userId) {
    console.log('deleteUserById is fired');
    const url = `http://localhost:8000/api/users/${userId}`;
    axios
    .delete(url)
    .then (function(response) {
            console.log('Success:', response);
            getList();
        })
        .catch (function(error) {
            console.log(`Error deleting user with Id ${userId}:`,error);
        });
}