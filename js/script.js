// 英単語を覚えるゲーム(仮)
// (C) Lucas Shirai 2020/12/29
// やりたいこと：英単語の日本語と英語を保存して選択式（もしくはタイピング）で選ぶ、保存した答えとあっていれば正解、スピード感
// できた：
//  問題のlocalStorageへの保存
// やること：
// 問題をnavに表示 (q++), 開始時刻を記録
// 正解とは独立に不正解の選択肢を表示
// 正解を選択したら 〇 と音を鳴らす score++
// 不正解のときは × と音を鳴らす
// 全問(q=保存数)になったら score を表示して終了、時間を表示
// letはconuntの仲間。後で書き換え

// ボタンが押されたイベントの処理
$('#btn').on("click", function(){
    var text = $('#textarea').val();//入力欄の文字
    localStorage.setItem('access_count', text);
    window.localStorage.setItem('access_count', text);
    localStorage.access_count = text
    const textLength = text.length;//入力欄の文字数
    const Lastwold = text[textLength - 1];
});

// 問題保存ボタンが押されたときの処理
$('#saveBtn').on("click", function(){
    var Eitango = $('#Eitango').val();//入力欄の英単語
    localStorage.setItem('Eitango', Eitango);
    window.localStorage.setItem('Eitango', Eitango); //必要?
    localStorage.Eitango = Eitango
    var Nihongo = $('#Nihongo').val(); //入力欄の日本語
    localStorage.setItem('Nihongo', Nihongo);
    window.localStorage.setItem('Nihongo', Nihongo); //必要?
    localStorage.Nihongo = Nihongo;
//以下不要
//    const textLength = Eitango.length;//入力欄の文字数
//    const Lastwold = Eitango[textLength - 1];
});

// localStorageからデータを読み込む
text = localStorage.getItem('access_count');
text = window.localStorage.getItem('access_count');
text = localStorage.access_count
if (text) {
    alert(text);
} else {
    alert("問題セットを作成して保存してください");
}
$('text').html()
const myanswer = $('#inputWords').val();

    //入力された文字数と現在の文字数ルールが
    //同じかどうかを判断している
//     if(textLength=== count){
//         count++;//1増えるという意味
//         $('#area').append(text);
//         $('#Lastword').html(count);
//         $('#count').html(count);
//         }else if(textLength === 0){
//         alert("Please enter");
//     }else{
//         alert("Please enter the specified number of characters");
//     }
//     $('#textword').html(Lastwold);
// });
// var num = 1;
// $('')
// $('').on('click', function(){
// });

