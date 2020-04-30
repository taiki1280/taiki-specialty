jQuery(function () {
  //訪問回数の処理
  var visit_count = $.cookie("visit_count");
  if (visit_count == undefined) {
    visit_count = 0;
  }
  visit_count++;
  $.cookie("visit_count", visit_count, { expires: 1 });
  $("#welcome").prepend(visit_count + "回目の訪問");
})