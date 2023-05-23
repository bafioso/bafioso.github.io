let packs = [
    "A Day in the Park",
    "Abe Normal",
    "Alhambra Trax 1",
    "Alhambra Trax 2",
    "Alhambra Trax 3",
    "Ambiences",
    "Berlin Connection",
    "Bhangra Mangra",
    "Bossa Nueva",
    "Boy Band Sensation",
    "Cafe Muzzakh",
    "Cameron's Ex",
    "Club Sounds III",
    "Compu FX",
    "Country Sounds",
    "Dancefloor Burners",
    "Dark Skies",
    "DJ Fuse's Habbo Theme",
    "DJ Fuse's Duck Funk",
    "Double Peaks",
    "EC 1",
    "EC 2",
    "EC 3",
    "El Generico",
    "Electronica",
    "Ferry Nultado",
    "Furni Sounds I",
    "Ghost Story",
    "Habbowood",
    "Highway to Habbo",
    "House Loops",
    "Icy Trax",
    "Iron Maid",
    "Jackin' Chicago",
    "Jingle Beats",
    "Jive Sideburns",
    "Little Tanga Beach",
    "Loco Electro",
    "Maximum Minimal",
    "MnM",
    "Monkey Paradise",
    "Moshy Metal",
    "Mysto Magica",
    "Nature Nightlife",
    "Nu Skool Breakz",
    "NYC Beat",
    "Party Pack",
    "Pianissimo",
    "Pixels on the Water",
    "Rasta Santa's Pack",
    "RnB Grooves 1",
    "RnB Grooves 2",
    "RnB Grooves 3",
    "RnB Grooves 4",
    "RnB Grooves 5",
    "Rockin' Riffs",
    "Rudolph's Loops",
    "Silence of the Moderators",
    "Snotty Day",
    "Snouthill Horror",
    "SnowStorm Theme",
    "Spicey Donna",
    "State of Trancehouse",
    "Sunset Advertures",
    "Supa Funk",
    "Sympathy for the Coder",
    "Tiki Vol. 1",
    "Tiki Vol. 2",
    "Tiki Vol. 3",
    "Valentine 1",
    "Valentine 2",
    "Yngvie Van Halen",
]

document.body.style.backgroundImage = 'url("assets/' + Math.floor(Math.random() * 11) + '.gif")'
let selected = []
let preview = document.createElement('audio')
let letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',]
let track1 = []
let track2 = []
let track3 = []
let track4 = []
let playing = false
let timer = 0
let tempo = 0
let pages = 1
let page = 1
let aud = [0]


for (let a = 0; a < packs.length; a++) {
    let option = document.createElement('option')
    option.innerHTML = packs[a]
    document.getElementById('select').appendChild(option)
}

for (let a = 1; a <= 4; a++) {
    let b = a.toString()
    let c = 'setpack_' + b

    document.getElementById(c).addEventListener('click', function() {
        let d = document.getElementById('select').selectedIndex
        let e = 'packimg_' + b
        let f = 'Trax/' + packs[d] + '/pack.gif'
        if (!selected.includes(d)) {
            selected[a] = d
            document.getElementById(e).src = f
        }
    })
}

for (let a = 1; a <= 4; a++) {
    for (let b = 1; b <= 9; b++) {
        let c, d
        a = a.toString()
        c = letter[(b - 1)]
        let loop = document.createElement('input')
        loop.type = 'button'
        loop.setAttribute('class', 'a')
        loop.setAttribute('value', c)
        loop.setAttribute('id', a + c)
        d = 'pack_' + a
        document.getElementById(d).appendChild(loop)
        let whitespace = document.createTextNode('\n')
        document.getElementById(d).appendChild(whitespace)

        loop.addEventListener('click', function() {
            if (selected[a] != null) {
                selected[0] = this.id
            }
        })

        loop.addEventListener('mouseover', function() {
            if (selected[a] != null) {
                if (playing == false) {
                    preview.src = 'Trax/' + packs[selected[a]] + '/' + b + '.mp3'
                    preview.play()
                }
            }
        })

        loop.addEventListener('mouseout', function() {
            if (preview.src != null) { preview.src = null }
            preview.pause()
            preview.currentTime = 0
        })
    }
}

for (let a = 1; a <= 4; a++) {
    for (let b = 1; b <= 16; b++) {
        let beat = document.createElement('input')
        let c = 'track_' + a.toString()
        beat.type = 'button'
        beat.setAttribute('class', 'beat')
        beat.setAttribute('id', ((a - 1) * 16) + b )
        document.getElementById(c).appendChild(beat)
        let whitespace = document.createTextNode('\n')
        document.getElementById(c).appendChild(whitespace)

        beat.addEventListener('click', function() {
            if (selected[0] != null) {
                let d = ((page - 1) * 16) + b
                if (this.value == '') {
                    this.value = selected[0]
                    if (a == 1) { track1[d] = selected[0] }
                    if (a == 2) { track2[d] = selected[0] }
                    if (a == 3) { track3[d] = selected[0] }
                    if (a == 4) { track4[d] = selected[0] }
                }
                else {
                    this.value = ''
                    if (a == 1) { delete track1[d] }
                    if (a == 2) { delete track2[d] }
                    if (a == 3) { delete track3[d] }
                    if (a == 4) { delete track4[d] }
                }
            }
        })
    }
}

document.getElementById('playbtn').addEventListener('click', function() {
    if (playing == false) {
        playing = true
        this.value = 'stop'
        player()
        timer = window.setInterval(player, 2000)

    }
    else {
        playing = false
        this.value = 'play'
        window.clearInterval(timer)
        timer = 0
        tempo = 0
        for (let a = 1; a < aud.length; a++) {
            if (aud[a] != undefined) {
                aud[a].pause()
                delete aud[a]
            }
        }
        aud[0] = 0
    }
})

function player() {
    tempo = tempo + 1

    if (track1[tempo - 1] != undefined) {
        aud[0] = aud[0] + 1
        aud[aud[0]] = document.createElement('audio')
        let b = track1[tempo - 1].split('')
        let c = 'Trax/' + packs[selected[b[0]]] + '/' + (letter.indexOf(b[1]) + 1) + '.mp3'
        aud[aud[0]].src = c
        aud[aud[0]].currentTime = 0
        aud[aud[0]].play()
    }

    if (track2[tempo - 1] != undefined) {
        aud[0] = aud[0] + 1
        aud[aud[0]] = document.createElement('audio')
        let b = track2[tempo - 1].split('')
        let c = 'Trax/' + packs[selected[b[0]]] + '/' + (letter.indexOf(b[1]) + 1) + '.mp3'
        aud[aud[0]].src = c
        aud[aud[0]].currentTime = 0
        aud[aud[0]].play()
    }

    if (track3[tempo - 1] != undefined) {
        aud[0] = aud[0] + 1
        aud[aud[0]] = document.createElement('audio')
        let b = track3[tempo - 1].split('')
        let c = 'Trax/' + packs[selected[b[0]]] + '/' + (letter.indexOf(b[1]) + 1) + '.mp3'
        aud[aud[0]].src = c
        aud[aud[0]].currentTime = 0
        aud[aud[0]].play()
    }

    if (track4[tempo - 1] != undefined) {
        aud[0] = aud[0] + 1
        aud[aud[0]] = document.createElement('audio')
        let b = track4[tempo - 1].split('')
        let c = 'Trax/' + packs[selected[b[0]]] + '/' + (letter.indexOf(b[1]) + 1) + '.mp3'
        aud[aud[0]].src = c
        aud[aud[0]].currentTime = 0
        aud[aud[0]].play()
    }
}

document.getElementById('goleft').addEventListener('click', function() {
    if (page != 1) {
        page = page - 1
        changepage()
    }
})

document.getElementById('goright').addEventListener('click', function() {
    page = page + 1
    if (pages < page) {
        pages = page
    }
    changepage()
})

function changepage() {
    for (let a = 1; a <= 4; a++) {
        for (let b = 1; b <= 16; b++) {
            let c = ((a - 1) * 16) + b
            let d = ((page - 1) * 16) + b
            document.getElementById(c).value = ''
            if (c <= 16) { if (track1[d] != undefined) { document.getElementById(c).value = track1[d] } }
            else if (c <= 32) { if (track2[d] != undefined) { document.getElementById(c).value = track2[d] } }
            else if (c <= 48) { if (track3[d] != undefined) { document.getElementById(c).value = track3[d] } }
            else if (c <= 64) { if (track4[d] != undefined) { document.getElementById(c).value = track4[d] } }
        }
    }
    console.log('page: ' + page + ', pages: ' + pages)
}

document.getElementById('savebtn').addEventListener('click', function() {
    let trax = []
    let text = ''
    for (let a = 1; a <= 4; a++) {
        if (selected[a] != undefined) {
            if (a != 4) {
                text = text + selected[a] + ','
            }
            else {
                text = text + selected[a]
            }
        }
        else {
            if (a != 4) {
                text = text + '-,'
            }
            else {
                text = text + '-'
            }
        }
    }
    trax.push(text)
    text = ''

    for (let a = 1; a < track1.length; a++) {
        let b = track1.length - 1
        if (track1[a] != undefined) {
            if (a != b) {
                text = text + track1[a] + ','
            }
            else {
                text = text + track1[a]
            }
        }
        else {
            if (a != b) {
                text = text + '-,'
            }
            else {
                text = text + '-'
            }
        }
    }
    trax.push(text)
    text = ''

    for (let a = 1; a < track2.length; a++) {
        let b = track2.length - 1
        if (track2[a] != undefined) {
            if (a != b) {
                text = text + track2[a] + ','
            }
            else {
                text = text + track2[a]
            }
        }
        else {
            if (a != b) {
                text = text + '-,'
            }
            else {
                text = text + '-'
            }
        }
    }
    trax.push(text)
    text = ''

    for (let a = 1; a < track3.length; a++) {
        let b = track3.length - 1
        if (track3[a] != undefined) {
            if (a != b) {
                text = text + track3[a] + ','
            }
            else {
                text = text + track3[a]
            }
        }
        else {
            if (a != b) {
                text = text + '-,'
            }
            else {
                text = text + '-'
            }
        }
    }
    trax.push(text)
    text = ''

    for (let a = 1; a < track4.length; a++) {
        let b = track4.length - 1
        if (track4[a] != undefined) {
            if (a != b) {
                text = text + track4[a] + ','
            }
            else {
                text = text + track4[a]
            }
        }
        else {
            if (a != b) {
                text = text + '-,'
            }
            else {
                text = text + '-'
            }
        }
    }
    trax.push(text)
    text = ''

    if (track1 != '' || track2 != '' || track3 != '' || track4 != '') {
        let save = document.createElement('a')
        save.href = URL.createObjectURL(new Blob([trax.join('\n')], {type: 'text/txt'}))
        save.download = 'song.notatrax'
        save.click()
    }
    else {
        alert('nothing to save don')
    }
})

document.getElementById('loadbtn').addEventListener('click', function() {
    let load = document.createElement('input')
    load.type = 'file'
    load.accept = '.notatrax'
    load.click()
    load.addEventListener('change', function() {
        let a = new FileReader()
        a.onload = function() {
            let b = a.result.split('\n')
            for (let c = 0; c < 5; c++) {
                let d = b[c].split(',')
                if (c == 0) {
                    for (let e = 0; e < 4; e++)  {
                        let img = 'packimg_' + (e + 1).toString()
                        let src = 'Trax/' + packs[d[e]] + '/pack.gif'
                        if (d[e] != undefined && d[e] != '-') {
                            selected[e + 1] = d[e]
                            document.getElementById(img).src = src
                        }
                        else {
                            delete selected[e + 1]
                            document.getElementById(img).src = ''
                        }
                    }
                }

                if (c == 1) {
                    track1 = []
                    for (let e = 0; e < d.length; e++) {
                        if (d[e] != '-') { track1[e + 1] = d[e] }
                        else {
                            if (track1[e + 1]) { delete track1[e + 1] }
                        }
                    }
                }

                if (c == 2) {
                    track2 = []
                    for (let e = 0; e < d.length; e++) {
                        if (d[e] != '-') { track2[e + 1] = d[e] }
                        else {
                            if (track2[e + 1]) { delete track2[e + 1] }
                        }
                    }
                }

                if (c == 3) {
                    track3 = []
                    for (let e = 0; e < d.length; e++) {
                        if (d[e] != '-') { track3[e + 1] = d[e] }
                        else {
                            if (track3[e + 1]) { delete track3[e + 1] }
                        }
                    }
                }

                if (c == 4) {
                    track4 = []
                    for (let e = 0; e < d.length; e++) {
                        if (d[e] != '-') { track4[e + 1] = d[e] }
                        else {
                            if (track4[e + 1]) { delete track4[e + 1] }
                        }
                    }
                }
            }
            pages = Math.floor(Math.max(track1.length, track2.length, track3.length, track4.length) / 16)
            changepage()
        }
        a.readAsText(this.files[0]);
        console.log(selected, track1, track2, track3, track4)
    })
})
