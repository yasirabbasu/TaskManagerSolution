$(document).ready(function () {
  $('.task-toggle').on('change', function () {
    const taskId = $(this).data('task-id');
    const isChecked = $(this).is(':checked');

    $.ajax({
      url: `/api/tasks/${taskId}/status`,
      method: 'PATCH',
      contentType: 'application/json',
      data: JSON.stringify({ isCompleted: isChecked }),
      success: () => {
        $(this).closest('.task-item').toggleClass('completed', isChecked);
      },
      error: () => {
        alert('Failed to update task status.');
        $(this).prop('checked', !isChecked); // Revert if failed
      }
    });
  });
});
