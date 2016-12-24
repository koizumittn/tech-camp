$(function(){
  // HTMLからコンテンツのオブジェクトを取得
  var article = $('.left-contents')
  var sidebar = $('.right-contents');

  // Window幅を取得
  var width = window.innerWidth;

  // floatを解除するメソッド
  // Window幅が小さい時に呼び出す
  var releaseFloat = function(article, sidebar) {
    article.css("float", "none");
    sidebar.css("float", "none");
    sidebar.removeClass("fixed");
  }

  // floatを適用するメソッド
  // Windows幅が一定以上の時に呼び出す
  var applyFloat = function(article, sidebar) {
    article.css("float", "left");
    sidebar.css("float", "left");
  }

  // fixed適用時にサイドバーの左右位置を調整するメソッド
  // Window幅に応じてrightパラメータを制御する
  var controlRight = function(sidebar, windowWidth) {
    var rightMargin = (windowWidth - 1100) / 2;
    sidebar.css("right", rightMargin);
  }

  // 初期設定
  if(width < 1080) {
    releaseFloat(article, sidebar);
  }

  // Windowsのリサイズ時にサイドバーの位置を調整する。
  $(window).resize(function(){
    width = window.innerWidth;
    // Windows幅が小さい時はfloatを解除して
    // サイドバーを下に回り込ませる
    if(width < 1080) {
      releaseFloat(article, sidebar);
    }

    // 記事部分とサイドバーの間隔を一定に保つように
    // rightパラメータを制御
    else {
      applyFloat(article, sidebar);
      controlRight(sidebar, width);
    }
  });

  // 上下スクロール時の制御
  $(window).on('scroll', function(){
    // Window幅が小さい時にはサイドバーは下に配置するので、
    // 処理をスキップする。
    if(width > 1080) {
      var y = $(window).scrollTop();

      // 一定値以上下にスクロールしたら
      // サイドバーが移動しないようfixedクラスを適用する。
      if(y > 160) {
        sidebar.addClass("fixed");
      }
      else{
        sidebar.removeClass("fixed");
      }
    }
  });
});