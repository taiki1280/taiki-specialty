<template lang="pug">
div
  Header
  Nav
  main
    Title
    h1 layouts/test
    h2 Navコンポーネント呼びだし↑
    test
    h1 layouts/boardgame
    h2 testコンポーネント呼び出し↑
    nuxt
    h1 layouts/boardgame
    h3 nuxt(pagesの内容がレンダリングされる)↑
    h3 navmenuは予めnav_menu.jsonからメニュー一覧を取り出し、for文で回している
</template>