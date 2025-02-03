"use strict"; // enables strict mode and enforces stricter parsing

// Arrow function to validate form inputs
const validateForm = () => {
    const content = document.getElementById("content").value.trim();
    const termsAccepted = document.getElementById("terms").checked;

    // a. check if blog content more than 25 chars
    if (content.length < 25) {
        alert("Blog content should be more than 25 characters");
        return false;
    }

    // b. check if terms are accepted
    if (!termsAccepted) {
        alert("You must agree to the terms and conditions");
        return false;
    }

    return true;
};

// tracking submissions count
const submissionCounter = (() => {
    let count = 0;
    return () => ++count;
})();

// function to handle form submission
document.getElementById("blogPostForm").addEventListener("submit", (event) => {
    event.preventDefault();

    // validate form inputs
    if (!validateForm()) return;

    // extract form data
    const title = document.getElementById("title").value.trim();
    const authorName = document.getElementById("authorName").value.trim();
    const email = document.getElementById("email").value.trim();
    const content = document.getElementById("content").value.trim();
    const category = document.getElementById("category").value.trim();

    // creating a new blog object
    const blog = {
        title,
        authorName,
        email,
        content,
        category,
    };

    // convert form data to JSON string
    const blogJson = JSON.stringify(blog);
    console.log("Blog data to JSON: ", blogJson);

    // convert json string to object
    const blogObj = JSON.parse(blogJson);

    // destructuring title and email from the parsed object
    const { title: blogTitle, email: blogEmail } = blogObj;
    console.log("Blog Title: ", blogTitle);
    console.log("Blog Email: ", blogEmail);

    // Submission date using spread operator
    const submissionDate = { ...blogObj, submissionDate: new Date().toISOString() };
    console.log("Updated blog post with date: ", submissionDate);

    // tracking submissions count
    console.log("Submission Count: ", submissionCounter());

    // add blog to UI
    //addBlogToUI(submissionDate);

    // clear form fields
    document.getElementById("blogPostForm").reset();
});

// function to add blog to UI
/* const addBlogToUI = (blog) => {
    const { title, authorName, category, submissionDate } = blog;

    // new list for blog post
    const blogList = document.createElement("li");
    blogList.textContent = `${title} by ${authorName} [${category}] - Published on ${new Date(submissionDate).toLocaleString()}`;

    // append list item to blog list
    document.getElementById("blogPosts").appendChild(blogList);
}; */