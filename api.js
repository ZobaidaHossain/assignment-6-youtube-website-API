const navbar=()=>{
  const header=document.getElementById('navbar');
  const create_element=document.createElement('div');
  create_element.classList=`container mx-auto`
  create_element.innerHTML=`
  <div class="navbar bg-base-100 my-12 ">
  <div class="navbar-start">
    <a class="btn btn-ghost normal-case text-xl w-[9.25rem] md:w-[50%]"><img src="Logo.png" alt=""></a>
  </div>
  <div class="navbar-center">
          <a onclick="sort()" id="show-all-container" class="btn py-2.5 px-5">Sort By view</a>
  </div>
  <div class="navbar-end">
    <a class="btn bg-[#FF1F3D]" href="blog.html" target="_blank">blog</a>
  </div>
</div>
<hr>
  `
  header.appendChild(create_element);
}
navbar();

function parseViews(viewsString) {
// Remove non-numeric characters and convert to a number
return parseFloat(viewsString.replace(/[^0-9.]/g, ''));
}



//
const handleCategory=async()=>{
const response=await fetch("https://openapi.programming-hero.com/api/videos/categories");
const data=await response.json();

const tabContainer=document.getElementById('tab-container');

data.data.slice(0,4).forEach((category)=>{
  const div=document.createElement("div");
 
  div.innerHTML=`
  <a onclick="handleLoadNews('${category.category_id}')"class="tab">${category.category}</a> 
              
  `
  
  tabContainer.appendChild(div);
});
};

const handleLoadNews=async(categoryId)=>{
const response=await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
const data=await response.json();

const cardContainer=document.getElementById("card-container");
cardContainer.innerHTML="";

const cardContainer2=document.getElementById("ops");
cardContainer2.innerHTML="";


if (!data.data.length) {
  const div = document.createElement("div");
  div.innerHTML = `
    <div class=" mt-20 md:mt-52 flex items-center justify-center flex-col">
      <img src="Icon.png"/>
      <p class="text-5xl text-bold">Oops!! Sorry, There is no content here</p>
    </div>
  `;
  cardContainer2.appendChild(div);
}
else{
   const sortedData = data.data.slice().sort((a, b) => {
        // Convert string views to numbers for comparison
        const viewsA = parseViews(a.others.views);
        const viewsB = parseViews(b.others.views);

        return viewsB - viewsA;
      });
  
      sortedData.forEach((news)=>{
const div=document.createElement('div');
div.classList=`card w-[19rem] bg-base-100 shadow-xl flex flex-col`;
const hours=`${news?.others?.posted_date}`;
const hour=parseInt(hours/3600);
const mins=hours%3600;
const min=parseInt(mins/60);

div.innerHTML=`

<figure><img class="w-full h-[10rem] object-cover" src="${news?.thumbnail}"/>
${
news?.others?.posted_date
  ? `<p class="text-[10px] font-normal ml-[-115px] mt-[119px] px-[4px] py-[4px] rounded-none bg-black text-white">${hour} hrs ${min} mins ago</p>`
  : '' 
}

</figure>
<div class=" card-body">
  <div class="flex items-center">
  <img class=" w-14 h-14 rounded-full "src="${news?.authors[0]?.profile_picture}" alt="">
  <h4 class="text-base font-bold ml-3">${news?.title}</h4>
</div>
 <div class="flex items-center">                   
 <h2 class="mt-[-1rem] text-sm font-normal ml-[4.4rem]">
      ${news?.authors[0]?.profile_name}
      <div class="badge "> ${news?.authors[0]?.verified?'<img src="verified.svg">':""}</div>                      
    </h2>                     
 </div>
 <p class="text-sm font-normal ml-[4.4rem]">${news?.others?.views}</p>    </div>              


`;
cardContainer.appendChild(div);

});
}
};

handleCategory();
handleLoadNews("1000");

