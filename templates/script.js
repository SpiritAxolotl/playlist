function getPlaylistVideos() {
  const playlist = document.getElementById("playlistId").value;
  
  fetch(`/getvideos?playlist=${playlist}`)
    .then(response => response.text())
    .then(text => {
      if (text.startsWith("https://youtube.com")) {
        const links = text.split(";")
        links.forEach((element, index) => {
          setTimeout(() => {
            fetch("https://api.cobalt.tools/api/json", {
              method: "POST",
              headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                url: element,
                vCodec: "av1",
                vQuality: "1440",
                filenamePattern: "pretty",
                isAudioOnly: "true"
              })
            })
              .then(response => response.json())
              .then(content => {
                try {
                  if (content.url)
                    window.location = content.url;
                  else
                    console.warn(content);
                } catch {}
              });
          }, index * 3000);
        });
      } else alert(text);
    });
}