'use strict'


function renderBackgroundImgs() {

    const strHtmls = `
            <img src="img/triangles.jpg" onclick="onSelectImg(this, 'triangle')" class="background-img triangle" />
            <img src="img/paint.jpg" onclick="onSelectImg(this, 'paint')" class="background-img paint" />
			<img src="img/math.jpg" onclick="onSelectImg(this, 'math')" class="background-img math" />
			<img src="img/flower.jpg" onclick="onSelectImg(this, 'flower')" class="background-img flower" />
			<img src="img/black.jpg" onclick="onSelectImg(this, 'black')" class="background-img black" />
            `

    document.querySelector('.backgrounds').innerHTML = strHtmls
}

function onSelectImg(elBackgroundImg) {
    coverCanvasWithImg(elBackgroundImg)

    const elBackgroundImgs = document.querySelectorAll('.background-img')
    elBackgroundImgs.forEach(chart => chart.classList.remove('clicked'))

    elBackgroundImg.classList.add('clicked')
}

function coverCanvasWithImg(elImg) {
    // gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    // gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight)
    gChart.background = elImg
}
