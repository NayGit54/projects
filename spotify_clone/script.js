
// Song Collection
const songs = [
    {
        title: "It's Always Blue",
        artist: "Your Playlist",
        cover: "covers/1.jpg",
        file: "songs/1.mp3"
    },
    {
        title: "Song 2",
        artist: "Your Playlist",
        cover: "covers/2.jpg",
        file: "songs/2.mp3"
    },
    {
        title: "Song 3",
        artist: "Your Playlist",
        cover: "covers/3.jpg",
        file: "songs/3.mp3"
    },
    {
        title: "Song 4",
        artist: "Your Playlist",
        cover: "covers/4.jpg",
        file: "songs/4.mp3"
    },
    {
        title: "Song 5",
        artist: "Your Playlist",
        cover: "covers/5.jpg",
        file: "songs/5.mp3"
    },
    {
        title: "Song 6",
        artist: "Your Playlist",
        cover: "covers/6.jpg",
        file: "songs/6.mp3"
    },
    {
        title: "Song 7",
        artist: "Your Playlist",
        cover: "covers/7.jpg",
        file: "songs/7.mp3"
    },
    {
        title: "Song 8",
        artist: "Your Playlist",
        cover: "covers/8.jpg",
        file: "songs/8.mp3"
    },
    {
        title: "Song 9",
        artist: "Your Playlist",
        cover: "covers/9.jpg",
        file: "songs/9.mp3"
    },
    {
        title: "Song 10",
        artist: "Your Playlist",
        cover: "covers/10.jpg",
        file: "songs/10.mp3"
    }
];

// HTML Elements
const songList = document.getElementById("songList");
const audioPlayer = document.getElementById("audioPlayer");

const playerCover = document.getElementById("playerCover");
const playerTitle = document.getElementById("playerTitle");
const playerArtist = document.getElementById("playerArtist");

const playBtn = document.getElementById("playBtn");
const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");

const progressBar = document.getElementById("progressBar");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

let currentSongIndex = 0;

// Display Songs
function displaySongs() {
    songList.innerHTML = "";

    songs.forEach((song, index) => {

        const songCard = document.createElement("div");
        songCard.classList.add("songItem");

        songCard.innerHTML = `
            <img src="${song.cover}" alt="${song.title} cover">

            <h3>${song.title}</h3>

            <p>${song.artist}</p>

            <button class="card-play" aria-label="Play ${song.title}">
                ▶
            </button>
        `;

        songCard.addEventListener("click", () => {
            playSong(index);
        });

        songList.appendChild(songCard);
    });

    document.getElementById("songCount").textContent =
        `${songs.length} Songs`;
}

// Load Song
function loadSong(index) {

    currentSongIndex = index;

    const song = songs[currentSongIndex];

    audioPlayer.src = song.file;

    playerCover.src = song.cover;
    playerTitle.textContent = song.title;
    playerArtist.textContent = song.artist;

    progressBar.value = 0;
    currentTime.textContent = "0:00";
    duration.textContent = "0:00";

    updateActiveSong();
}

// Play Song
function playSong(index) {

    loadSong(index);

    audioPlayer.play()
        .then(() => {
            playBtn.textContent = "Ⅱ";
        })
        .catch(error => {
            console.error("Unable to play this song:", error);
            playBtn.textContent = "▶";
        });
}

// Play and Pause
playBtn.addEventListener("click", () => {

    if (audioPlayer.paused) {

        audioPlayer.play()
            .then(() => {
                playBtn.textContent = "Ⅱ";
            })
            .catch(error => {
                console.error("Playback error:", error);
            });

    } else {

        audioPlayer.pause();
        playBtn.textContent = "▶";
    }
});

// Next Song
nextBtn.addEventListener("click", () => {

    currentSongIndex++;

    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }

    playSong(currentSongIndex);
});

// Previous Song
previousBtn.addEventListener("click", () => {

    if (audioPlayer.currentTime > 3) {

        audioPlayer.currentTime = 0;

    } else {

        currentSongIndex--;

        if (currentSongIndex < 0) {
            currentSongIndex = songs.length - 1;
        }

        playSong(currentSongIndex);
    }
});

// Update Progress Bar
audioPlayer.addEventListener("timeupdate", () => {

    if (audioPlayer.duration) {

        const progress =
            (audioPlayer.currentTime / audioPlayer.duration) * 100;

        progressBar.value = progress;

        currentTime.textContent =
            formatTime(audioPlayer.currentTime);
    }
});

// Load Duration
audioPlayer.addEventListener("loadedmetadata", () => {

    duration.textContent = formatTime(audioPlayer.duration);

});

// Seek Through Song
progressBar.addEventListener("input", () => {

    if (audioPlayer.duration) {

        audioPlayer.currentTime =
            (progressBar.value / 100) * audioPlayer.duration;
    }
});

// Automatically Play Next Song
audioPlayer.addEventListener("ended", () => {

    currentSongIndex++;

    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }

    playSong(currentSongIndex);
});

// Format Time
function formatTime(seconds) {

    if (!Number.isFinite(seconds)) {
        return "0:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${minutes}:${remainingSeconds
        .toString()
        .padStart(2, "0")}`;
}

// Highlight Active Song
function updateActiveSong() {

    const songCards = document.querySelectorAll(".songItem");

    songCards.forEach((card, index) => {

        if (index === currentSongIndex) {
            card.classList.add("active");
        } else {
            card.classList.remove("active");
        }
    });
}

// Initialize Player
displaySongs();
loadSong(0);
