document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('rest_form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const addressLine1 = document.getElementById('add').value;
        const phone = document.getElementById('num').value;
        const photo = document.getElementById('photo').value;
        fetch('/api/restaurants', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                name: name,
                add: addressLine1,
                num: phone,
                photo: photo,
            }),
        })        
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    })
});
