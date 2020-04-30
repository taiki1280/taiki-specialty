jQuery(function () {
  //訪問回数の処理
  var visit_count = $.cookie("visit_count");
  if (visit_count == undefined) {
    visit_count = 0;
  }
  visit_count++;
  $.cookie("visit_count", visit_count, { expires: 1 });
  $("#welcome").prepend(visit_count + "回目の訪問");

  // CSVファイルの読み込み
  var csvfile = 'csv/update_content.csv'
  $.get(csvfile, readCsv, 'text')
})

function readCsv(data) {
  var target = '#csv-body'
  var csv = $.csv.toArrays(data)
  var insert = ''
  $(csv).each(function () {
    if (this.length > 0) {
      insert += '<tr>'
      $(this).each(function () {
        insert += '<td>' + this + '</td>'
      })
      insert += '</tr>'
    }
  })
  $(target).append(insert)
}

// テーブルタグの日付同じ部分を結合
$(function () {
  var counter = 0;
  var text = "";
  var target = "";
  // Q1: なぜ.reverse()？
  // A1: 削除や統合などの処理を行う場合、前から処理すると、
  //     削除したときに後ろの要素が前に詰まりますよね？それが原因で
  //     配列の処理がおかしくなるケースがあったりします（処理の内容による）。
  //     習慣として、後ろから処理してるのかなと推察します。
  $($('#csv-body td:first-child').get().reverse()).each(function () {
    if ($(this).text() == text) {
      counter++;
      // Q3: (target !="")ってどういうこと？というかこのtargetって具体的にどこを指してる？
      // A3: targetが初期値でないことを確認しています。targetは
      //     ひとつ前のセルを表しますが、初回に限っては
      //     var target = ""とされており、ひとつ前のセルではないです。
      //     初回はひとつ前のセルが存在しないので妥当な処理だと思います。
      if (target != "")
        target.remove();
    } else {
      if (target != "")
        target.attr('rowSpan', counter);
      // Q4：これは何？
      // A4: counterの値を1に初期化しないと、counterの値が増え続け、
      //     東京以外のセルが出てきた場合にそのセルまでくっつくことになります。
      //     なので、こうしてます。
      counter = 1;
    }
    // Q5: この記述は何のため？
    // A5: セルのテキストを保持しておきます。次の確認で、
    //      前のセルのテキストとして利用するためですね。
    text = $(this).text();
    // Q6: この記述は何のため？
    // A6: セルを保持しておきます。次の確認で、前のセルとして利用するためです。
    target = $(this);
  });
});