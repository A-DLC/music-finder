//select dom elements
const form = document.getElementById("form");
const search = document.getElementById("search");
const loading = document.querySelector(".loading");
const result = document.querySelector(".result");
const avatarContainer = document.querySelector(".avatar-container");

//display songs
const displaySongs = (arrSongs) => {
  //Display artist photo
  avatarContainer.innerHTML = `<img
class="avatar"
src=${arrSongs[0].artist.picture}
alt="artist phpto"
/>`;
  console.log(arrSongs[0].artist.picture);
  const output = arrSongs?.map((song) => {
    return `
      <div class="card">
      <p><strong>${song.artist.name}</strong> - <span>${song.title}</span></p>
      <audio id="audio" controls>
        <source src=${song.preview} type="audio/mpeg" />
        Your browswer does not support audio element
      </audio>
    </div>
      
      `;
  });
  //display to DOM
  result.innerHTML = output.join("");
};

//search for artists
const searchSong = async (searchTerm) => {
  loading.innerHTML = "Please wait....";
  try {
    const res = await fetch(
      `https://deezerdevs-deezer.p.rapidapi.com/search?q=${searchTerm}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
          "X-RapidAPI-Key":
            "c75baf9a5dmshc0494dc3484e3a0p1a0bb1jsn79bef0eba80a",
        },
      }
    );
    const songsFetched = await res?.json();
    loading.innerHTML = "";
    // call the display songs fn
    displaySongs(songsFetched.data);
  } catch (err) {
    console.log(err);
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  //get value from the input field
  const searchItem = search.value;

  if (!searchItem) {
    alert("Please provide song title or artist name");
  } else {
    //call the fn
    searchSong(searchItem);
  }
});
