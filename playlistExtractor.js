function populatePlaylists(field, fromToIndices) {
  field = "Learn ".concat(field);
  console.log("Start fetching playlists for ", field);
  gapi.client.setApiKey("AIzaSyAya7y971pPxYE4no2UW7DtGvZvAAdSIQ4");
  gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest").then(function () {
    console.log("Start fetching playlists ", field);
    var json = gapi.client.youtube.search.list({
      "part": "snippet",
      "maxResults": 3,
      "q": field,
      "type": "playlist"
    }).then(function (response) {
      var i;
      console.log("Response", response);
      console.log("Indices[0]", fromToIndices[0]);
      for (i = 0; i < response.result.items.length && fromToIndices[0] < fromToIndices[1]; i++, fromToIndices[0]++) {
        console.log(i + response.result.items[i].id);
        var playlistid = response.result.items[i].id['playlistId'];
        var url = 'https://www.youtube.com/playlist?list=' + playlistid;

        console.log(i + response.result.items[i].snippet['title']);
        var name = response.result.items[i].snippet['title'];

        console.log(i + response.result.items[i].snippet['description']);
        var description = response.result.items[i].snippet['description'];

        console.log(i + "Image" + response.result.items[i].snippet.thumbnails['high']['url']);
        var image = response.result.items[i].snippet.thumbnails['high']['url'];

        console.log(i + "Author" + response.result.items[i].snippet.channelTitle);
        var author = response.result.items[i].snippet.channelTitle;

        index = fromToIndices[0];
        console.log("Index:", index);
        document.getElementById("item".concat(index.toString())).style.display = 'block';

        let txtTitle = document.getElementById("title".concat(index.toString()));
        let link = document.getElementById("link".concat(index.toString()));
        let txtAuthor = document.getElementById("author".concat(index.toString()));
        let txtContent = document.getElementById("content".concat(index.toString()));
        let thumbnail = document.getElementById("thumbnail".concat(index.toString()));
        let price = document.getElementById("price".concat(index.toString()));
        let btnAdd = document.getElementById("btnAdd".concat(index.toString()));

        txtTitle.innerHTML = name;
        txtAuthor.innerHTML = author;
        txtContent.innerHTML = description;
        thumbnail.src = image;
        price.innerHTML = "$".concat("0");
        link.href = url;
      }

    });
  });
}
gapi.load("client");
