// Template untuk task item
const taskTemplate = (taskName) => `
<div class="task-list">
  <input type="checkbox" class="task-input task-opacity">
  <span class="task-text">${taskName}</span>
  <button class="task-opacity btn-edit btn">
    <svg xmlns="http://www.w3.org/2000/svg" width="47" height="47" viewBox="0 0 24 24">
      <path fill="#744D0F" d="m14.06 9l.94.94L5.92 19H5v-.92zm3.6-6c-.25 0-.51.1-.7.29l-1.83 1.83l3.75 3.75l1.83-1.83c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29m-3.6 3.19L3 17.25V21h3.75L17.81 9.94z"/>
    </svg>
  </button>
  <button class="task-opacity btn-delete btn">
    <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 24 24">
      <path fill="#f00" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"/>
    </svg>
  </button>
</div>`;

// Add Task
$("form").on("submit", function (e) {
  e.preventDefault();
  const taskName = $(".add-task").val().trim();

  // Hide any previous errors
  $(".error-message").hide();

  if (!taskName) {
    // Show inline error message
    $(".error-message").text("Task cannot be empty!").show();
    return;
  }

  $("#no-task").hide();
  $(".add-task").val("");
  $("#task-container").append(taskTemplate(taskName));
});

// Task Event Delegation
$("#task-container")
  .on("change", ".task-input", function () {
    const $task = $(this).closest(".task-list");
    const isChecked = this.checked;

    $task.find(".task-text").toggleClass("checked", isChecked);
    $task.find(".task-opacity").toggleClass("checked-button", isChecked);
    $task.find(".btn-edit").prop("disabled", isChecked);
  })
  .on("click", ".btn-edit:not([disabled])", function () {
    const $taskItem = $(this).closest(".task-list");
    const $text = $taskItem.find(".task-text");
    const oldText = $text.text();

    // Ganti text dengan input field
    const $input = $(
      `<input type="text" class="edit-input" value="${oldText}">`
    );
    $text.replaceWith($input);
    $input.focus();

    // Fungsi untuk menyimpan perubahan
    const saveEdit = () => {
      const newText = $input.val().trim() || oldText;
      $input.replaceWith(`<span class="task-text">${newText}</span>`);
    };

    // Event handlers
    $input
      .on("keydown", function (e) {
        if (e.key === "Enter") saveEdit();
      })
      .on("blur", saveEdit);
  })
  .on("click", ".btn-delete", function () {
    $(this).closest(".task-list").remove();
    if (!$("#task-container").children().length) $("#no-task").show();
  });
