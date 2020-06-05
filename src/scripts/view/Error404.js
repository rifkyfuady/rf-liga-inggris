const Error404 = {

    render : async () => {
        let view =  `
            <div class="row">
                <div class="col s12 m10 offset-m1 center-align">
                    <h3 class="red-text text-darken-4">404 Error</h3>
                    <h4 class="red-text text-darken-4">Halaman tidak ditemukan</h4> 
                </div>
                <div class="fixed-action-btn">
                    <a class="btn-floating btn-large brown darken-4" onclick="window.history.back();">
                    <i class="large material-icons">arrow_back</i>
                    </a>
                </div>
            </div>
        `;
        return view;
    }
    , after_render: async () => {
    }
}
export default Error404;