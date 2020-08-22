<template>
  <div>
    <nav ref="nav" :id="checkTop">
      <nuxt-link v-scroll-to="'#Introduction'" to>TOP</nuxt-link>
      <nuxt-link v-scroll-to="'#Myself'" to>Myself</nuxt-link>
      <nuxt-link v-scroll-to="'#School'" to>School</nuxt-link>
      <nuxt-link v-scroll-to="'#Hobby'" to>Hobby</nuxt-link>
      <nuxt-link v-scroll-to="'#Hope'" to>Hope</nuxt-link>
      <nuxt-link v-scroll-to="'#Life'" to>Life</nuxt-link>
    </nav>
    <div id="content">
      <dl>
        <dt id="Introduction">Introduction</dt>
        <dd>
          <p>今回は１ページで俺がどういう人間なのかをある程度理解できる様なページを作ろうと思い、このページを作成しました。</p>
          <p>上のメニューよりその場所へ飛ぶことができます。</p>
        </dd>
      </dl>
      <dl>
        <dt id="Myself">Myself</dt>
        <dd>
          <p>情報系の専門学生です。</p>
          <p>
            <nuxt-link v-scroll-to="'#Hobby'" to>趣味</nuxt-link>は
            <nuxt-link v-scroll-to="'#Hobby_Game'" to>ゲーム</nuxt-link>・
            <nuxt-link v-scroll-to="'#Hobby_Anime'" to>アニメ</nuxt-link>/
            <nuxt-link v-scroll-to="'#Hobby_Dorama'" to>ドラマ</nuxt-link>鑑賞等です。
          </p>
          <p>小中高において最も好きな科目は算数、数学、数学でした。</p>
          <p>残念ながら得意という訳ではありません...</p>
          <p>様々な解法があったり、人によって考え方が違ったり、１つの解を求めるまでの過程を思考する等が好きな理由でした。</p>
          <p>小さい頃から順番に PC / Play Station 2 / DS / Wii / iPod Touch / Wii U / 3DS / Android / Switch 等と電子機器と戯れるのが好きでした。</p>
          <p>整理整頓することが好きで綺麗好きです。</p>
        </dd>
      </dl>
      <dl>
        <dt id="School">School</dt>
        <dd>
          <dl>
            <dt>１年生</dt>
            <dd>
              <dl>
                <dt>HTML5</dt>
                <dd>特に学校で作品は作っていません。</dd>
                <dd>自分のホームページ内で作成しています。</dd>
              </dl>
              <dl>
                <dt>CSS3</dt>
                <dd>特に学校で作品は作っていません。</dd>
                <dd>自分のホームページ内で作成しています。</dd>
              </dl>
              <dl>
                <dt>JavaScript</dt>
                <dd>特に学校で作品は作っていません。</dd>
                <dd>自分のホームページ内で使用しています。</dd>
              </dl>
              <dl>
                <dt>Java</dt>
                <dd>生徒一人一人で丸罰ゲームを作りました。</dd>
                <dd>コンソール上で動かしたまでです。</dd>
              </dl>
              <dl>
                <dt>Python</dt>
                <dd>特に学校で作品は作っていません。</dd>
                <dd>個人的にLINEのbotを作成しました。</dd>
              </dl>
            </dd>
            <dt>２年生</dt>
            <dd>
              <dl>
                <dt>PHP</dt>
                <dd>これから習います</dd>
              </dl>
            </dd>
          </dl>
        </dd>
      </dl>
      <dl>
        <dt id="Hobby">Hobby</dt>
        <dd>
          <dl>
            <dt id="Hobby_Game">Game</dt>
            <dd>
              <dl>
                <dt>Switch</dt>
                <dd>大乱闘スマッシュブラザーズ</dd>
                <dd>マリオメーカー2</dd>
                <dd>ボンバーマン</dd>
                <dd>ぷよぷよテトリス</dd>
                <dd>ポケットモンスター剣</dd>
              </dl>
              <dl>
                <dt>Smart phone</dt>
                <dd>消滅都市</dd>
                <dd>将棋ウォーズ</dd>
                <dd>白猫プロジェクト</dd>
                <dd>PUBG MOBILE</dd>
                <dd>Call of Duty</dd>
              </dl>
            </dd>
          </dl>
          <dl>
            <dt id="Hobby_Anime">Anime</dt>
            <dd>
              <dl>
                <dt>記憶の限りの過去に見たアニメ一覧を表示する</dt>
                <dd>一覧(未実装)</dd>
              </dl>
            </dd>
            <dt id="Hobby_Dorama">Dorama</dt>
            <dd>
              <dl>
                <dt>記憶の限りの過去に見たドラマ一覧を表示する</dt>
                <dd>一覧(未実装)</dd>
              </dl>
            </dd>
          </dl>
          <dl>
            <dt>Smart phone</dt>
            <dd>
              <dl>
                <dt>Entertainment</dt>
                <dd>Chrome</dd>
                <dd>Youtube</dd>
                <dd>Amazon Kindle</dd>
              </dl>
              <dl>
                <dt>SNS</dt>
                <dd>LINE</dd>
                <dd>Twitter</dd>
              </dl>
            </dd>
          </dl>
        </dd>
      </dl>
      <dl>
        <dt id="Hope">Hope</dt>
        <dd>
          <dl>
            <dt>Job</dt>
            <dd>
              <dl>
                <dt>仕事に求める事</dt>
                <dd>やっていて楽しい</dd>
                <dd>最低限暮らせる収入</dd>
                <dd>自分が得意なことが活かせる</dd>
                <dd>他人と協力できる</dd>
                <dd>コミュニケーションが取りやすい</dd>
                <dd>自分にしかできない(出来る人間の母数が少ない)</dd>
                <dd>他人に感謝される</dd>
                <dd>誰かにとって嬉しい</dd>
              </dl>
            </dd>
          </dl>
        </dd>
        <dd>
          <dl>
            <dt>Romantic</dt>
            <dd>
              <dl>
                <dt>恋愛に求める事</dt>
                <dd>一緒にいて苦でない</dd>
                <dd>信頼関係を築くことが出来る</dd>
                <dd>異性</dd>
              </dl>
            </dd>
          </dl>
        </dd>
        <dd>
          <dl>
            <dt>Friends</dt>
            <dd>
              <dl>
                <dt>友達に求める事</dt>
                <dd>一緒にいて苦でない</dd>
                <dd>価値観が似ている</dd>
              </dl>
            </dd>
          </dl>
        </dd>
      </dl>

      <dl>
        <dt id="Life">Life</dt>
        <dd>
          <dl>
            <dt>俺が情報系に向かうまで</dt>
            <dd>
              <dl>
                <dt>小学生時代</dt>
                <dd>PCで標準搭載のゲームをする</dd>
                <dd>PCでインストール形式のゲームをする</dd>
                <dd>PCでwebのフラッシュゲームをする</dd>
                <dd>PCでYoutubeを見る</dd>
                <dd>Nintendo DS Liteで遊ぶ</dd>
                <dd>Nintendo Wiiで遊ぶ</dd>
                <dd>Wiiのカスタマイズに没頭</dd>
                <dd>父がシステムエンジニアだと知る</dd>
                <dd>iPod Touchを使う</dd>
                <dd>iPod Touchのカスタマイズに没頭</dd>
              </dl>
              <dl>
                <dt>中学生時代</dt>
                <dd>Excelでお小遣い帳をつける</dd>
                <dd>Nintendo 3DSで遊ぶ</dd>
                <dd>Nintendo WiiUで遊ぶ</dd>
                <dd>WiiUのカスタマイズに没頭</dd>
                <dd>iPhoneを使う</dd>
                <dd>iPhoneのカスタマイズに没頭</dd>
                <dd>LINEの着せ替え自作に没頭</dd>
                <dd>Androidを使う</dd>
                <dd>LINEの着せ替え自作に没頭</dd>
                <dd>Androidのカスタマイズに没頭</dd>
                <dd>高等専門学校の受験を迷うも電子黒板のある普通科へ進学</dd>
              </dl>
              <dl>
                <dt>高校生時代</dt>
                <dd>Power Pointに触れる</dd>
                <dd>ExcelとPower Pointを使う授業が好きになる</dd>
                <dd>情報の成績だけはダントツで好成績</dd>
              </dl>
              <dl>
                <dt>専門学生時代</dt>
                <dd>専門的な知識を学ぶために進学</dd>
                <dd>ゆくゆくは職にできたらなぁと淡い思いも。</dd>
                <dd>念願だったLINEBotを作成する</dd>
                <dd>4月に目標を立てていた自分のHP作成に没頭中</dd>
              </dl>
              <dl>
                <dt>周りからの印象は？</dt>
                <dd>
                  <p>昔から、周りからよくPC・スマホに詳しいと言われていました。</p>
                  <p>人より少し多くの時間を費やしていたのは事実かと思います。</p>
                  <p>勿論上には上がいますが笑</p>
                  <p>その為同級生、先輩、後輩、習い事の友達、先生、親の友達等、年齢性別を問わず、様々な人にPC・スマホ等の電子機器において設定や基本的な操作等を聞かれることが良くありました。</p>
                  <p>聞かれたことに対して自分が分かる事は積極的に教えてきました。</p>
                  <p>基本的には説明をしてその通りやってもらう事が多いけれど、「自分じゃ出来ないからやって欲しい」と頼まれたら簡単に説明も添えて目の前でやって見せたりもしました。</p>
                  <p>これらの経験を通して、人に教えることも好きと気付きました。</p>
                  <p>また、教えれば教えるほど自分の知識も増えるのでwin-winとも感じます。</p>
                  <p>また、自分が好きな分野で周囲を助けられることや自分の個性として活かせること等に喜びを感じました。</p>
                </dd>
              </dl>
            </dd>
          </dl>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      json: ["aaa", "bbb"],
      checkTop: false,
    };
  },
  mounted() {
    // スクロールされたら実行
    document.onscroll = (e) => {
      // ref属性のついたDOMを取得(getlementbyidのようなもの)
      let targetElement = this.$refs.nav;
      if (targetElement.getBoundingClientRect().top == 0) this.checkTop = "top";
      else this.checkTop = "";
    };
  },
};
</script>

<style lang="stylus" scoped>
Menu_hight = 10vmin
default_color = #00aaff
nav
  display flex
  a
    height Menu_hight
    display flex
    justify-content center
    align-items center
nav
  padding 0 2vw
  margin-bottom 2vmin
  background-color rgba(#fff, 0.8)
  position -webkit-sticky
  position sticky
  top 0
  z-index 1
  a
    border-top solid 0.1px #fff
    border-bottom solid 0.1px #fff
    border-right solid 1px
    padding 1vw
    font-size 4vmin
    &:first-of-type
      margin-right auto
    &:first-of-type, &:nth-of-type(2)
      border-left solid 1px
  a, &:visited
    color default_color
#top
  box-shadow 0 1vh 2vh -1vh #000
  background linear-gradient(rgba(default_color, 0.9), rgba(#fff, 0.9), rgba(default_color, 0.9))
  opacity 1
  transition all opacity ease 0.4s
  a, &:visited
    color #000
    text-shadow -1px -1px 1px #fff, -1px 1px 1px #fff, 1px -1px 1px #fff, 1px 1px 1px #fff
#content
  a, p, dd
    font-size 4.5vmin
  margin auto
  > dl
    default(0.4, #000)
    border solid 1px #fff
    margin-bottom 2vmin
    width 100%
    > dt
      default(0.6, #000)
      width 20vmax
      font-size 6vmin
      border-right solid 1px #fff
      border-bottom solid 1px #fff
      text-align center
    > dd
      default(0.4, #000)
    > dt, > dd
      padding 1vh
    dl
      dl
        dt
          margin-left 1em
        dd
          margin-left 2em
</style>