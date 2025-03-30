document.addEventListener("DOMContentLoaded", () => {
    const userList = document.getElementById("userList");
    // Fetch users from the API
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())  // Convert response to JSON
        .then(users => {
            users.forEach(user => {
                const listItem = document.createElement("li");
                listItem.textContent = user.name;
                listItem.addEventListener("click", () => {
                    alert(`Email: ${user.email}`);
                });
                userList.appendChild(listItem);
            });
        })
        .catch(error => console.error("Error fetching users:", error));
});
