class AppBar extends HTMLElement{
    
    connectedCallback(){
        this.render();
    }
  
    render() {
        this.innerHTML = `
        <div class="container">
            <a href="#!" data-target="nav-mobile" class="top-nav sidenav-trigger waves-effect waves-light circle hide-on-large-only">☰</a>
        </div>
        
        <ul id="nav-mobile" class="sidenav sidenav-fixed">
            <li class="logo">
                <img src="./images/icon-128.png" alt="logo">
            </li>
            <li class="bold"><a href="/#/klasemen" class="waves-effect waves-purple">Klasemen</a></li>
            <li class="bold"><a href="/#/jadwal-tersimpan" class="waves-effect waves-purple">Jadwal tersimpan</a></li>
            <li class="bold"><a href="/#/klub-tersimpan" class="waves-effect waves-purple">Klub tersimpan</a></li>
        </ul>
        `;
    }
}
customElements.define("app-bar",AppBar);