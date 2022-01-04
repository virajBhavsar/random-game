const attackBtn = document.querySelector(".attack");
const startBtn = document.querySelector(".start");
const restartBtn = document.querySelector(".restart");

const gotoMenuBtn = document.querySelector(".gotomenu");
const winnerMsg = document.querySelector(".winner-msg");
const mainWinnerMsg = document.querySelector(".home-winner-msg");
const won1 = document.querySelector(".won1");
const won2 = document.querySelector(".won2");

//pages
const home = document.querySelector(".home");
const game = document.querySelector(".game");
const winnerPage = document.querySelector(".winner-page");

//router
const goto = (from,to) => {
	from.classList.add("invisible");
	to.classList.remove("invisible");
}

//turn of player 1
let top1 = true;

startBtn.addEventListener('click',()=>{
	goto(home,game);
})
gotoMenuBtn.addEventListener('click', ()=> {
	goto(winnerPage,home);
})


let player1 = {
	lost:0,
	id:1,
	op:'2',
	healthValue : 100,
	health: document.querySelector(".h1"),
	bullet: document.querySelector(".b2"),
	side:document.querySelector(".p1")
}
let player2 = {
	lost:0,
	id:2,
	op:'1',
	healthValue : 100,
	health: document.querySelector(".h2"),
	bullet: document.querySelector(".b1"),
	side:document.querySelector(".p2")
}

const end = (msg) => {
	top1 = false;
	winnerMsg.innerHTML = msg;
	won1.innerHTML = player2.lost;
	won2.innerHTML = player1.lost;
	player1.healthValue = 100;
	player2.healthValue = 100;
	player1.health.innerHTML = player1.healthValue;
	player2.health.innerHTML = player2.healthValue;

	if(player1.lost + player2.lost >= 4){
		goto(game,home);
		goto(startBtn,restartBtn);
		if(player2.lost > player1.lost){
			mainWinnerMsg.innerHTML = `player1 won the match!`
		}else if(player1.lost === player2.lost){
			mainWinnerMsg.innerHTML = 'Match draw'			
		}else{
			mainWinnerMsg.innerHTML = 'player2 won the match!'
		}
	}else{
		goto(game,winnerPage);		
	}
		
}

restartBtn.addEventListener('click',()=>{
	goto(restartBtn,startBtn);
	won1.innerHTML = 0;
	won2.innerHTML = 0;
	player1.lost = 0;
	player2.lost = 0;
	mainWinnerMsg.innerHTML = "";
})

const shoot = (player,times) => {
	attackBtn.disabled = true;
	player.healthValue = player.healthValue - times;
	player.health.innerHTML = player.healthValue;
	if(player.healthValue <= 0){
		player.lost = player.lost + 1;
		end(`winner is player ${player.op}`);
	}

	player.bullet.classList.add(`bulletAnimate${player.op}`);
	// player.side.classList.add('blood');
	setTimeout(()=>{
		player.bullet.classList.remove(`bulletAnimate${player.op}`);
		top1 = !top1;
		attackBtn.disabled = false;
		// player.side.classList.remove('blood');
	},times*500)
}

attackBtn.addEventListener('click',()=>{
	if(top1){
		shoot(player2,Math.floor(Math.random()*10/2) + 1);
	}else{
		shoot(player1,Math.floor(Math.random()*10/2) + 1);		
	}
});


// https://careers.inkoop.io/job_posts/js-developer-intern/applicants/fE9TmHRSKDnzU9FBJipY77yh

