const form = document.querySelector('form').addEventListener('submit', preventMyDefault)

function preventMyDefault(event) {
  event.preventDefault()
  getNasa()
 
}

//Start of function to clear out data from input form 

function clearField() {
  document.querySelector("#startDate").value = ""
  document.querySelector("#endDate").value = ""
}

//End of function to clear out data from input form 

//Start of function to fetch data from Nasa API 

async function getNasa() {
  document.querySelector("#nasaInfo1").innerHTML = ""
  try {
    const startChoice = document.querySelector("#startDate").value
    const endChoice = document.querySelector("#endDate").value
    document.querySelector(
      "#nasaHeader"
    ).innerHTML = `NASA's Astronomy Picture of the Day: Dates Ranging from ${startChoice} through ${endChoice}`

    const url = `https://api.nasa.gov/planetary/apod?api_key=BaLxK7SN6bapnfimqldwfMNHtOEkwYeqNXvBSO1d&start_date=${startChoice}&end_date=${endChoice}`
    const nasaInfo = await fetch(url)
    const nasaInfoData = await nasaInfo.json()
    console.log(nasaInfoData)
    // Loop to render all cards within the fetch 
    for (let j = 0; j < nasaInfoData.length; j++) {
      createNasaCard(nasaInfoData[j])
    }

    //run clear field function 
    clearField()

    //when code is rendered scroll to ideal location for user 
    document.getElementById("nasaHeader").scrollIntoView()
  } catch (err) {
    console.log(err)
  }
}

// Start of creating the Nasa Cards

const createNasaCard = (nasaItem) => {
  document.querySelector("#nasaInfo1").insertAdjacentHTML(
    "beforeend",
    `
    <section class="container4 my-5">
    <div class="row g-3">
        <div class="col-lg-6">
        ${
          nasaItem.media_type === "image"
            ? `<a href=${nasaItem.hdurl} target="_blank" title="Link to enlarged image"><img src="${nasaItem.url}" alt="Nasa Image of the Day" class="w-100 h-60 shadow"></a>`
            : nasaItem.media_type === "video"
            ? `<iframe src="${nasaItem.url}" frameborder="0" class="w-100 h-100"></iframe>`
            : ""
        }
        </div>
            <div class="col-lg-6">
              <div class="p-d mt-4">
                    <h3 class="card-title">${nasaItem.title}</h3>
                    <p class="card-text">Date: ${nasaItem.date}</p>
                    <div class="collapse-content">
                      <h5>Description:</h5>
                      <p id="collapseContentPara-${
                        nasaItem.date
                      }""  class="card-text collapse.show readMorePara readMorePara-${
      nasaItem.date
    } hiddenPara">${nasaItem.explanation}</p>
                    <div class="d-flex justify-content-between">
                      <a id="collapseContentBTN-${
                        nasaItem.date
                      }" class="btn btn-dark readBtn" data-toggle="collapse" href="#collapseContent" role="button" aria-expanded="false" aria-controls="collapseExample"><span class="readSpan readSpan-${
      nasaItem.date
    }">Read More</span></a>
                    <div>
                        <i id="heartBTN-${
                          nasaItem.date
                        }" class="fas fa-heart hidden heart fa-lg p-1 my-1 mr-3" tabindex="0" aria-label="like content" title="I like it"><span class="likeSpan likeSpan${
      nasaItem.date
    }">Like Me</span></i>
                     
                    <a id="shareBTN-${
                      nasaItem.date
                    }" class="share-btn share-btn-lg share-btn-more"
                      href="share.html"><i class="fas fa-share fa-lg p-1 my-1" aria-label="share content" title="Share options"><span class="shareSpan">Share<span></i>
                    </a>
                    </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
   </section>`
  )
  //End of Nasa Card

  //Start of code for like and unlike

  document
    .querySelector(`#heartBTN-${nasaItem.date}`)
    .addEventListener("click", function (event) {
      const icon = event.target
      const heartBTNText = document.querySelector(`.likeSpan${nasaItem.date}`)

      if (
        icon.classList.contains("fa-heart") &&
        icon.classList.contains("hidden")
      ) {
        icon.classList.remove("hidden")
        icon.classList.add("active")
        heartBTNText.innerHTML = "Liked!"
      } else if (
        icon.classList.contains("fa-heart") &&
        icon.classList.contains("active")
      ) {
        icon.classList.remove("fa-heart")
        icon.classList.add("fa-heart-broken")
        icon.classList.remove("active")
        icon.classList.add("hidden")
        heartBTNText.innerHTML = "Unliked"
      } else if (
        icon.classList.contains("fa-heart-broken") &&
        icon.classList.contains("hidden")
      ) {
        icon.classList.add("fa-heart")
        icon.classList.remove("fa-heart-broken")
        icon.classList.add("active")
        icon.classList.remove("hidden")
        heartBTNText.innerHTML = "Liked!"
      }
    })

  //End of code to like and unlike

  // Start of code to trigger share link

  document
    .querySelector(`#shareBTN-${nasaItem.date}`)
    .addEventListener("click", function (event) {
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
  //End of code to trigger share link

  //Start of code for Read More

  document
    .querySelector(`#collapseContentBTN-${nasaItem.date}`)
    .addEventListener("click", function () {
      const readMorePara = document.querySelector(
        `.readMorePara-${nasaItem.date}`
      )
      const readBTNText = document.querySelector(`.readSpan-${nasaItem.date}`)

      if (
        readMorePara.classList.contains("readMorePara") &&
        readMorePara.classList.contains("hiddenPara")
      ) {
        readMorePara.classList.remove("hiddenPara")
        readMorePara.classList.add("activePara")
        readBTNText.innerHTML = "Read Less"
      } else if (
        readMorePara.classList.contains("readMorePara") &&
        readMorePara.classList.contains("activePara")
      ) {
        readMorePara.classList.remove("activePara")
        readMorePara.classList.add("hiddenPara")
        readBTNText.innerHTML = "Read More"
      }
    })

  //End of code for Read More
}
