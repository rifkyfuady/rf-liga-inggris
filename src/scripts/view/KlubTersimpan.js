import {
  DateTime
} from 'luxon';
import {
  idbklub
} from "../data/IndexDb.js";

const KlubTersimpan = {
  render: async () => {
      const data = await idbklub.all().then(function(data) {
          return data;
      });
      let outputHTML = `
      <div class="row">
      <div class="col s12 m10 offset-m1" id="klub">`;
      console.log(data);
      if(data.length > 0){
        data.forEach(function(results) {
          outputHTML += `
          <div class="card" id="baris-${results.id}">
          <div class="card-content">
          <span class="card-title center-align"><img class="materialboxed" width="100" src="${results.crestUrl}"/> ${results.name}</span>
          <a class="btn-floating btn-large halfway-fab waves-effect waves-light red btn-klub aksi-hapus" id="${results.id}"><i class="material-icons">delete</i></a>
          <table class="responsive-table">
          <tbody>
          <tr>
            <th>Alamat</th>
            <td>${results.address}</td>
          </tr>
          <tr>
            <th>Telepon</th>
            <td><a href="tel:${results.phone}">${results.phone}</a></td>
          </tr>
          <tr>
            <th>Website</th>
            <td><a href="${results.website}" target="_blank">${results.website}</a></td>
          </tr>
          <tr>
            <th>Email</th>
            <td><a href="mailto:${results.email}">${results.email}</a></td>
          </tr>
          <tr>
            <th>Didirikan</th>
            <td>${results.founded}</td>
          </tr>
          </tbody>
          </table>
          <table class="responsive-table">
            <thead>
              <tr>
                <th>Kompetisi Aktif</th>
              </tr>
            </thead>
            <tbody>
          `;
          results.activeCompetitions.forEach(function(competition) {
              outputHTML += `
                <tr>
                  <td>${competition.name}</td>
                </tr>
              `;
          });
          outputHTML += `
              </tbody>
              </table>
              <table class="responsive-table">
              <h5 class="center-align">Data Pemain</h5>
                <thead>
                  <tr>
                      <th>Nama</th>
                      <th>Posisi</th>
                      <th>Tgl. Lahir</th>
                      <th>Kebangsaan</th>
                      <th>No. Punggung</th>
                      <th>Peran</th>
                  </tr>
                </thead>
                <tbody>
              `;
          results.squad.forEach(function(pemain) {
              outputHTML += `
              <tr>
                <td>${pemain.name}</td>
                <td>${pemain.position}</td>
                <td>${DateTime.fromISO(pemain.dateOfBirth,{ locale: "id-ID" }).toLocaleString(DateTime.DATE_MED)}</td>
                <td>${pemain.nationality}</td>
                <td>${pemain.shirtNumber}</td>
                <td>${pemain.role}</td>
              </tr>
            `;
          });
          outputHTML += `
              </tbody>
              </table>
            </div>
          </div>
          `;
        });
      }else{
        outputHTML += `
              <div class="col s12 m10 offset-m1 center-align">
              <h4 class="light-blue-text text-darken-4">Data klub kosong</h4>
              <h5 class="light-blue-text text-darken-4">Belum ada data klub yang sudah disimpan</h5> 
          </div>
          `;
      }
      outputHTML += `
          </div>
          </div>
          <div class="fixed-action-btn">
            <a class="btn-floating btn-large brown darken-4" onclick="window.history.back();">
              <i class="large material-icons">arrow_back</i>
            </a>
          </div>
  `;
      return outputHTML;
  },
  after_render: async () => {
      const materialboxedElement = document.querySelectorAll('.materialboxed');
      M.Materialbox.init(materialboxedElement);
      [...document.querySelectorAll('.aksi-hapus')]
      .forEach(hapus => { 
        hapus.onclick = () => {
          idbklub.delete(parseInt(hapus.id));
          const toastHTML = 'Berhasil menghapus klub';
          M.toast({
              html: toastHTML,
              classes: 'rounded'
          });
          document.querySelector('#baris-'+hapus.id).style.display = "none";
        }
      })
  }

}

export default KlubTersimpan;