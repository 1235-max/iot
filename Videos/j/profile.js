
const baseURL = "http://localhost:8000";//base url

async function loadUsers() {
  const res = await fetch(`/users`);
  const users = await res.json();
  const list = document.getElementById("userList");
  list.innerHTML = "";
  //html code is looking for userCounts
  document.getElementById("userCounts").textContent = `Total users: ${users.length}`;
  // why did I give such a weird task
  users.forEach(user => {
    const li = document.createElement("li");
    li.textContent = `${user.username}: ${user.bio}`;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = async () => {
      await fetch(`${baseURL}/users/${user._id}`, { method: "DELETE" });
      loadUsers();
    };

    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}//add display button
const displayBtn = document.createElement("button");
displayBtn.textContent = "Display";
displayBtn.onclick = () => {
  // Display user details
  alert(`User details: ${JSON.stringify(user)}`);
  // Or implement a more sophisticated display mechanism
};
li.appendChild(displayBtn);
document.getElementById("search").addEventListener("input", async (e) => {
  const term = e.target.value.toLowerCase();
  const res = await fetch(`${baseURL}/users`);//baseurl is not declared anywhere in the file ..we will declare it.
  const users = await res.json();
  const list = document.getElementById("userList");
  list.innerHTML = "";

  const filteredUsers = users.filter(user => user.username.toLowerCase().includes(term));
  //the html code is looking for userCounts
  document.getElementById("userCounts").textContent = `Total users: ${filteredUsers.length}`;

  filteredUsers.forEach(user => {
    const li = document.createElement("li");
    li.textContent = `${user.username}: ${user.bio}`;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = async () => {
      //no sense to use PATCH 
      await fetch(`${baseURL}/users/${user._id}`, { method: "DELETE" });

      loadUsers();
    };

    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
});

loadUsers();

document.getElementById("userForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const bio = document.getElementById("bio").value;
  await fetch(`/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, bio })
  });
  e.target.reset();
  loadUsers();
});