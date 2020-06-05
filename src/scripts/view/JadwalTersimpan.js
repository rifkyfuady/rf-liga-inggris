import {
  DateTime
} from 'luxon';
import {
  idbjadwal
} from "../data/IndexDb.js";

const JadwalTersimpan = {
  render: async () => {
      const results = await idbjadwal.all().then(function(results) {
          return results;
      });
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
                      <th>Lokasi</th>
                      <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
    `;
      if(results.length > 0){
        results.forEach(function(match) {
          outputHTML += `
            <tr id="baris-${match.id}">
              <td>${match.competition.name}</td>
              <td>${DateTime.fromISO(match.utcDate,{ locale: "id-ID" }).toLocaleString(DateTime.DATETIME_FULL)}</td>
              <td>${match.matchday}</td>
              <td>${match.homeTeam.name}</td>
              <td>${match.awayTeam.name}</td>
              <td>${match.venue}</td>
              <td>
                <a class="waves-effect waves-red red btn-small aksi-hapus" id="${match.id}">Hapus</a>
              </td>
            </tr>
          `;
        });
      }else{
        outputHTML += `
            <tr>
              <td colspan="7" class="center-align">Belum ada jadwal tersimpan</td>
            </tr>
          `;
      }
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
      [...document.querySelectorAll('.aksi-hapus')]
      .forEach(hapus => { 
        hapus.onclick = () => {
          idbjadwal.delete(parseInt(hapus.id));
          const toastHTML = 'Berhasil menghapus jadwal';
          M.toast({
              html: toastHTML,
              classes: 'rounded'
          });
          document.querySelector('#baris-'+hapus.id).style.display = "none";
        }
      })
  }

}

export default JadwalTersimpan;