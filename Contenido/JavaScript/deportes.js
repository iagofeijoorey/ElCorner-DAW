document.addEventListener('DOMContentLoaded', function() {
    const deporteSelect = document.getElementById('deporte');
    const competicionSelect = document.getElementById('competicion');
    const clasificacionTable = document.querySelector('#clasificacion table');
    const clasificacionTitle = document.querySelector('#clasificacion h2');

    function getNombreCompeticion(codigo) {
        const competiciones = {};
        Object.values(ligasPorDeporte).forEach(ligas => {
            ligas.forEach(liga => {
                competiciones[liga.value] = liga.text;
            });
        });
        return competiciones[codigo] || codigo;
    }

    function actualizarCompeticiones() {
        const deporteSeleccionado = deporteSelect.value;
        competicionSelect.innerHTML = '';

        ligasPorDeporte[deporteSeleccionado].forEach(liga => {
            const option = document.createElement('option');
            option.value = liga.value;
            option.textContent = liga.text;
            competicionSelect.appendChild(option);
        });
        actualizarTabla();
    }

    function actualizarTabla() {
        const deporteSeleccionado = deporteSelect.value;
        const competicionSeleccionada = competicionSelect.value;

        const datos = clasificaciones[deporteSeleccionado][competicionSeleccionada];

        clasificacionTitle.textContent = `${deporteSeleccionado.charAt(0).toUpperCase() + deporteSeleccionado.slice(1)} - ${getNombreCompeticion(competicionSeleccionada)}`;

        const headerRow = clasificacionTable.querySelector('thead tr');
        headerRow.innerHTML = '';
        encabezados[deporteSeleccionado].forEach(encabezado => {
            const th = document.createElement('th');
            th.textContent = encabezado;
            headerRow.appendChild(th);
        });

        const tbody = clasificacionTable.querySelector('tbody');
        tbody.innerHTML = '';
        datos.forEach(equipo => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${equipo.pos}</td>
                <td>${equipo.club}</td>
                <td>${equipo.pj}</td>
                <td>${equipo.v}</td>
                <td>${equipo.e}</td>
                <td>${equipo.d}</td>
                <td>${equipo.gf}</td>
                <td>${equipo.gc}</td>
                <td>${equipo.dg}</td>
                <td>${deporteSeleccionado === 'tenis' ? equipo.pts.toLocaleString() : equipo.pts}</td>
            `;
            tbody.appendChild(row);
        });
    }

    deporteSelect.addEventListener('change', actualizarCompeticiones);
    competicionSelect.addEventListener('change', actualizarTabla);

    actualizarCompeticiones();
});














const clasificaciones = {
    futbol: {
        laliga: [
            {pos: 1, club: "Real Madrid", pj: 22, v: 15, e: 4, d: 3, gf: 50, gc: 21, dg: 29, pts: 49},
            {pos: 2, club: "Atlético Madrid", pj: 22, v: 14, e: 6, d: 2, gf: 37, gc: 14, dg: 23, pts: 48},
            {pos: 3, club: "Barcelona", pj: 22, v: 14, e: 3, d: 5, gf: 60, gc: 24, dg: 36, pts: 45},
            {pos: 4, club: "Athletic", pj: 23, v: 12, e: 8, d: 3, gf: 36, gc: 20, dg: 16, pts: 44},
            {pos: 5, club: "Villarreal", pj: 23, v: 10, e: 8, d: 5, gf: 44, gc: 33, dg: 11, pts: 38},
            {pos: 6, club: "Rayo Vallecano", pj: 23, v: 9, e: 8, d: 6, gf: 27, gc: 24, dg: 3, pts: 35},
            {pos: 7, club: "Girona", pj: 23, v: 9, e: 4, d: 10, gf: 31, gc: 33, dg: -2, pts: 31},
            {pos: 8, club: "Osasuna", pj: 22, v: 7, e: 9, d: 6, gf: 27, gc: 31, dg: -4, pts: 30},
            {pos: 9, club: "R.C.D. Mallorca", pj: 22, v: 9, e: 3, d: 10, gf: 19, gc: 28, dg: -9, pts: 30}
        ],
        premier: [
            {pos: 1, club: "Manchester City", pj: 23, v: 18, e: 3, d: 2, gf: 59, gc: 20, dg: 39, pts: 57},
            {pos: 2, club: "Liverpool", pj: 23, v: 16, e: 5, d: 2, gf: 54, gc: 23, dg: 31, pts: 53},
            {pos: 3, club: "Arsenal", pj: 23, v: 16, e: 3, d: 4, gf: 52, gc: 21, dg: 31, pts: 51},
            {pos: 4, club: "Aston Villa", pj: 23, v: 14, e: 3, d: 6, gf: 48, gc: 32, dg: 16, pts: 45},
            {pos: 5, club: "Tottenham", pj: 23, v: 13, e: 3, d: 7, gf: 46, gc: 36, dg: 10, pts: 42},
            {pos: 6, club: "Manchester United", pj: 23, v: 12, e: 2, d: 9, gf: 33, gc: 34, dg: -1, pts: 38},
            {pos: 7, club: "Brighton", pj: 23, v: 9, e: 7, d: 7, gf: 40, gc: 39, dg: 1, pts: 34},
            {pos: 8, club: "Newcastle", pj: 23, v: 10, e: 3, d: 10, gf: 48, gc: 35, dg: 13, pts: 33},
            {pos: 9, club: "West Ham", pj: 23, v: 10, e: 3, d: 10, gf: 36, gc: 45, dg: -9, pts: 33}
        ],
        bundesliga: [
            {pos: 1, club: "Bayern Munich", pj: 21, v: 16, e: 3, d: 2, gf: 62, gc: 18, dg: 44, pts: 51},
            {pos: 2, club: "Borussia Dortmund", pj: 21, v: 15, e: 1, d: 5, gf: 53, gc: 26, dg: 27, pts: 46},
            {pos: 3, club: "RB Leipzig", pj: 21, v: 13, e: 4, d: 4, gf: 46, gc: 22, dg: 24, pts: 43},
            {pos: 4, club: "Bayer Leverkusen", pj: 21, v: 12, e: 6, d: 3, gf: 48, gc: 24, dg: 24, pts: 42},
            {pos: 5, club: "Union Berlin", pj: 21, v: 12, e: 3, d: 6, gf: 35, gc: 27, dg: 8, pts: 39},
            {pos: 6, club: "Eintracht Frankfurt", pj: 21, v: 10, e: 5, d: 6, gf: 40, gc: 30, dg: 10, pts: 35},
            {pos: 7, club: "Wolfsburg", pj: 21, v: 9, e: 5, d: 7, gf: 36, gc: 29, dg: 7, pts: 32},
            {pos: 8, club: "Freiburg", pj: 21, v: 9, e: 4, d: 8, gf: 33, gc: 34, dg: -1, pts: 31},
            {pos: 9, club: "Mainz 05", pj: 21, v: 8, e: 6, d: 7, gf: 32, gc: 30, dg: 2, pts: 30}
        ]
    },
    
    baloncesto: {
        acb: [
            {pos: 1, club: "Real Madrid", pj: 22, v: 20, e: 0, d: 2, gf: 1855, gc: 1675, dg: 180, pts: 42},
            {pos: 2, club: "Barcelona", pj: 22, v: 16, e: 0, d: 6, gf: 1788, gc: 1670, dg: 118, pts: 38},
            {pos: 3, club: "Unicaja", pj: 22, v: 16, e: 0, d: 6, gf: 1860, gc: 1756, dg: 104, pts: 38},
            {pos: 4, club: "Baskonia", pj: 22, v: 15, e: 0, d: 7, gf: 1850, gc: 1759, dg: 91, pts: 37},
            {pos: 5, club: "Valencia Basket", pj: 22, v: 14, e: 0, d: 8, gf: 1839, gc: 1764, dg: 75, pts: 36},
            {pos: 6, club: "UCAM Murcia", pj: 22, v: 13, e: 0, d: 9, gf: 1739, gc: 1667, dg: 72, pts: 35},
            {pos: 7, club: "Gran Canaria", pj: 22, v: 13, e: 0, d: 9, gf: 1807, gc: 1752, dg: 55, pts: 35},
            {pos: 8, club: "Dreamland Gran Canaria", pj: 22, v: 11, e: 0, d: 11, gf: 1768, gc: 1755, dg: 13, pts: 33},
            {pos: 9, club: "Joventut", pj: 22, v: 10, e: 0, d: 12, gf: 1724, gc: 1724, dg: 0, pts: 32}
        ],
        nba: [
            {pos: 1, club: "Boston Celtics", pj: 52, v: 42, e: 0, d: 10, gf: 5878, gc: 5462, dg: 416, pts: 42},
            {pos: 2, club: "Cleveland Cavaliers", pj: 53, v: 35, e: 0, d: 18, gf: 5786, gc: 5534, dg: 252, pts: 35},
            {pos: 3, club: "Milwaukee Bucks", pj: 52, v: 34, e: 0, d: 18, gf: 5824, gc: 5642, dg: 182, pts: 34},
            {pos: 4, club: "New York Knicks", pj: 51, v: 33, e: 0, d: 18, gf: 5712, gc: 5556, dg: 156, pts: 33},
            {pos: 5, club: "Philadelphia 76ers", pj: 50, v: 30, e: 0, d: 20, gf: 5602, gc: 5496, dg: 106, pts: 30},
            {pos: 6, club: "Indiana Pacers", pj: 52, v: 30, e: 0, d: 22, gf: 5878, gc: 5798, dg: 80, pts: 30},
            {pos: 7, club: "Miami Heat", pj: 52, v: 28, e: 0, d: 24, gf: 5592, gc: 5596, dg: -4, pts: 28},
            {pos: 8, club: "Orlando Magic", pj: 51, v: 26, e: 0, d: 25, gf: 5486, gc: 5512, dg: -26, pts: 26},
            {pos: 9, club: "Chicago Bulls", pj: 51, v: 24, e: 0, d: 27, gf: 5536, gc: 5628, dg: -92, pts: 24}
        ],
        euroleague: [
            {pos: 1, club: "Olympiacos", pj: 24, v: 18, e: 0, d: 6, gf: 2034, gc: 1865, dg: 169, pts: 36},
            {pos: 2, club: "Real Madrid", pj: 24, v: 17, e: 0, d: 7, gf: 2102, gc: 1956, dg: 146, pts: 34},
            {pos: 3, club: "Barcelona", pj: 24, v: 16, e: 0, d: 8, gf: 2045, gc: 1987, dg: 58, pts: 32},
            {pos: 4, club: "AS Monaco", pj: 24, v: 15, e: 0, d: 9, gf: 2078, gc: 1998, dg: 80, pts: 30},
            {pos: 5, club: "Fenerbahçe", pj: 24, v: 15, e: 0, d: 9, gf: 2056, gc: 1978, dg: 78, pts: 30},
            {pos: 6, club: "Panathinaikos", pj: 24, v: 14, e: 0, d: 10, gf: 2012, gc: 1956, dg: 56, pts: 28},
            {pos: 7, club: "Anadolu Efes", pj: 24, v: 13, e: 0, d: 11, gf: 2034, gc: 2021, dg: 13, pts: 26},
            {pos: 8, club: "Partizan", pj: 24, v: 12, e: 0, d: 12, gf: 1998, gc: 1987, dg: 11, pts: 24},
            {pos: 9, club: "Baskonia", pj: 24, v: 11, e: 0, d: 13, gf: 2056, gc: 2067, dg: -11, pts: 22}
        ]
    },
    
    tenis: {
        atp: [
            {pos: 1, club: "Jannik Sinner", pj: 22, v: 18, e: 0, d: 4, gf: 58, gc: 16, dg: 42, pts: 9450},
            {pos: 2, club: "Novak Djokovic", pj: 20, v: 17, e: 0, d: 3, gf: 54, gc: 12, dg: 42, pts: 8720},
            {pos: 3, club: "Carlos Alcaraz", pj: 22, v: 18, e: 0, d: 4, gf: 60, gc: 15, dg: 45, pts: 8190},
            {pos: 4, club: "Alexander Zverev", pj: 24, v: 19, e: 0, d: 5, gf: 62, gc: 20, dg: 42, pts: 7310},
            {pos: 5, club: "Daniil Medvedev", pj: 20, v: 15, e: 0, d: 5, gf: 48, gc: 18, dg: 30, pts: 6900},
            {pos: 6, club: "Andrey Rublev", pj: 22, v: 16, e: 0, d: 6, gf: 52, gc: 22, dg: 30, pts: 5060},
            {pos: 7, club: "Hubert Hurkacz", pj: 18, v: 12, e: 0, d: 6, gf: 42, gc: 20, dg: 22, pts: 4015},
            {pos: 8, club: "Casper Ruud", pj: 20, v: 13, e: 0, d: 7, gf: 44, gc: 24, dg: 20, pts: 3940},
            {pos: 9, club: "Alex de Minaur", pj: 16, v: 10, e: 0, d: 6, gf: 36, gc: 20, dg: 16, pts: 3845}
        ],
        wta: [
            {pos: 1, club: "Iga Swiatek", pj: 20, v: 17, e: 0, d: 3, gf: 52, gc: 12, dg: 40, pts: 10950},
            {pos: 2, club: "Aryna Sabalenka", pj: 22, v: 18, e: 0, d: 4, gf: 54, gc: 16, dg: 38, pts: 9026},
            {pos: 3, club: "Coco Gauff", pj: 24, v: 19, e: 0, d: 5, gf: 56, gc: 18, dg: 38, pts: 7250},
            {pos: 4, club: "Elena Rybakina", pj: 18, v: 14, e: 0, d: 4, gf: 46, gc: 14, dg: 32, pts: 6426},
            {pos: 5, club: "Jessica Pegula", pj: 20, v: 15, e: 0, d: 5, gf: 48, gc: 18, dg: 30, pts: 5705},
            {pos: 6, club: "Marketa Vondrousova", pj: 16, v: 12, e: 0, d: 4, gf: 40, gc: 14, dg: 26, pts: 4683},
            {pos: 7, club: "Qinwen Zheng", pj: 18, v: 13, e: 0, d: 5, gf: 42, gc: 16, dg: 26, pts: 4130},
            {pos: 8, club: "Ons Jabeur", pj: 14, v: 10, e: 0, d: 4, gf: 34, gc: 12, dg: 22, pts: 3958},
            {pos: 9, club: "Maria Sakkari", pj: 16, v: 11, e: 0, d: 5, gf: 36, gc: 18, dg: 18, pts: 3872}
        ],
        challenger: [
            {pos: 1, club: "Flavio Cobolli", pj: 16, v: 12, e: 0, d: 4, gf: 38, gc: 16, dg: 22, pts: 2860},
            {pos: 2, club: "Luciano Darderi", pj: 18, v: 13, e: 0, d: 5, gf: 42, gc: 18, dg: 24, pts: 2720},
            {pos: 3, club: "Zachary Svajda", pj: 14, v: 10, e: 0, d: 4, gf: 34, gc: 14, dg: 20, pts: 2540},
            {pos: 4, club: "Juncheng Shang", pj: 12, v: 8, e: 0, d: 4, gf: 30, gc: 12, dg: 18, pts: 2340},
            {pos: 5, club: "Matheus Pucinelli", pj: 10, v: 7, e: 0, d: 3, gf: 28, gc: 10, dg: 18, pts: 2140},
            {pos: 6, club: "Facundo Diaz Acosta", pj: 12, v: 8, e: 0, d: 4, gf: 32, gc: 12, dg: 20, pts: 1980},
            {pos: 7, club: "Otto Virtanen", pj: 10, v: 7, e: 0, d: 3, gf: 26, gc: 12, dg: 14, pts: 1840},
            {pos: 8, club: "Federico Coria", pj: 8, v: 5, e: 0, d: 3, gf: 22, gc: 10, dg: 12, pts: 1580},
            {pos: 9, club: "Nicolas Moreno", pj: 6, v: 4, e: 0, d: 2, gf: 18, gc: 8, dg: 10, pts: 1320}
        ]
    },
    
    balonmano: {
        asobal: [
            {pos: 1, club: "Barcelona", pj: 18, v: 17, e: 1, d: 0, gf: 630, gc: 504, dg: 126, pts: 35},
            {pos: 2, club: "Granollers", pj: 18, v: 15, e: 0, d: 3, gf: 604, gc: 516, dg: 88, pts: 30},
            {pos: 3, club: "Bidasoa Irún", pj: 18, v: 13, e: 2, d: 3, gf: 572, gc: 509, dg: 63, pts: 28},
            {pos: 4, club: "Ademar León", pj: 18, v: 12, e: 1, d: 5, gf: 584, gc: 538, dg: 46, pts: 25},
            {pos: 5, club: "Logroño La Rioja", pj: 18, v: 10, e: 3, d: 5, gf: 568, gc: 542, dg: 26, pts: 23},
            {pos: 6, club: "ABANCA Ademar", pj: 18, v: 9, e: 2, d: 7, gf: 552, gc: 540, dg: 12, pts: 20},
            {pos: 7, club: "Cuenca", pj: 18, v: 8, e: 3, d: 7, gf: 538, gc: 536, dg: 2, pts: 19},
            {pos: 8, club: "Anaitasuna", pj: 18, v: 8, e: 2, d: 8, gf: 530, gc: 534, dg: -4, pts: 18},
            {pos: 9, club: "Puente Genil", pj: 18, v: 7, e: 3, d: 8, gf: 524, gc: 536, dg: -12, pts: 17}
        ],
        bundesliga: [
            {pos: 1, club: "SC Magdeburg", pj: 28, v: 25, e: 1, d: 2, gf: 912, gc: 789, dg: 123, pts: 51},
            {pos: 2, club: "Füchse Berlin", pj: 28, v: 23, e: 2, d: 3, gf: 896, gc: 798, dg: 98, pts: 48},
            {pos: 3, club: "THW Kiel", pj: 28, v: 22, e: 1, d: 5, gf: 886, gc: 805, dg: 81, pts: 45},
            {pos: 4, club: "SG Flensburg", pj: 28, v: 20, e: 2, d: 6, gf: 872, gc: 812, dg: 60, pts: 42},
            {pos: 5, club: "Rhein-Neckar Löwen", pj: 28, v: 18, e: 3, d: 7, gf: 864, gc: 824, dg: 40, pts: 39},
            {pos: 6, club: "HSV Hamburg", pj: 28, v: 16, e: 4, d: 8, gf: 842, gc: 826, dg: 16, pts: 36},
            {pos: 7, club: "MT Melsungen", pj: 28, v: 15, e: 3, d: 10, gf: 832, gc: 834, dg: -2, pts: 33},
            {pos: 8, club: "VfL Gummersbach", pj: 28, v: 14, e: 2, d: 12, gf: 822, gc: 832, dg: -10, pts: 30},
            {pos: 9, club: "TBV Lemgo", pj: 28, v: 13, e: 2, d: 13, gf: 818, gc: 838, dg: -20, pts: 28}
        ],
        champions: [
            {pos: 1, club: "Barça", pj: 14, v: 12, e: 0, d: 2, gf: 482, gc: 418, dg: 64, pts: 24},
            {pos: 2, club: "Veszprém HC", pj: 14, v: 11, e: 0, d: 3, gf: 472, gc: 426, dg: 46, pts: 22},
            {pos: 3, club: "Aalborg Håndbold", pj: 14, v: 10, e: 1, d: 3, gf: 464, gc: 432, dg: 32, pts: 21},
            {pos: 4, club: "PSG Handball", pj: 14, v: 10, e: 0, d: 4, gf: 462, gc: 436, dg: 26, pts: 20},
            {pos: 5, club: "SC Magdeburg", pj: 14, v: 9, e: 1, d: 4, gf: 458, gc: 438, dg: 20, pts: 19},
            {pos: 6, club: "THW Kiel", pj: 14, v: 8, e: 1, d: 5, gf: 446, gc: 436, dg: 10, pts: 17},
            {pos: 7, club: "Telekom Veszprém", pj: 14, v: 7, e: 2, d: 5, gf: 442, gc: 440, dg: 2, pts: 16},
            {pos: 8, club: "Dinamo Bucuresti", pj: 14, v: 7, e: 0, d: 7, gf: 438, gc: 442, dg: -4, pts: 14},
            {pos: 9, club: "Pick Szeged", pj: 14, v: 6, e: 1, d: 7, gf: 432, gc: 442, dg: -10, pts: 13}
        ]
    }
};

const encabezados = {
    futbol: ["Pos", "Club", "PJ", "V", "E", "D", "GF", "GC", "DG", "Pts"],
    baloncesto: ["Pos", "Club", "PJ", "V", "E", "D", "PF", "PC", "DIF", "Pts"],
    tenis: ["Pos", "Jugador", "Torneos", "V", "E", "D", "Sets G", "Sets P", "Dif", "Puntos"],
    balonmano: ["Pos", "Club", "PJ", "V", "E", "D", "GF", "GC", "DIF", "Pts"]
};


const ligasPorDeporte = {
    futbol: [
        {value: "laliga", text: "LaLiga"},
        {value: "premier", text: "Premier League"},
        {value: "bundesliga", text: "Bundesliga"}
    ],
    baloncesto: [
        {value: "acb", text: "Liga ACB"},
        {value: "nba", text: "NBA"},
        {value: "euroleague", text: "EuroLeague"}
    ],
    tenis: [
        {value: "atp", text: "ATP Tour"},
        {value: "wta", text: "WTA Tour"},
        {value: "challenger", text: "Challenger Tour"}
    ],
    balonmano: [
        {value: "asobal", text: "Liga ASOBAL"},
        {value: "bundesliga", text: "Bundesliga"},
        {value: "champions", text: "Champions League"}
    ]
};