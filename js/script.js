/* ABRE OU FECHA UM OVERLAY - BRUNO */
function showOrHideOverlay(_overlayId, _showOverlay) {
    let overlay = document.getElementById(`${_overlayId}`);

    if (_showOverlay == true && (overlay.style.display == "none" || overlay.style.display == "")) {
        overlay.style.display = "flex";
    } else {
        overlay.style.display = "none";
    }

    let xhr = new XMLHttpRequest();

    xhr.open("GET", "/ranking", true);
    xhr.onload = function () {
        document.getElementById("positions").innerHTML = " ";
        let ranking = JSON.parse(this.response);
        ranking.sort((a, b) => parseInt(a["total-score"]) > parseInt(b["total-score"]) ? -1 : 1);
        for (let i = 0; i < ranking.length; i++) {
            document.getElementById("positions").innerHTML += ` 
        <div id="position${i + 1}">
        ${i + 1}º <span class="user-name">${ranking[i].player}</span><span class="user-score">${ranking[i]["total-score"]} pts</span>
        </div> `

        }
    }
    xhr.send();
}
