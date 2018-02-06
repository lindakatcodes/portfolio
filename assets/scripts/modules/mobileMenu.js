class MobileMenu {
    constructor() {
        this.header = document.querySelector('.header');
        this.menuIcon = document.querySelector('.menuIcon');
        this.menuContent = document.querySelector('.menuContent');
        this.events();
    }

    events() {
        this.menuIcon.click(this.toggleTheMenu.bind(this));
    }

    toggleTheMenu() {
        this.menuContent.toggleClass('menuContent--is-visible');
        this.header.toggleClass('header--is-expanded');
        this.menuIcon.toggleClass('menuIcon--close-x');
    }
}

export default MobileMenu;