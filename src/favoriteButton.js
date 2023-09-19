function favoriteAnimation($event) {
    const favoriteButton = document.querySelector(".favorite-button");
    if (favoriteButton) {
        const button = $event.currentTarget;
        button.classList.toggle("is-favorite");
    }

}

