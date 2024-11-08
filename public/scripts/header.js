const headerHTML = `
    <div class="container">
        <img class="header_img" src="./images/sanfranguide.jpg">
        <div class="center_text">San Francisco</div>
    </div>
      
    <div class="navbar_container">
        <div class="navbar_elements"><a href="index.html">Home</a></div>
        <div class="navbar_elements"><a href="attractions.html">Attractions</a></div>
        <div class="navbar_elements"><a href=/restaurants>Restaurants</a></div>
        <div class="navbar_elements"><a href=/newPage>Restaurant Form</a></div>
    </div>
`

const footerHTML = `
    <footer class="footer">
        <div class="footer-content">
            <p>Contact Info: csitu2@sfsu.edu</p>
        </div>
    </footer>
`


document.body.insertAdjacentHTML('afterbegin', headerHTML);
document.body.insertAdjacentHTML('beforeend', footerHTML);