var chars=``;
var count = 0;
var speed = 50; // 表示スピード（1に近いほど速く）
var flag = 1; // 繰り返し（0 = 繰り返す｜1 = 1回だけ）
var steps = 0;//表示段階
var canClick=true;
var serifaudio='SEs/000029ed.wav';
var tapSound=true;
var clickSerif=0;
var timer;
var neutralTime=10000;

window.AudioContext = window.AudioContext || window.webkitAudioContext;  
const context = new window.AudioContext();
const volume = 0.5;


function randomChars(){
		return `*（わきあがりつつある　かいじょうを
　まのあたりにして
　あなたはケツイが　みなぎった）`;
}

function startDisplay(){
	clearTimeout(timer);
    timer=setTimeout('resetView()',neutralTime);
				var box = document.getElementById('displaybox');
				var area = document.getElementById('charsarea');
				if(steps==0){//step0=最初の文字列を表示
					clickSerif=0;
					chars=randomChars();
					tapSound=true;
					box.style.backgroundColor = "rgba(0,0,0,100)";
					box.style.borderColor = "rgba(255,255,255,100)";
					steps=1
					appearChars();
				}else if(steps==1){//文字列表示中
					canClick=false;
					count=chars.length+1;
				}else if(steps==2){//step2=セーブ画面
					area.textContent = `あなた　  LV1  　3：20
だれキズかいじょう　うけつけ
`;
					box.style.width = "70vw";
					box.style.textAlign = "center";
					area.insertAdjacentHTML('beforeend', '<div id=saveline><img src="img/heart.png" id=heart>セーブ </div>');
					steps++;
				}else if(steps==3){//step3=セーブ完了画面
					steps++;
					area.textContent = `あなた　  LV1  　3：20
だれキズかいじょう　うけつけ
`;
					box.style.width = "70vw";
					box.style.textAlign = "center";
					area.insertAdjacentHTML('beforeend', '<div id=saveline>セーブしました。　　　 </div>');
					area.style.color="yellow";
				}else if(steps==4){//step4=ニュートラル
					steps=0;
					box.style.width = "90vw";
					box.style.backgroundColor = "rgba(0,0,0,0)";
					box.style.borderColor = "rgba(255,255,255,0)";
					area.style.color="white";
					area.textContent ="";
					count=0;
					box.style.textAlign = "left";
				}
		
}

function appearChars(){
	var type = chars.substring(0, count);
	var area = document.getElementById('charsarea');
	// テキストフィールドにデータを渡す処理
	area.textContent = type;
	count++;
	var rep = setTimeout("appearChars()", speed);
	var serif = setTimeout(function(){wa.play("000029ed.wav");},speed);
    if(count > chars.length){clearTimeout(serif);}
	if(count > chars.length){
		steps=2;
		canClick=true;
		if(flag == 1){ clearTimeout(rep);  }
		else{ count = 0; }
		
	}
}

function resetView(){
	var box = document.getElementById('displaybox');
	var area = document.getElementById('charsarea');
	steps=0;
	box.style.width = "90vw";
	box.style.backgroundColor = "rgba(0,0,0,0)";
	box.style.borderColor = "rgba(255,255,255,0)";
	area.style.color="white";
	area.textContent ="";
	count=0;
	box.style.textAlign = "left";
	clearTimeout(timer);
	timer=setTimeout('resetView()',neutralTime);
	console.log("view reset");
}

window.addEventListener('touchmove', function(event) {
    event.preventDefault();
});


window.onload = function() {
	timer=setTimeout('resetView()',neutralTime);
	var audio1='SEs/00002a1b.wav';
	var audio2='SEs/000029ed.wav';
	var audio3='SEs/000029a7.wav';

// ページ読み込みと同時にロード
    wa.loadFile(audio1, function(buffer) {
      document.addEventListener("touchstart", function() {
      	if(steps==1&&tapSound){ wa.play("00002a1b.wav");tapSound=false;}
      });
    });

   wa.loadFile(audio2, function(buffer) {
      document.addEventListener("touchstart", function() {
      	wa.playSilent();
	  });
    });

 

    wa.loadFile(audio3, function(buffer) {
      document.addEventListener("touchstart", function() {
      	if(steps==4)wa.play("000029a7.wav");
      });
    });

    document.addEventListener("touchstart", function() {
      	startDisplay();
      });

    // スクロールを無効にする
	$(window).on('touchmove.noScroll', function(e) {
	    e.preventDefault();
	});

    //document.body.onload = function() {
    //    if (this.webkitRequestFullScreen) {
    //         this.webkitRequestFullScreen();
    //    }
    //    else if (this. mozRequestFullScreen) {
    //        this. mozRequestFullScreen();
    //    }
    
  	//}
}