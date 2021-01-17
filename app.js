/*******************************************************************************************************************************
Allow the user to search for a GIF and when the form is submitted, make an AJAX request to the Giphy API and return a single GIF
Once the Giphy API has responded with data, append the GIF to the page
Allow the user to search for as many GIFs as they would like and keep appending them to the page
Allow the user to remove all of the GIFs by clicking a button
********************************************************************************************************************************/

const $gifArea = $("#gif-area");
const $searchInput = $("#search");

const addGif = res => {
    const numResults = res.data.length;
    if (numResults) {
        const randomIdx = Math.floor(Math.random() * numResults);
        const $newCol = $("<div>", { class: "col-md-4 col-12 mb-4" });
        const $newGif = $("<img>", {
            src: res.data[randomIdx].images.original.url,
            class: "w-100"
        });
        $newCol.append($newGif);
        $gifArea.append($newCol);
    }
}

$("form").on("submit", async function (evt) {
    evt.preventDefault();
    const searchTerm = $searchInput.val();
    $searchInput.val("");
    const response = await axios.get("http://api.giphy.com/v1/gifs/search", {
        params: {
            q: searchTerm,
            api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
        }
    });
    addGif(response.data);
});


$("#delete").on("click", () =>
    $gifArea.empty());

