document.getElementById("postForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission
    const title = document.getElementById("title").value.trim();
    const body = document.getElementById("body").value.trim();
    // Validate input fields
    if (!title || !body) {
        alert("Both fields are required!");
        return;
    }
    const postData = {
        title,
        body,
        userId: 1  // Placeholder user ID
    };
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        });
        const data = await response.json(); // Parse response
        // Display response dynamically
        document.getElementById("response").innerHTML = `
            <p><strong>Post ID:</strong> ${data.id}</p>
            <p><strong>Title:</strong> ${data.title}</p>
            <p><strong>Body:</strong> ${data.body}</p>
        `;
        // Clear form fields after successful submission
        document.getElementById("postForm").reset();
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("response").innerHTML = `<p style="color: red;">Failed to submit post</p>`;
    }
});
