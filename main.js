const form = document.getElementById('my-form');
const submit = form.addEventListener('submit', function userDetails(event){
    event.preventDefault();
    const name = event.target.username.value;
    const email = event.target.email.value;
    const number = event.target.number.value;
    const obj = {
        name,
        email,
        number
    };
    axios.post("http://localhost:3000/user/add-user", obj)
    .then((response) => {
        console.log(response);
        showUser(response.data.newUserDetail);
    })
    .catch((err) => {
        document.body.innerHTML = document.body.innerHTML + "<h4>Something went wrong</h4>";
        console.log(err);
    })
});

function showUser(userDetails){
    const userId = userDetails.id;
    let parent = document.getElementById('userdetails');
    let child = document.createElement('li');
    let btn1 = document.createElement('button');
    btn1.textContent = "Delete";
    btn1.addEventListener('click', async () => {
        try {
            axios.delete(`http://localhost:3000/user/delete-user/${userId}`);
            parent.removeChild(child);
        } catch (err) {
            console.log(err);

        }

    })
    let btn2 = document.createElement('button');
    btn2.textContent = "Edit";

    child.textContent = `${userDetails.username} -- ${userDetails.email} `;
    child.appendChild(btn1);
    child.appendChild(btn2);
    parent.appendChild(child);
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("http://localhost:3000/user/get-user")
    .then((res) => {
        for (var i = 0; i < res.data.length; i++) {
                    showUser(res.data[i]);
                }

    })
    .catch((err) => {
        console.log(err);
    })
});