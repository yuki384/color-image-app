//id,名前,色彩(Max10)彩度(Max10)輝度(Max10)に与える影響,色彩(Max360)彩度(Max100)輝度(Max100)の数値
var images = [
  {id:0, name:"さわやか", Ih:9,Is:7,Il:7, h:200,s:100,l:90},
  {id:1, name:"ポップ", Ih:0,Is:9,Il:8, h:50,s:100,l:55},
  {id:2, name:"明るい", Ih:0,Is:6,Il:9, h:50,s:100,l:90},
  {id:3, name:"若々しい", Ih:8,Is:4,Il:8, h:100,s:60,l:70},
  {id:4, name:"落ち着き", Ih:7,Is:7,Il:9, h:230,s:50,l:30},
  {id:5, name:"ロマンティック", Ih:5,Is:8,Il:8, h:340,s:100,l:90},
  {id:6, name:"エレガント", Ih:9,Is:4,Il:6, h:290,s:80,l:80}
];
var list = "";
for(var i=0,l=images.length;i<l;i++){
  list = list+'<input type="checkbox" id = "check_'+i+'"/><label for=check_'+i+' class="image">'+images[i].name+'</label>';
}
document.getElementById("image-list").innerHTML = list;

/**
 * `type`に対するプロパティ名の定義を返す
 * @param {string} type
 * @returns {{effect: string, value: string}}
 * @example
 * type: "色彩" の定義は "Ih"と"h"というプロパティで定義されている
 * getTypeKeys("色彩"); // { effect: "Ih", value: "h" }
 */
function getTypeKeys(type) {
  if (type === "色彩") {
    return {
      effect: "Ih",
      value: "h"
    };
  } else if (type === "彩度") {
    return {
      effect: "Is",
      value: "s"
    };
  } else if (type === "輝度") {
    return {
      effect: "Il",
      value: "l"
    };
  }
  throw new Error(type + "は未定義のtypeです")
}

function computeHSL(checkedImages, type) {
  var typeKey = getTypeKeys(type);
  // 影響度順にソートし直す
  // Array#sortは破壊的なメソッドなので、slice()でコピーしてからソートする
  var sortedCheckedImages = checkedImages.slice().sort(function (a, b) {
    return (a[typeKey.effect] > b[typeKey.effect]) ? -1 : 1;
  });
  var value = sortedCheckedImages[0][typeKey.value];
  for (var i = 1, l = sortedCheckedImages.length; i < l; i++) {
    var diff = value - sortedCheckedImages[i][typeKey.value];
    var z = value - ((diff / 10) * sortedCheckedImages[i][typeKey.effect]);
    value = (z + value) / 2;
  }
  return value;
}
function teian(){
  var checkedImages = [];
  var n = 0;
  for(var i=0,l=images.length;i<l;i++){
    var checkbox = document.getElementById("check_"+i);
    if (checkbox.checked){
      checkedImages[n]=images[i];
      n++;
    }
  }
  if(checkedImages.length === 0){
      alert("1つ以上のイメージを選択してください");
      return;
  }
  // HSLの値を計算する
  var h = computeHSL(checkedImages, "色彩");
  var s = computeHSL(checkedImages, "彩度");
  var eru = computeHSL(checkedImages, "輝度");
  document.getElementById("main-color").style.backgroundColor = "hsl("+h+","+s+"%,"+eru+"%)";
}
