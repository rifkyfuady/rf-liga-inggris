class FooterNav extends HTMLElement{
    
    connectedCallback(){
        this.render();
    }

    render() {
        this.innerHTML = `
            <footer class="page-footer">
                <div class="container">
                    <div class="row">
                        <div class="col s12 m10 offset-m1">
                            <div class="footer-copyright">
                                © 2016 - ${new Date().getFullYear()}
                                Rifky Fuady, All rights reserved.
                                <a class="grey-text text-darken-1 right" href="https://materializecss.com/">Design by Materialize CSS</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }
}
customElements.define("footer-nav",FooterNav);