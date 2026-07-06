export function openTaskPopup(
  titleText: string,
  defaultTitle: string,
  defaultDescription: string,
  onSave: (title: string, description: string) => void
): void {
  const overlay = document.createElement("div");
  overlay.className = "popup-overlay";

  overlay.innerHTML = `
    <div class="popup-box">
      <h2>${titleText}</h2>

      <label>Task Name</label>
      <input id="popup-title" type="text" value="${defaultTitle}" />

      <label>Description</label>
      <textarea id="popup-description">${defaultDescription}</textarea>

      <div class="popup-buttons">
        <button id="popup-cancel">Cancel</button>
        <button id="popup-save">Save</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  const titleInput = overlay.querySelector("#popup-title") as HTMLInputElement;
  const descInput = overlay.querySelector("#popup-description") as HTMLTextAreaElement;
  const cancelButton = overlay.querySelector("#popup-cancel") as HTMLButtonElement;
  const saveButton = overlay.querySelector("#popup-save") as HTMLButtonElement;

  titleInput.focus();

  cancelButton.addEventListener("click", () => {
    overlay.remove();
  });

  saveButton.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const description = descInput.value.trim();

    if (!title) {
      alert("Please enter a task name.");
      return;
    }

    onSave(title, description);
    overlay.remove();
  });
}