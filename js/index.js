
var data = []
async function getPizza(){
  var res = await fetch("https://forkify-api.herokuapp.com/api/search?q=pizza")

  var resApi = await res.json()
  data = resApi.recipes
displayData()
  
}
getPizza()

function displayData(){
var cartona =``
for(i=0 ;i<data.length
   ;i++ ){
cartona+=`<div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <img src="${data[i].image_url}" alt="" />
              <h2>${data[i].title}</h2>
            </div>
          </div>
        </div>`
}
document.getElementById("rowData").innerHTML= cartona
}