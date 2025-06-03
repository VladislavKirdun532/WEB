document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll("nav>ul>li");
    const displayedImage = document.getElementById('displayed-image');

    navItems.forEach((item) => {
        item.onmouseover = itemMouseoverHandler;
        item.onmouseout = itemMouseoutHandler;

        const link = item.querySelector('a');
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const imageSrc = this.getAttribute('data-image');
            if (displayedImage.src.includes(imageSrc)) {
                displayedImage.style.display = 'none';
            } else {
                displayedImage.src = imageSrc;
                displayedImage.style.display = 'block';
            }
        });
    });

    function itemMouseoverHandler() {
        this.firstElementChild.classList.remove('hide');
    }

    function itemMouseoutHandler() {
        this.firstElementChild.classList.add('hide');
    }
});