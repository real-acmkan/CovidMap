var requestOptions = {method: "GET", redirect: "follow"};function t(e, t) {var n = JSON.parse(e);"global" == t ? (document.getElementById("cases").innerHTML += n.cases.toLocaleString(), document.getElementById("todayCases").innerHTML += n.todayCases.toLocaleString(), document.getElementById("deaths").innerHTML += n.deaths.toLocaleString(), document.getElementById("todayDeaths").innerHTML += n.todayDeaths.toLocaleString(), document.getElementById("recovered").innerHTML += n.recovered.toLocaleString(), document.getElementById("tests").innerHTML += n.tests.toLocaleString()) : "asia" == t ? (document.getElementById("asiaTotalCases").innerHTML += n.cases.toLocaleString(), document.getElementById("asiaNewCases").innerHTML += n.todayCases.toLocaleString().replace(new RegExp("\\b"+"0"+"\\b"), "Unknown"), document.getElementById("asiaTotalDeaths").innerHTML += n.deaths.toLocaleString(), document.getElementById("asiaNewDeaths").innerHTML += n.todayDeaths.toLocaleString().replace(new RegExp("\\b"+"0"+"\\b"), "Unknown"), document.getElementById("asiaTotalRecoveries").innerHTML += n.recovered.toLocaleString(), document.getElementById("asiaTotalTests").innerHTML += n.tests.toLocaleString()) : "africa" == t ? (document.getElementById("africaTotalCases").innerHTML += n.cases.toLocaleString(), document.getElementById("africaNewCases").innerHTML += n.todayCases.toLocaleString().replace(new RegExp("\\b"+"0"+"\\b"), "Unknown"), document.getElementById("africaTotalDeaths").innerHTML += n.deaths.toLocaleString(), document.getElementById("africaNewDeaths").innerHTML += n.todayDeaths.toLocaleString().replace(new RegExp("\\b"+"0"+"\\b"), "Unknown"), document.getElementById("africaTotalRecoveries").innerHTML += n.recovered.toLocaleString(), document.getElementById("africaTotalTests").innerHTML += n.tests.toLocaleString()) : "australia" == t ? (document.getElementById("australiaTotalCases").innerHTML += n.cases.toLocaleString(), document.getElementById("australiaNewCases").innerHTML += n.todayCases.toLocaleString().replace(new RegExp("\\b"+"0"+"\\b"), "Unknown"), document.getElementById("australiaTotalDeaths").innerHTML += n.deaths.toLocaleString(), document.getElementById("australiaNewDeaths").innerHTML += n.todayDeaths.toLocaleString().replace(new RegExp("\\b"+"0"+"\\b"), "Unknown"), document.getElementById("australiaTotalRecoveries").innerHTML += n.recovered.toLocaleString(), document.getElementById("australiaTotalTests").innerHTML += n.tests.toLocaleString()) : "europe" == t ? (document.getElementById("europeTotalCases").innerHTML += n.cases.toLocaleString(), document.getElementById("europeNewCases").innerHTML += n.todayCases.toLocaleString().replace(new RegExp("\\b"+"0"+"\\b"), "Unknown"), document.getElementById("europeTotalDeaths").innerHTML += n.deaths.toLocaleString(), document.getElementById("europeNewDeaths").innerHTML += n.todayDeaths.toLocaleString().replace(new RegExp("\\b"+"0"+"\\b"), "Unknown"), document.getElementById("europeTotalRecoveries").innerHTML += n.recovered.toLocaleString(), document.getElementById("europeTotalTests").innerHTML += n.tests.toLocaleString()) : "north" == t ? (document.getElementById("northAmericaTotalCases").innerHTML += n.cases.toLocaleString(), document.getElementById("northAmericaNewCases").innerHTML += n.todayCases.toLocaleString().replace(new RegExp("\\b"+"0"+"\\b"), "Unknown"), document.getElementById("northAmericaTotalDeaths").innerHTML += n.deaths.toLocaleString(), document.getElementById("northAmericaNewDeaths").innerHTML += n.todayDeaths.toLocaleString().replace(new RegExp("\\b"+"0"+"\\b"), "Unknown"), document.getElementById("northAmericaTotalRecoveries").innerHTML += n.recovered.toLocaleString(), document.getElementById("northAmericaTotalTests").innerHTML += n.tests.toLocaleString()) : "south" == t && (document.getElementById("southAmericaTotalCases").innerHTML += n.cases.toLocaleString(), document.getElementById("southAmericaNewCases").innerHTML += n.todayCases.toLocaleString().replace(new RegExp("\\b"+"0"+"\\b"), "Unknown"), document.getElementById("southAmericaTotalDeaths").innerHTML += n.deaths.toLocaleString(), document.getElementById("southAmericaNewDeaths").innerHTML += n.todayDeaths.toLocaleString().replace(new RegExp("\\b"+"0"+"\\b"), "Unknown"), document.getElementById("southAmericaTotalRecoveries").innerHTML += n.recovered.toLocaleString(), document.getElementById("southAmericaTotalTests").innerHTML += n.tests.toLocaleString())}
function m(e, n) {fetch(e, requestOptions).then(e => e.text()).then(e => t(e, n)).catch(e => console.log("error", e))}
m("https://disease.sh/v2/all?yesterday=false", "global"), m("https://disease.sh/v2/continents/asia?yesterday=false", "asia"), m("https://disease.sh/v2/continents/africa?yesterday=false", "africa"), m("https://disease.sh/v2/continents/Australia%2FOceania?yesterday=false", "australia"), m("https://disease.sh/v2/continents/europe?yesterday=false", "europe"), m("https://disease.sh/v2/continents/north%20america?yesterday=false", "north"), m("https://disease.sh/v2/continents/south%20america?yesterday=false", "south");
