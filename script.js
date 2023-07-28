let progress = document.getElementById("progress");
        let song = document.getElementById("audioPlayer");
        let ctrlIcon = document.getElementById("cntrlIcon");
        let backwardBtn = document.getElementById("backwardBtn");
        let forwardBtn = document.getElementById("forwardBtn");
        let currentSongIndex = 0;

        const songs = [
            {
                path: 'media/song1.mp3',
                coverArt: 'media/img1.png',
                artist: 'Justin Beiber',
                title: 'Sorry'
            },
            {
                path: 'media/song2.mp3',
                coverArt: 'media/img2.png',
                artist: 'Selena Gomez',
                title: 'Wolves'
            }

        ];

        song.onloadedmetadata = function(){
            progress.max = song.duration;
            progress.value = song.currentTime;
        }

        function playPause(){
            if(song.paused){
                song.play();
                ctrlIcon.classList.add("fa-pause");
                ctrlIcon.classList.remove("fa-play");
            }
            else{
                song.pause();
                ctrlIcon.classList.remove("fa-pause");
                ctrlIcon.classList.add("fa-play");
            }
        }

        function updateMetadataUI(songInfo) {
            const songNameElement = document.getElementById("songName");
            const artistNameElement = document.getElementById("artistName");
            const coverArtElement = document.getElementById("coverArt");
    
            const title = songInfo.title || 'Unknown Title';
            const artist = songInfo.artist || 'Unknown Artist';
            const coverArt = songInfo.coverArt || 'default_cover_art.png';
            const audioPath = songInfo.path || '';
    
            songNameElement.textContent = title;
            artistNameElement.textContent = artist;
            coverArtElement.src = coverArt;
            song.src = audioPath;
            song.load();
        }
    
        function playNextSong() {
            currentSongIndex = (currentSongIndex + 1) % songs.length;
            updateMetadataUI(songs[currentSongIndex]);
            playPause();
        }
    
        function playPreviousSong() {
            currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
            updateMetadataUI(songs[currentSongIndex]);
            playPause();
        }

        setInterval(()=> {
            progress.value = song.currentTime;
        }, 500);

        progress.onchange = function(){
            song.currentTime = progress.value;
            ctrlIcon.classList.add("fa-pause");
            ctrlIcon.classList.remove("fa-play");
        }

        ctrlIcon.addEventListener("click", playPause);
        forwardBtn.addEventListener("click", playNextSong);
        backwardBtn.addEventListener("click", playPreviousSong);

        function initializeMusicPlayer() {
            updateMetadataUI(songs[currentSongIndex]); 
            
            if (song.paused) {
                ctrlIcon.classList.remove("fa-pause");
                ctrlIcon.classList.add("fa-play");
            } else {
                ctrlIcon.classList.add("fa-pause");
                ctrlIcon.classList.remove("fa-play");
            }
        }

        window.addEventListener('load', initializeMusicPlayer);