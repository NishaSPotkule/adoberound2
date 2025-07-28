// Load outline from JSON
fetch("outline.json")
  .then((res) => res.json())
  .then((data) => {
    const list = document.getElementById("outlineList");
    data.outline.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.level} - ${item.text} (Page ${item.page})`;
      li.addEventListener("click", () => jumpToPage(item.page));
      list.appendChild(li);
    });
  });

// Adobe PDF Embed API setup
document.addEventListener("adobe_dc_view_sdk.ready", function () {
  var adobeDCView = new AdobeDC.View({
    clientId: "7b05155722114936982902b243f41134", // replace this
    divId: "adobe-dc-view"
  });

  adobeDCView.previewFile({
    content: {
      location: {
        url: "sample.pdf" // replace with your PDF path
      }
    },
    metaData: { fileName: "sample.pdf" }
  }, {
    embedMode: "SIZED_CONTAINER"
  });

  // Save viewer reference globally to jump to pages
  window.viewerRef = adobeDCView;
});

// Function to jump to a specific page
function jumpToPage(pageNum) {
  if (window.viewerRef) {
    window.viewerRef.getAPIs().then((apis) => {
      apis.gotoLocation({ pageNumber: pageNum });
    });
  }
}
