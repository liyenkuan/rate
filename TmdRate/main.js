let data = {};//請求後的資料
let Apidate = [];//前五天日期
let hisR = [];//前五天的資料
let hisRate = [];//C3要的資料


let sel = document.querySelector(".selcun ");//選擇貨幣
function selRate() {
  console.log(hisR);
  let selValue = sel.value;
  console.log(selValue);
  hisRate[0] = selValue;
  hisRate[1] = hisR[0].data.rates[selValue];
  hisRate[2] = hisR[1].data.rates[selValue];
  hisRate[3] = hisR[2].data.rates[selValue];
  hisRate[4] = hisR[3].data.rates[selValue];
  hisRate[5] = hisR[4].data.rates[selValue];
  chartH();
}
sel.addEventListener("click",selRate);
function init(){

    //http://data.fixer.io/api/2020-12-31?access_key=7ddf0cca508c63297f0a700c18740446&format=1&%20base%20=%20GB&%20symbols%20=%20USD,TND,EUR
    axios.get('http://data.fixer.io/api/latest?access_key=7ddf0cca508c63297f0a700c18740446&format=1')
    .then(function (response) {
      // handle success
      //console.log(response);
      data = response;
      //console.log(data);
        ratePut();
    });
    let hisDate=[];//計算日期
    for (let i=0;i<5;i++) {
      let today = new Date();
      today = today.setDate( today.getDate()-i);
      today=new Date(today);
      let nowDate =today.getDate();
      //console.log(today.getDate());
      let nowyear = today.getFullYear();
      let nowMonth = today.getMonth()+1;
      if(nowMonth<10) {nowMonth =`0${nowMonth}`};
      if(nowDate<10){
        nowDate = `0${nowDate}`;
        //nowMonth =  `0${nowMonth}`;
       // console.log(nowMonth);
        let date = `${nowyear}-${nowMonth}-${nowDate}`;
        hisDate.push(date);
      }else{
        let date = `${nowyear}-${nowMonth}-${nowDate}`;
        hisDate.push(date);
      }
    }
    Apidate = hisDate.reverse();
    console.log(Apidate);
    //getHisrate();
    for(let i =0;i<5;i++){
      //載入歷史匯率
      // console.log(postRate);
      axios.get(`http://data.fixer.io/api/${Apidate[i]}?access_key=7ddf0cca508c63297f0a700c18740446&format=1&%20base%20=%20GB&%20symbols%20=%20USD,TND,EUR`)
      .then(function (response) {
        // handle success
        //console.log(response);
         hisRate.push(Number(response.data.rates.TWD.toFixed(3)));
        hisR.push(response);
         chartH();
      });
      };
      //console.log(hisR);
      hisRate.unshift("TWD");
      selRate();
      chartH();
      
      //console.log(hisRate[1]);
      
};
function ratePut(){
    //div範例
    let rate = [];//最終資料
    let showTable = document.querySelector("tbody")
    //const country = Object.keys(data.data.rates);// 抓出api的國家
    const country = ["USD","HKD","GBP","AUD","CAD","SGD","CHF","TWD","JPY","ZAR","SEK","NZD","THB","PHP","IDR","EUR","KRW","VND","MYR","CNY"];
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
//圖表
function chartH(){
 // console.log(hisR);
    var chart = c3.generate({
        bindto: '#chart',
        data: {
          columns: [
           // [hisRate[0], 3.264, 3.26, 3.271, 3.272, 3.275],
            hisRate,
          ]
        }
    });
};
let getClick  = document.querySelector(".clckOut");
console.log(getClick);
function countRate() {
  let total = '';
  let inputA = document.querySelector(".exchangeA ");
  let selone = document.querySelector(".seleA");
  let seltwo = document.querySelector(".seleB");
  let showResult = document.querySelector(".curValue");
  let selA = selone.value;
  let selB = seltwo.value;
  let warntext = document.querySelector(".addWarning")
  if (inputA.value==''){
    warntext.textContent = "請輸入數值";
  }else if(inputA.value <=0 ){
    warntext.textContent = "輸入數值不得低於0";
  }else{
  warntext.textContent = "";
  total = ((data.data.rates[selB]/ data.data.rates[selA])*inputA.value).toFixed(2);
  showResult.textContent =`${inputA.value}${selA}等於${total}${selB}`
  // console.log(total);
  // console.log(selA);
  // console.log(selB);
  // console.log(inputA.value);
  }
};
getClick.addEventListener("click",countRate);
init();
