let data = {};
let Apidate = [];
let hisRate = [];
function init(){
    //http://data.fixer.io/api/2020-12-31?access_key=7ddf0cca508c63297f0a700c18740446&format=1&%20base%20=%20GB&%20symbols%20=%20USD,TND,EUR
    axios.get('http://data.fixer.io/api/latest?access_key=7ddf0cca508c63297f0a700c18740446&format=1')
    .then(function (response) {
      // handle success
      //console.log(response);
      data = response;
      console.log(data);
        ratePut();
        dateNum();
    });
    let hisDate=[];
    for (let i=0;i<5;i++) {
      let today = new Date();
      let nowDate = today.getDate()-i;
      let nowyear = today.getFullYear();
      let nowMonth = today.getMonth()+1;
      let date = `${nowyear}-0${nowMonth}-${nowDate}`;
      hisDate.push(date);
    }
    Apidate = hisDate.reverse();
    console.log(Apidate);
    //getHisrate();
    for(let i =0;i<5;i++){
      axios.get(`http://data.fixer.io/api/${Apidate[i]}?access_key=7ddf0cca508c63297f0a700c18740446&format=1&%20base%20=%20GB&%20symbols%20=%20USD,TND,EUR`)
      .then(function (response) {
        // handle success
        //console.log(response.data.rates.TND.toFixed(3));
        //hisRate.push(   Number(response.data.rates.TND.toFixed(3))   );
    
        hisRate.push( Number(response.data.rates.TND.toFixed(3)) );
    
      });
        
      };
    
      hisRate.unshift("TND");
    
      console.log(hisRate[1]);
      chartH();
};
// function  getHisrate() {
//   for(let i =0;i<5;i++){
//   axios.get(`http://data.fixer.io/api/${Apidate[i]}?access_key=7ddf0cca508c63297f0a700c18740446&format=1&%20base%20=%20GB&%20symbols%20=%20USD,TND,EUR`)
//   .then(function (response) {
//     // handle success
//     //console.log(response.data.rates.TND.toFixed(3));
//     //hisRate.push(   Number(response.data.rates.TND.toFixed(3))   );

//     hisRate.push( Number(response.data.rates.TND.toFixed(3)) );

//   });
    
//   };

//   hisRate.unshift("TND");

//   console.log(hisRate[1]);
//   chartH();
// }
 
function ratePut(){
    //div範例
    let rate = [];//最終資料
    let showTable = document.querySelector("tbody")
    const country = Object.keys(data.data.rates);// 抓出api的國家
    //console.log(country);
    //用迴圈建立有country的值加上該國家的匯率的陣列，資料整理
    country.forEach(function(item,index){     
            let ctry = item;
            let Num = data.data.rates[ctry];
            //console.log(ctry);
            // console.log(Num);
            const obj = {};
            obj.coun  =ctry;
            obj.rat = Num;
            obj.date = data.data.date;
         //console.log(obj);
         rate.push(obj);
     });
     console.log(rate);
     let rateH ='';
     //把資料列在table上
    rate.forEach(function(item,index){
        let rateAdd = `<tr >
        <td>${index+1}</td>
        <td>${item.coun}</td>
        <td>${item.rat}</td>
        <td>${item.date}</td>
        <td><a href =# >查詢</a></td>
      </tr>`
      rateH += rateAdd;
    });
     showTable.innerHTML = rateH;
};
function chartH(){
    var chart = c3.generate({
        bindto: '#chart',
        data: {
          columns: [
           // [hisRate[0], 3.264, 3.26, 3.271, 3.272, 3.275],
            hisRate,
          ]
        }
        
    });
    console.log(hisRate);
};
let meu = document.querySelector("#menuTnd");
console.log(meu.textContent);
//計算日期
function dateNum(){
  //   let hisDate=[];
  // for (let i=0;i<5;i++) {
  //   let today = new Date();
  //   let nowDate = today.getDate()-i;
  //   let nowyear = today.getFullYear();
  //   let nowMonth = today.getMonth()+1;
  //   let date = `${nowyear}-0${nowMonth}-${nowDate}`;
  //   hisDate.push(date);
  // }
  // Apidate = hisDate.reverse();
  // console.log(Apidate);
  // getHisrate();
};

init();