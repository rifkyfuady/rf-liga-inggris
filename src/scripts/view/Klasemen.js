import ApiFootball from "../data/ApiFootball.js";

const Klasemen = {
    render: async () => {
        const results = await ApiFootball.getKlasemen();
        let outputHTML = `
        <div class="row">
        <div class="col s12 m10 offset-m1" id="klasemen">
        <h4 class="center-align">${results.competition.name}</h4>
        `;
        results.standings.forEach(function(standing) {
            outputHTML += `
            <div class="card">
              <div class="card-content">
                <span class="card-title center-align">${standing.type}</span>
                <table class="responsive-table">
                  <thead>
                    <tr>
                        <th>Logo</th>
                        <th>Klub</th>
                        <th class="tooltipped" data-position="top" data-tooltip="Peringkat">Rank</th>
                        <th class="tooltipped" data-position="top" data-tooltip="Jumlah Pertandingan">PD</th>
                        <th class="tooltipped" data-position="top" data-tooltip="Menang">M</th>
                        <th class="tooltipped" data-position="top" data-tooltip="Seri">S</th>
                        <th class="tooltipped" data-position="top" data-tooltip="Kalah">K</th>
                        <th>Poin</th>
                        <th class="tooltipped" data-position="top" data-tooltip="Mencetak gol">GM</th>
                        <th class="tooltipped" data-position="top" data-tooltip="Kebobolan gol">GA</th>
                        <th class="tooltipped" data-position="top" data-tooltip="Selisih Gol">SG</th>
                        <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
            `;
            standing.table.forEach(function(team) {
                outputHTML += `
                <tr>
                  <td><img class="materialboxed" width="20" src="${team.team.crestUrl}" /></td>
                  <td>${team.team.name}</td>
                  <td>${team.position}</td>
                  <td>${team.playedGames}</td>
                  <td>${team.won}</td>
                  <td>${team.draw}</td>
                  <td>${team.lost}</td>
                  <td>${team.points}</td>
                  <td>${team.goalsFor}</td>
                  <td>${team.goalsAgainst}</td>
                  <td>${team.goalDifference}</td>
                  <td><a class="waves-effect waves-purple purple darken-4 btn-small" href="/#/klub/${team.team.id}">Info</a>&nbsp;<a class="waves-effect waves-blue blue darken-4 btn-small" href="/#/jadwal/${team.team.id}">Jadwal</a></td>
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
        outputHTML += `</div>
                      </div>`;
        return outputHTML;
    },
    after_render: async () => {
        const tooltippedElement = document.querySelectorAll('.tooltipped');
        M.Tooltip.init(tooltippedElement);
        const materialboxedElement = document.querySelectorAll('.materialboxed');
        M.Materialbox.init(materialboxedElement);
    }

}

export default Klasemen;