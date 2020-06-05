import Utils from "./Utils.js"
import Error404 from "../view/Error404.js";
import Klasemen from "../view/Klasemen.js";
import Jadwal from "../view/Jadwal.js";
import Klub from "../view/Klub.js";
import JadwalTersimpan from "../view/JadwalTersimpan.js";
import KlubTersimpan from "../view/KlubTersimpan.js";

const Routes = {
    '/': Klasemen,
    '/klasemen': Klasemen,
    '/jadwal/:id': Jadwal,
    '/klub/:id': Klub,
    '/jadwal-tersimpan': JadwalTersimpan,
    '/klub-tersimpan': KlubTersimpan,
};

const Router = async () => {

    const content = null || document.getElementById('body-content');

    // Mendapatkan URL dari addresbar
    const request = Utils.parseRequestURL()

    // Parsing URL dan jika memiliki bagian id, diubah dengan string ": id"
    const parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')

    // Dapatkan halaman dari hash dari rute.
    // Jika URL yang diurai tidak ada dalam daftar rute yang didukung, akan diarahkan ke halaman 404 sebagai gantinya
    const page = Routes[parsedURL] ? Routes[parsedURL] : Error404
    content.innerHTML = await page.render();
    M.Sidenav.getInstance(document.querySelector(".sidenav")).close();
    await page.after_render();

}
export default Router;