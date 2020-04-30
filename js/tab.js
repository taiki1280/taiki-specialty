// jQueryメソッド
jQuery(function () {
  // ロード時
  var index = $.cookie("選択されたタブ")
  if (index == undefined) {
    index = 0;
  }
  $(".タブ").eq(index).addClass('選択中')
  $(".ページ").eq(index).addClass('現在表示中')

  //訪問回数の処理
  var visit_count = $.cookie("visit_count");
  if (visit_count == undefined) {
    visit_count = 0;
  }
  visit_count++;
  $.cookie("visit_count", visit_count, { expires: 1 });
  $("#welcome").text(visit_count + "回目の訪問ありがとう☆");

});

// タブがクリックされた時
$('.タブ').click(function () {
  // クリックされたタブの順番をindex変数へ
  let index = $('.タブ').index(this);
  $.cookie("選択されたタブ", index)
  switch_tab(index)
});

// タブの入れ替えメソッド
function switch_tab(index) {
  // 選択中のタブを非選択にし、内容を非表示
  $('.タブ').removeClass('選択中');
  $('.ページ').removeClass('現在表示中')
  // 選択されたタブを選択中にし、内容を表示
  $('.タブ').eq(index).addClass('選択中');
  $('.ページ').eq(index).addClass('現在表示中');
};