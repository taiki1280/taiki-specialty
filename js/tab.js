document.addEventListener("DOMContentLoaded", function () {
  // タブに対してクリックイベントを適用
  const tabs = document.getElementsByClassName("タブ");
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", tabSwitch);
  }
  // タブをクリックすると実行する関数
  function tabSwitch() {
    // タブのclassの値を変更
    document.getElementsByClassName("選択中")[0].classList.remove("選択中");
    this.classList.add("選択中");
    // コンテンツのclassの値を変更
    document.getElementsByClassName("現在表示中")[0].classList.remove("現在表示中");
    const arrayTabs = Array.prototype.slice.call(tabs);
    const index = arrayTabs.indexOf(this);
    document.getElementsByClassName("ページ")[index].classList.add("現在表示中");
  };
});

