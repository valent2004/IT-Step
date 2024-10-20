document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.delete-item').forEach(function (button) {
        button.addEventListener('click', function () {
            const itemId = this.getAttribute('data-id');
            if (confirm("Are you sure you want to delete this item?")) {
                fetch('/MainController/DeleteItem', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('input[name="__RequestVerificationToken"]').value
                    },
                    body: JSON.stringify({ id: itemId })
                })
                    .then(response => {
                        if (response.ok) {
                            // Remove the item from the UI
                            document.getElementById(`item-${itemId}`).remove();
                        } else {
                            alert("Failed to delete item.");
                        }
                    })
                    .catch(error => {
                        console.error("Error deleting item:", error);
                    });
            }
        });
    });
});