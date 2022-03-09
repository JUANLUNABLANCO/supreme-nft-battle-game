import { Main } from './scenes/Main.js';
import { Battle } from './scenes/Battle.js';
import { GameOver } from './scenes/GameOver.js';
import { Win } from './scenes/Win.js';

const config = {
	type: Phaser.AUTO,
	width: 1920,
	height: 970,
	parent: 'containerGame',
	scene: [Main, Battle, GameOver, Win],
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 900 },
			debug: true,
		},
	},
	audio: {
		noAudio: false,
		disableWebAudio: false,
	},
};
// con debug true veremos las colisiones de los bodys y la gravedad, es util para saber los comportamientos
// de los objetos
var game = new Phaser.Game(config);
