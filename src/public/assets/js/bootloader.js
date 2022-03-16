export class Bootloader extends Phaser.Scene {
	constructor() {
		super({ key: 'Bootloader' });
	}
	resize() {
		// resize window
		const canvas = document.querySelector('canvas');
		const html = document.querySelector('html');
		const WindowWidth = window.innerWidth;
		const WindowHeight = window.innerHeight;
		canvas.style.width = WindowWidth + 'px';
		canvas.style.height = WindowHeight + 'px';
		html.style.overflow = 'hidden';
		console.log('resized window');
	}
	// orientation() {
	// 	// orientation

	// 	if (screen.orientation.type.match(/\w+/)[0] === 'landscape') {
	// 		// es un evento que funciona alrevés de lo esperado
	// 		alert('Please considere changue orientation to Landscape: ');
	// 		landscape.setVisible(true);
	// 	} else if (screen.orientation.type.match(/\w+/)[0] === 'portrait') {
	// 		// alert('Landscape');
	// 	}
	// 	// this.orientationvalue = screen.orientation.type.match(/\w+/)[0];
	// }
	preload() {
		// ########## resize and orientation
		this.resize();
		window.addEventListener('resize', this.resize);

		// ########## Main scene ###############################################
		this.load.image('background', '/assets/images/background_1920x1080.jpg');
		// this.load.image('gameover', '/assets/images/gameover_1920x1080.jpg');
		this.load.image('platform', '/assets/images/platform_1920x28.png');
		// this.load.image('deckCards', '/assets/images/deckCards.png');
		this.load.image('card1', '/assets/images/cards/1.png');
		this.load.image('card2', '/assets/images/cards/2.png');
		this.load.image('card3', '/assets/images/cards/3.png');
		this.load.image('card4', '/assets/images/cards/4.png');
		this.load.image('orla', '/assets/images/cards/orla.png');
		// this.load.image('navbarControls1', '/assets/images/elements/navbar_controls1.png');

		// this.load.audio('orlaMove', '/assets/sounds/orlaMove.mp3');
		this.load.audio('rapperSelected', '/assets/sounds/rapperSelected.mp3');
		this.load.audio('ambientMusic', '/assets/mp3/supreme_base01.mp3');

		this.load.image('landscapeWarning', '/assets/images/elements/landscape_warning.png');
		// ########## Main scene ###############################################
		// ########## Battle scene #############################################
		// nuevos personajes
		this.load.image('playCharacter1_1', `/assets/images/characters/1.png`);
		this.load.image('playCharacter1_2', `/assets/images/characters/2.png`);
		this.load.image('playCharacter1_3', `/assets/images/characters/3.png`);
		this.load.image('playCharacter1_4', `/assets/images/characters/4.png`);

		this.load.image('micro1', '/assets/images/microphone01.png');
		this.load.image('micro2', '/assets/images/microphone02.png');
		this.load.image('navbarDown', '/assets/images/elements/navbar_down.png');
		this.load.image('panelTurn2', '/assets/images/elements/navbar_down_difuselogo_left.png');
		this.load.image('panelTurn1', '/assets/images/elements/navbar_down_difuselogo_right.png');
		this.load.image('navbarPower', '/assets/images/elements/navbar_power.png');

		// buttons and elements of menu
		this.load.image('button', '/assets/images/elements/standard_button.png');
		this.load.image('buttonAttack', '/assets/images/elements/button_attack.png');
		this.load.image('buttonDefense', '/assets/images/elements/button_defense.png');
		this.load.image('buttonGiveup', '/assets/images/elements/button_giveup.png');
		// buttons attack
		this.load.image('buttonAttackA', '/assets/images/elements/button_attack_a.png');
		this.load.image('buttonAttackB', '/assets/images/elements/button_attack_b.png');
		this.load.image('buttonAttackC', '/assets/images/elements/button_attack_c.png');
		this.load.image('buttonAttackD', '/assets/images/elements/button_attack_d.png');
		this.load.image('buttonAttackBack', '/assets/images/elements/button_attack_back.png');
		// sounds player1
		this.load.audio('soundAttack1', '/assets/sounds/supreme_attack_1.mp3');
		this.load.audio('soundAttack2', '/assets/sounds/supreme_attack_2.mp3');
		this.load.audio('soundAttack3', '/assets/sounds/supreme_attack_3.mp3');
		this.load.audio('soundAttack4', '/assets/sounds/supreme_attack_4.mp3');
		this.load.audio('soundDeffense1', '/assets/sounds/supreme_deffense_1.mp3');
		this.load.audio('soundDeffense2', '/assets/sounds/supreme_deffense_2.mp3');
		this.load.audio('soundDeffense3', '/assets/sounds/supreme_deffense_3.mp3');
		this.load.audio('soundDeffense4', '/assets/sounds/supreme_deffense_4.mp3');
		this.load.audio('soundButtonClick', '/assets/sounds/button_click.mp3');
		// sounds enemy
		this.load.audio('soundAttackE1', '/assets/sounds/supreme_attack_E1.mp3');
		this.load.audio('soundAttackE2', '/assets/sounds/supreme_attack_E2.mp3');
		this.load.audio('soundAttackE3', '/assets/sounds/supreme_attack_E3.mp3');
		this.load.audio('soundAttackE4', '/assets/sounds/supreme_attack_E4.mp3');
		this.load.audio('soundDeffenseE1', '/assets/sounds/supreme_deffense_E1.mp3');
		this.load.audio('soundDeffenseE2', '/assets/sounds/supreme_deffense_E2.mp3');
		this.load.audio('soundDeffenseE3', '/assets/sounds/supreme_deffense_E3.mp3');
		this.load.audio('soundDeffenseE4', '/assets/sounds/supreme_deffense_E4.mp3');
		// ########## Battle scene #############################################
		// ########## WIN scene ################################################
		this.load.image('win', '/assets/images/win_1920x1080.jpg');
		// this.load.image('playCharacter1', `/assets/images/charactersP1/${this.player1}.png`);
		// animacion de pantalla serpentinas
		// ########## WIN scene ################################################
		// ########## GAMEOVER scene ###########################################
		this.load.image('gameover', '/assets/images/gameover_1920x1080.jpg');
		// this.load.image('playCharacter1', `/assets/images/charactersP1/${this.player1}.png`);
		// ########## GAMEOVER scene ###########################################

		this.load.on('complete', () => {
			this.scene.start('Main');
		});
	}
}
