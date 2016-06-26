enchant();	// ライブラリの初期化
window.onload = function(){
	var game = new Game(240, 320);	// 240×320画面(Canvas)を作成
	game.fps = 30;	// フレームレートの設定。30fpsに設定
	game.preload("images/pad.png","images/ball.png");	// 画像データをあらかじめ読み込ませる
	game.rootScene.backgroundColor = "blue";	// ゲームの背景色を青色に設定
	game.score = 0;	// スコアを入れる変数を用意する
	// スコアを表示するラベルを作成
	var scoreLabel = new Label("SCORE : 0");
	scoreLabel.font = "16px Tahoma";
	scoreLabel.color = "white";
	scoreLabel.x = 10;	// X座標
	scoreLabel.y = 5;	// Y座標
	game.rootScene.addChild(scoreLabel);
	// データの読み込みが完了したら処理
	game.onload = function(){
		// ボールの設定
		var ball = new Sprite(16, 16);
		ball.image = game.assets["images/ball.png"];
		ball.x = 0;	// X座標
		ball.y = 0;	// Y座標
		ball.dx = 3;	// X方向の移動量
		ball.dy = 5;	// Y方向の移動量
		game.rootScene.addChild(ball);
		// パドルの設定
		var pad = new Sprite(32, 16);
		pad.image = game.assets["images/pad.png"];
		pad.x = game.width/2;	// X座標
		pad.y = game.height - 40;	// Y座標
		game.rootScene.addChild(pad);

/*
    var enemy = new Sprite(30,10);
    enemy.image = enemy.assets["images/enemy.png"];
    enemy.x = 50;
    enemy.y = 100;
    game.rootScene.addChild(enemy);
*/
		// フレームイベントが発生したら処理
		game.rootScene.addEventListener(Event.ENTER_FRAME, function(){
			ball.x = ball.x + ball.dx;	// X方向の移動量を加算
			ball.y = ball.y + ball.dy;	// Y方向の移動量を加算
			// 画面外かどうか調べる
			if ((ball.x < 0) || (ball.x > (game.width-ball.width))){ ball.dx = -ball.dx; }
			if (ball.y < 0){ ball.dy = -ball.dy; }
			// ボールが下まで行ったらゲームオーバー
			if(ball.y > game.height){
				game.stop();
				alert("スコアは"+game.score+"点でした");
			}
			// パドルを移動させる
      var n = game.input.analogX/4;
      pad.x = pad.x + n;
				if (pad.x < 0){ pad.x = 0; }	// 左端かどうか調べる
			}
			if (game.input.right){
				pad.x = pad.x + 4;	 // パドルを右に移動
				if (pad.x > (game.width-pad.width)){ pad.x = game.width-pad.width; }	// 右端かどうか調べる
			}
			// パドルとボールの接触判定
			if (pad.intersect(ball)){
				ball.dy = -ball.dy;	// 接触した場合はボールのY方向の移動量を逆にする
				game.score = game.score + 10;	// スコアを加算(10点)
				scoreLabel.text = "SCORE : "+game.score;
			}
		});
	}
	game.start();	// ゲーム処理開始
}
