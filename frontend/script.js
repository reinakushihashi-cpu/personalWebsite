const API = "http://localhost:8000"; // change to your deployed backend

// ---------------- Info Section ----------------
const myInfo = {
  bio: "Hi! I'm Reina, a software engineer and data enthusiast based in California. I love building web apps and exploring AI technologies.",
  skills: ["Python", "JavaScript", "FastAPI", "React", "Data Science"],
  interests: ["Web Development", "AI", "Open Source", "Tech Education"]
};

function renderInfo() {
  const container = document.getElementById("info");
  container.innerHTML = `
    <p>${myInfo.bio}</p>
    <p><strong>Skills:</strong> ${myInfo.skills.join(", ")}</p>
    <p><strong>Interests:</strong> ${myInfo.interests.join(", ")}</p>
  `;
}

renderInfo();


// Load projects on page load
async function loadProjects() {
  const container = document.getElementById("projects");
  container.innerHTML = "Loading...";

  try {
    const res = await fetch(`${API}/api/projects`);
    const projects = await res.json();

    if (projects.length === 0) {
      container.innerHTML = "<p>No projects yet.</p>";
      return;
    }

    container.innerHTML = projects
      .map(
        (p) => `
        <div class="project-card">
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          ${p.link ? `<a href="${p.link}" target="_blank">View</a>` : ""}
        </div>
      `
      )
      .join("");
  } catch (err) {
    container.innerHTML = "<p>Failed to load projects.</p>";
  }
} -->

loadProjects();

// Handle contact form
const form = document.getElementById("contact-form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  const status = document.getElementById("status");

  status.textContent = "Sending...";

  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("message", message);

  try {
    const res = await fetch(`${API}/api/contact`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error();

    status.textContent = "Message sent!";
    form.reset();
  } catch (err) {
    status.textContent = "Failed to send. Try again later.";
  }


}

);