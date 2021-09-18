// Code to create nasa card

document.querySelector("#search").addEventListener("click", getNasa)

function clearField() {
  document.querySelector("#startDate").value = ""
  document.querySelector("#endDate").value = ""
}

async function getNasa() {
  document.querySelector("#nasaInfo1").innerHTML = ""
  try {
    const startChoice = document.querySelector("#startDate").value
    const endChoice = document.querySelector("#endDate").value
    const url = `https://api.nasa.gov/planetary/apod?api_key=st3faDd0Ak3E71UXcdol9ATUQaCjOT8rV8sIrztu&start_date=${startChoice}&end_date=${endChoice}`
    const nasaInfo = await fetch(url)
    const nasaInfoData = await nasaInfo.json()
    console.log(nasaInfoData)

    for (let j = 0; j < nasaInfoData.length; j++) {
      console.log(nasaInfoData[j])
      createNasaCard(nasaInfoData[j])
    }

    // createNasaCard(nasaInfoData)
    clearField()
  } catch (err) {
    console.log(err)
  }
}

const createNasaCard = (nasaItem) => {
  document.querySelector("#nasaInfo1").insertAdjacentHTML(
    "beforeend",
    `
    <section class="container my-5">
    <div class="row g-3">
        <div class="col-lg-6">
        <script> 
        if("${nasaItem.media_type}" === "image"){
          <img src="${nasaItem.url}" alt="Nasa Image of the Day" class="w-100 h-60 shadow" >
        } else if("${nasaItem.media_type}" === "video"){
          <iframe src="${nasaItem.url}" frameborder="0"></iframe>
        }
        </script>
            
        </div>
            <div class="col-lg-6">
              <div class="p-d mt-4">
                    <h5 class="card-title">${nasaItem.title}</h5>
                    <p class="card-text">${nasaItem.date}</p>
                    <div class="collapse-content">
                    <h4>Description</h4>
                    <p id="collapseContent" class="card-text collapse.show">${nasaItem.explanation}</p>
                    <div class="d-flex justify-content-between">
                    <a class="btn btn-dark" data-toggle="collapse" href="#collapseContent" role="button" aria-expanded="false" aria-controls="collapseExample">Read More</a>
                     <div>
                 <button>
                    <i id="heart" class="fas fa-heart hidden fa-lg p-1 my-1 mr-3" data-toggle="tooltip" data-placement="top" title="I like it"></i><button>
                    <a class="share-btn share-btn-lg share-btn-more"
                    href="share.html"> <i class="fas fa-share fa-lg p-1 my-1" data-toggle="tooltip" data-placement="top" title="Share options"></i></a>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
   </section>`
  )

  // Code to toggle the color of the "heart" icon//

  document.querySelector("button").addEventListener("click", function () {
    const icon = this.querySelector("i")

    if (
      icon.classList.contains("fa-heart") &&
      icon.classList.contains("hidden")
    ) {
      icon.classList.remove("hidden")
      icon.classList.add("active")
    } else if (
      icon.classList.contains("fa-heart") &&
      icon.classList.contains("active")
    ) {
      icon.classList.remove("fa-heart")
      icon.classList.add("fa-heart-broken")
      icon.classList.remove("active")
      icon.classList.add("hidden")
    } else if (
      icon.classList.contains("fa-heart-broken") &&
      icon.classList.contains("hidden")
    ) {
      icon.classList.add("fa-heart")
      icon.classList.remove("fa-heart-broken")
      icon.classList.add("active")
      icon.classList.remove("hidden")
    }
  })

  // code to trigger share link//
  ;(function () {
    const shareButtons = document.querySelectorAll(".share-btn")

    if (shareButtons) {
      ;[].forEach.call(shareButtons, function (button) {
        button.addEventListener("click", function (event) {
          let width = 650,
            height = 450

          event.preventDefault()

          window.open(
            this.href,
            "Share Dialog",
            "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=" +
              width +
              ",height=" +
              height +
              ",top=" +
              (screen.height / 2 - height / 2) +
              ",left=" +
              (screen.width / 2 - width / 2)
          )
        })
      })
    }
  })()
}
