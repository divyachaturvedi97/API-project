const apiData = document.querySelector('.apidata');
const input_data = document.querySelector('.data_input');
const btn_search = document.querySelector('.btn_search');
const btn_back = document.querySelector('.btn_back');
const btn_moon = document.querySelector('.btn_moon');
const bx = document.querySelector('.bxs-moon');
const body = document.querySelector('.body');
let new_value = '';



btn_moon.addEventListener('click', function(){
    bx.classList.toggle('bxs-sun');
    if(bx.classList.contains('bxs-sun')){
        
    apiData.style.color ='white';
    body.style.backgroundColor = 'black';
    }
    else{
        apiData.style.color ='black';
        body.style.backgroundColor = 'white';   
    }
});


const cryptData = async function () {
    const newData = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=100&page=1&sparkline=false');
    const newResponse = await newData.json();
    console.log(newResponse);
   
  
    page_load(newResponse);

    btn_back.addEventListener('click', function(){
        apiData.innerHTML = '';
        input_data.value = '';
        page_load(newResponse);
    });
   

    btn_search.addEventListener('click', function(){
         new_value = input_data.value;
        console.log(new_value);
        newResponse.forEach(each => {
           
            if(new_value === each.name || new_value === each.name.toLowerCase()){

                apiData.innerHTML = `
    <div class="data_file">
    <img src="${each.image}"/>
 <div>${each.name}</div>
 <div class="datas">
 <div>$${each.current_price}</div>
 
 </div>
 <div class="mkt_cap">
 ${each.market_cap_change_percentage_24h}
 </div>
 <div>
 <div class="mkt">
   Coin Mkt Cap:
 </div>
 $${each.market_cap}
</div>
 </div>`;
}


        });
        let mkt_cap = document.querySelectorAll('.mkt_cap');
    
    mkt_cap.forEach(every => {
        if(every.textContent > 0){
            every.style.color = 'green';
         } else{
             every.style.color = 'red';
         }
    });
       });
}

cryptData();

const page_load = function(response){
    response.forEach((element) => {

        apiData.insertAdjacentHTML('beforeend', `
    <div class="data_file">
    <img src="${element.image}"/>
 <div>${element.name}</div>
 <div class="datas">
 <div>$${element.current_price}</div>
 
 </div>
 <div class="mkt_cap">${element.market_cap_change_percentage_24h}</div>
 
 <div>
 <div class="mkt">
   Coin Mkt Cap:
 </div>
 $${element.market_cap}
</div>
 </div>`);


    });
    let mkt_cap = document.querySelectorAll('.mkt_cap');
    
    mkt_cap.forEach(every => {
        if(every.textContent > 0){
            every.style.color = 'green';
         } else{
             every.style.color = 'red';
         }
    })
   
}







