import {
  DateTime
} from 'luxon';
import ApiFootball from "../data/ApiFootball.js";
import Utils from "../services/Utils.js";
import {
  idbjadwal
} from "../data/IndexDb.js";

const Jadwal = {
  render: async () => {
      const request = Utils.parseRequestURL();
      const results = await ApiFootball.getJadwal(request.id);
      let outputHTML = `
    <div class="row">
      <div class="col s12 m10 offset-m1" id="jadwal">
      <h4 class="center-align">Jadwal Pertandingan</h4>
      <div class="card">
            <div class="card-content">
              <table class="responsive-table">
                <thead>
                  <tr>
                      <th>Kompetisi</th>
                      <th>Jadwal</th>
                      <th>Matchday</th>
                      <th>Tuan Rumah</th>
                      <th>Tamu</th>
                      <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
    `;
      results.matches.forEach(function(match) {
          outputHTML += `
            <tr>
              <td>${match.competition.name}</td>
              <td>${DateTime.fromISO(match.utcDate,{ locale: "id-ID" }).toLocaleString(DateTime.DATETIME_FULL)}</td>
              <td>${match.matchday}</td>
              <td>${match.homeTeam.name}</td>
              <td>${match.awayTeam.name}</td>
              <td>
                <a class="waves-effect waves-teal teal btn-small aksi-simpan" id="${match.id}">Simpan</a>
              </td>
            </tr>
          `;
      });
      outputHTML += `
              </tbody>
              </table>
            </div>
          </div>
          </div>
          </div>
          <div class="fixed-action-btn">
            <a class="btn-floating btn-large brown darken-4" id="back" onclick="window.history.back();">
              <i class="large material-icons">arrow_back</i>
            </a>
          </div>
      `;
      return outputHTML;
  },
  after_render: async () => {
      [...document.querySelectorAll('.aksi-simpan')]
      .forEach(simpan => { 
        simpan.onclick = async () => {
          const jadwal = await ApiFootball.getJadwalId(simpan.id);
          idbjadwal.set(jadwal.match);
          const toastHTML = '<span>Berhasil menyimpan jadwal</span><a class="btn-flat toast-action" href="/#/jadwal-tersimpan">Lihat</a>';
          M.toast({
              html: toastHTML,
              classes: 'rounded'
          });
          simpan.style.display = "none";
        }
      })
  }

}

export default Jadwal;