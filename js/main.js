jQuery(function () {
  //訪問回数の処理
  var visit_count = $.cookie("visit_count")
  if (visit_count == undefined) {
    visit_count = 0
  }
  visit_count++
  $.cookie("visit_count", visit_count, { expires: 1 })
  $("#welcome").prepend(visit_count + "回目の訪問")

  // CSVファイルの読み込み
  var csvfile = 'csv/update_content.csv'
  $.get(csvfile, readCsv, 'text')
  // テーブルタグの日付同じ部分を結合
  /* 
  「注意」
  テーブルデータの中身を一部削除するため、
  列を複数指定する際には後ろの列から順番に指定。
   */
  $("#ホーム").delay(100).queue(function () {
    set_rowSpan($("th")).dequeue()
    // set_rowSpan($("td:nth-child(2)")).dequeue()
  })
})

// CSV読み込みメソッド
function readCsv(data) {
  var target = '#csv-body'
  var csv = $.csv.toArrays(data)
  var insert = ''
  $(csv).each(function () {
    if (this.length > 0) {
      insert += '<tr>'
      $(this).each(function (i) {
        if (
          this == "日付" ||
          this == "更新項目" ||
          this == "更新内容" ||
          i == 0
        ) {
          insert += '<th>' + this + '</th>'
        } else {
          insert += '<td>' + this + '</td>'
        }
      })
      insert += '</tr>'
    }
  })
  $(target).append(insert)
}

// 上から順に縦に見て、内容が同じなら結合するメソッド
function set_rowSpan($date) {
  var i = 0
  var duplication_chara_array = []
  var duplication_index_array = []
  var now = ""
  var cnt = 0
  var dates = []
  // 一列目にクラスを付与。
  $date.addClass("date")
  $date.each(function () {
    dates.push($(this).text())
  })
  for (const i in dates) {
    const v = dates[i];
    if (now == v) {
      cnt++
    } else {
      now = v
      $date.eq(i - cnt).attr("rowSpan", cnt)
      cnt = 1
      // 一回一回削除
      duplication_chara_array = []
    }
    if (duplication_chara_array.indexOf(v) == -1) {
      duplication_chara_array.push(v)
    } else {
      duplication_index_array.push(i)
    }
  }
  // 最後の要素にrowSpanを付与
  $date.eq(i - cnt).attr("rowSpan", cnt)
  // 重複がある物は最初以外削除。
  for (var i = duplication_index_array.length; i >= 0; i--) {
    const element = duplication_index_array[i];
    $date.eq(element).remove()
  }
}