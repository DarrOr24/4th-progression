'use strict'

function onInit() {
    renderGallery()

    gTermCount = 2
    gChart = _createChart()
    renderChartTypes()
    renderEditor()
    gElCanvas = document.querySelector('canvas')
	gCtx = gElCanvas.getContext('2d')

    clearCanvas()
}

function onReset(){
    gTermCount = 2
    gChart = _createChart()
    renderEditor()
}

function renderChartTypes() {

    const strHtmls = `
    <img src="img/bar-chart.png" alt="" onclick = "onChartSelect('rect')" class="rectChart">
    <img src="img/circle-chart.jpg" alt="" onclick = "onChartSelect('circle')" class="circleChart">`
    
    document.querySelector('.chart-samples').innerHTML = strHtmls
}

function renderEditor(){
    const {terms} = gChart

    var strHtmls = terms.map((term,idx) => `
        <label for="name">Term${idx+1}:</label>
        <input type="text" id="name" name="name${idx+1}" placeholder="term${idx+1}" value="${term.name}" size="5">
                    
        <label for="value">Value:</label>
        <input type="number" id="value" name="value${idx+1}" value="${term.value}" style="width: 50px;">
                
        <label for="color">Color:</label>
        <input type="color" id="color" name="color${idx+1}" value="${term.color}" style="width: 25px;"/>

        <button class="btn" type="button" onclick="onRemoveTerm(${idx})">X</button> 
        <br>
        `)

    document.querySelector('.terms').innerHTML = strHtmls.join('')
    
}

function onChartSelect(chartType){
    updateChartType(chartType)
}

function onSubmit(ev){
    ev.preventDefault()

    const formData = new FormData(ev.target)
    const formDataObj = Object.fromEntries(formData)

    insertInputData(formDataObj)
}

function onDrawChart(){
    clearCanvas()
    updateFormData()
    drawChart()
}

function onClearChart(){
    clearCanvas()
}

function onRemoveTerm(idx){
    updateFormData()
    removeTerm(idx)
}

function onAddTerm(){
    updateFormData()
    addTerm()
}

function updateFormData(){ //Same as submit
    const form = document.getElementById('chart-values')
    const formData = new FormData(form)
    const formDataObj = Object.fromEntries(formData)

    insertInputData(formDataObj)
}

function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg') 
    elLink.href = imgContent
}

function onSave() {
    _saveChartToStorage()
}



function onMyCharts(){
    document.body.classList.toggle('my-charts-open');
    const myChartsArr = getMyCharts()
    
    var strHtmls = myChartsArr.map((chart, idx) => `
        <li onclick="onOpenSavedChart(${idx})">${chart.title}</li>`)

    document.querySelector('.my-charts').innerHTML = strHtmls.join('')
}

function onCloseMyCharts(){
    document.body.classList.remove('my-charts-open')
}

function onOpenSavedChart(idx){
    const myChartsArr = getMyCharts()
    gChart = myChartsArr[idx]

    document.body.classList.remove('my-charts-open')

    clearCanvas()
    drawChart()
}