let step = 1;
let data = { name: "", email: "", workspace: "" };
let errors = {};

function validate() {
  errors = {};
  if (data.name.trim().length < 3)
    errors.name = "Name must be at least 3 characters.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
    errors.email = "Enter a valid email.";
  if (data.workspace.trim().length < 3)
    errors.workspace = "Workspace must be at least 3 characters.";
}

function render() {
  if (step === 1) {
    document.getElementById("app").innerHTML = `
          <div class="card">
            <h2>Step 1: Your Info</h2>
            <label>Full Name</label>
            <input id="name" value="${data.name}" class="${
      errors.name ? "error" : ""
    }">
            ${errors.name ? `<div class="error-msg">${errors.name}</div>` : ""}
            
            <label>Email Address</label>
            <input id="email" value="${data.email}" class="${
      errors.email ? "error" : ""
    }">
            ${
              errors.email ? `<div class="error-msg">${errors.email}</div>` : ""
            }

            <div class="actions">
              <div></div>
              <button id="next">Next →</button>
            </div>
          </div>
        `;
    document.getElementById("name").oninput = (e) =>
      (data.name = e.target.value);
    document.getElementById("email").oninput = (e) =>
      (data.email = e.target.value);
    document.getElementById("next").onclick = () => {
      step = 2;
      render();
    };
  } else {
    document.getElementById("app").innerHTML = `
          <div class="card">
            <h2>Step 2: Workspace</h2>
            <label>Workspace Name</label>
            <input id="workspace" value="${data.workspace}" class="${
      errors.workspace ? "error" : ""
    }">
            ${
              errors.workspace
                ? `<div class="error-msg">${errors.workspace}</div>`
                : ""
            }

            <div class="actions">
              <button id="submit">Submit</button>
            </div>
          </div>
        `;
    document.getElementById("workspace").oninput = (e) =>
      (data.workspace = e.target.value);
    document.getElementById("submit").onclick = () => {
      validate();
      if (Object.keys(errors).length) {
        step = errors.workspace ? 2 : 1;
        render();
      } else {
        document.getElementById("app").innerHTML = `
  <div class="card" style="text-align:center;">
    <h2>Welcome, ${data.name}!</h2>
    <p>Your workspace "<strong>${data.workspace}</strong>" has been created successfully.</p>
  </div>
`;
        console.log(data);
      }
    };
  }
}
render();