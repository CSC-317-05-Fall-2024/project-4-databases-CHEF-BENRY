document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('.delete-button');

    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const restaurantId = button.getAttribute('data-id');

            fetch(`/api/restaurants/${restaurantId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Deleted restaurant:', data);
                // Optionally remove the restaurant from the UI
                const restaurantCard = button.closest('.restaurants-card');
                restaurantCard.remove();
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    });
});
