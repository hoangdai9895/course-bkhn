const loop = setInterval(() => {
  // console.log("a");

  let tr = document.querySelector(".item-lead.odd");

  let y = document.querySelector(".item-lead.editing.odd");
  let url = tr && tr.getAttribute("data-route-edit");

  if (tr && !tr.classList.contains("has-notes")) {
    if (url && !y) {
      clearInterval(loop);
      window.location.href = url;
      console.log("Clicked to the white row !!!");
    }
  } else {
    // "https://zoma.com.vn/app/lead" === window.location.href &&
    //   window.location.reload();
  }
}, 100);
