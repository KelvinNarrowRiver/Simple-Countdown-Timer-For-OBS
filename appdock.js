let min = 0
let sec = 0

let sec2
let minute = document.querySelector('#minutes')
let second = document.querySelector('#seconds')
const buttonStart = document.querySelector('#buttonStart')
const buttonStop = document.querySelector('#buttonStop')
const buttonReset = document.querySelector('#buttonReset')
const buttonOKMin = document.querySelector('#buttonOKMin')
const buttonOKSec = document.querySelector('#buttonOKSec')
let timer
let countdown
let buttonPressed = 'none'
let messageAtZero = ''
const channelName = 'obsTimer'
const channel = new BroadcastChannel(channelName)
drawTime()
console.log(buttonPressed)
function minutes() {
	if (buttonPressed === 'start') {
		inputMin.value = ''
		return
	}
	let minutes = document.getElementById('inputMin').value
	if (minutes < 0 || minutes > 59) inputMin.value = ''
	else {
		inputMin.value = ''
		min = minutes
		drawTime()
	}
}
function seconds() {
	if (buttonPressed === 'start') {
		inputSec.value = ''
		return
	}
	let seconds = document.getElementById('inputSec').value
	if (seconds < 0 || seconds > 59) inputSec.value = ''
	else {
		inputSec.value = ''
		sec = seconds
		drawTime()
	}
}
function message() {
	messageAtZero = document.getElementById('inputMess').value
}
function startCountdown() {
	if (min <= 0 && sec <= 0) {
		console.log('Timer Finished')
		zeroReached()
		return
	}
	if (min === 0) {
		console.log('sec>0')
		sec -= 1
		drawTime()
		return
	}
	if (min > 0 && sec > 0) {
		sec -= 1
		drawTime()
		return
	}
	if (sec === 0) {
		sec = 59
		min -= 1
		drawTime()
		return
	}
	console.log('run')
}
function drawTime() {
	console.log('DrawTime')
	minute.innerHTML = min

	if (sec > 9) second.innerHTML = sec
	else {
		sec2 = '0' + sec.toString(10)
		second.innerHTML = sec2
	}
	countdown = [min, sec, messageAtZero, buttonPressed]

	console.log(countdown)
	channel.postMessage(countdown)
}
function zeroReached() {
	console.log('Zero Reached')
	buttonPressed = 'zero'
	countdown = [min, sec, messageAtZero, buttonPressed]

	console.log(countdown)
	channel.postMessage(countdown)

	buttonStart.style.color = 'white'
	buttonStop.style.color = 'white'
	buttonReset.style.color = 'white'
	buttonOKMin.style.color = 'white'
	buttonOKSec.style.color = 'white'

	clearInterval(timer)
}
function startButton() {
	console.log('startPress')
	buttonPressed = 'start'
	buttonStart.style.color = 'red'
	buttonStop.style.color = 'white'
	buttonReset.style.color = 'rgba(255, 255, 255, 0.2)'
	buttonOKMin.style.color = 'rgba(255, 255, 255, 0.2)'
	buttonOKSec.style.color = 'rgba(255, 255, 255, 0.2)'

	timer = setInterval(startCountdown, 1000)
}

function stopButton() {
	console.log('Stop Button')
	buttonPressed = 'stop'
	buttonStart.style.color = 'white'
	buttonStop.style.color = 'red'
	buttonReset.style.color = 'white'
	buttonOKMin.style.color = 'white'
	buttonOKSec.style.color = 'white'

	clearInterval(timer)
}
function resetButton() {
	if (buttonPressed === 'start') return
	buttonPressed = 'reset'

	clearInterval(timer)
	buttonStart.style.color = 'white'
	buttonStop.style.color = 'white'
	buttonReset.style.color = 'white'
	buttonOKMin.style.color = 'white'
	buttonOKSec.style.color = 'white'
	min = 0
	sec = 0
	inputMin.value = ''
	inputSec.value = ''
	drawTime()
}
