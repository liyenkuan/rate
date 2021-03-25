let data = {};
function init(){
    //http://data.fixer.io/api/2020-12-31?access_key=7ddf0cca508c63297f0a700c18740446&format=1&%20base%20=%20GB&%20symbols%20=%20USD,TND,EUR
    axios.get('http://data.fixer.io/api/latest?access_key=7ddf0cca508c63297f0a700c18740446&format=1')
    .then(function (response) {
      // handle success
      //console.log(response);
      data = response;
      console.log(data);
        ratePut();
        chartH();
    });

};
 
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
        let rateAdd = `<tr>
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
            ['data1', 30, 200, 100, 400, 150, 250],
          
          ]
        }
    });
    
};
let meu = document.querySelector("#menuTnd");
console.log(meu.textContent);
let today = new Date();
console.log(today.getDate() );

init();