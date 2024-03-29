var currentPage=1;
var username;
var perPage=10;
var totalPages;
function search()
{
    showLoader();
    username=document.querySelector(".searchBar").value;
    repos(perPage,currentPage,username)
    fetch("https://github-repos-listing-page.onrender.com/username",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({username})
    }).then((res=>res.json())).then((data)=>
    {
        document.querySelector(".personalInfoContainer").innerHTML=null
        document.querySelector(".socialInfoContainer").innerHTML=null
        document.querySelector(".numRepo").innerHTML=null;
        document.querySelector(".numRepo").innerHTML=`: ${data.public_repos}`
        const profileImg=document.querySelector(".profileImg");
        profileImg.src=data.avatar_url;
        var bio=data.bio;
        var location=data.location;
        if(!location)
        location="Location not available"
        if(!bio)
        bio="Bio not available"
        const personalInfo=document.createElement("div");
        personalInfo.className="card w-100";
        personalInfo.innerHTML=`<div class="row g-0">
        <div class="col-md-8">
          <div class="card-body">
            <a class="card-title" href=${data.html_url} style="font-size:1.25rem; text-underline-offset: 5px;">${data.name}</a>
            <h6>${location}</h6>
            <p class="card-text shareTech">
              ${bio}
            </p>
            <p class="card-text shareTech">
              <small class="text-body-secondary">Last updated: ${data.updated_at}</small><br>
              <small class="text-body-secondary"><strong>Followers: ${data.followers}</strong><br><strong>Following: ${data.following}</strong></small>
            </p>
          </div>
        </div>
      </div>`

      const socialCard=document.createElement("div");
      socialCard.className="card w-100";
      socialCard.innerHTML=`<div class="row g-0">
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">Others</h5>
          <p class="card-text w-100">
            <strong>Company:</strong> ${data.company}<br>
            <strong>Twitter:</strong> ${data.twitter_username}<br>
          </p>
        </div>
      </div>
    </div>`

      document.querySelector(".personalInfoContainer").append(personalInfo);
      document.querySelector(".socialInfoContainer").append(socialCard);
    }).finally(()=>hideLoader())
}
function repos(perPage,page,username)
{
  showLoader();
  check();
  document.querySelector(".reposContainer").innerHTML=null
  fetch("https://github-repos-listing-page.onrender.com/username/repos",{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({username,perPage,page})
  }).then((res=>res.json())).then((data)=>{
    totalPages=data.totalPages;
  const repositories=data.repositories;

  repositories.forEach((repo)=>{
    const cardContainer=document.createElement("div");
    const topics=[];
    repo.topics.forEach((topic)=>{
      const template=`<div class="topics">${topic}</div>`;
      topics.push(template);
    })

    const topicHTML=topics.join("");
    
    cardContainer.className="col-12 col-md-6 col-lg-4 col-xl-3 cardContainer";
    cardContainer.innerHTML=`
    <div class="card mb-3 w-100">
      <div class="row g-0">
        <div class="col-md-12">
          <div class="card-body">
            <a class="card-title translator" href=${repo.html_url}>${repo.name}</a>
            <p class="card-text shareTech">${repo.description}</p>
            <div class="card-text Poppins">
              ${topicHTML}
            </div>
          </div>
        </div>
      </div>
    </div>`
    document.querySelector(".reposContainer").append(cardContainer);
  })
  document.querySelector(".pageNum").innerHTML=`${currentPage}/${totalPages}`
}).finally(()=>hideLoader())
}

function next()
{
  currentPage++;
  check();
  repos(perPage,currentPage,username);
}

function previous()
{
  currentPage--;
  check();
  repos(perPage,currentPage,username);
}

function updatePerPage()
{
  perPage=document.querySelector("#perPageValue").value;
  currentPage=1;
  check();
  repos(perPage,currentPage,username);
}
function check()
{
  if(currentPage<Number(totalPages))
  {
    document.querySelector("#nextBtn").disabled=false;
  }
  if(currentPage==1)
  {
    document.querySelector("#prevBtn").disabled=true;
  }
  if(currentPage==totalPages)
  {
    document.querySelector("#nextBtn").disabled=true;
  }
  if(currentPage>1)
  {
    document.querySelector("#prevBtn").disabled=false;
  }
}
function showLoader()
{
  document.querySelector(".loaderContainer").style.display="block";
}
function hideLoader()
{
  document.querySelector(".loaderContainer").style.display="none";
}