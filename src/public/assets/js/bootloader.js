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

		// this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		// this.scale.pageAlignHorizontally = true;
		// this.scale.pageAlignVertically = true;
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
		document.getElementById('containerCSS').style.display = 'none';

		// ########## Main scene ###############################################
		this.load.image('landscapeWarning', '/assets/images/elements/landscape_warning.png');
		this.load.image('background', '/assets/images/background_1920x1080.jpg');
		this.load.image('mainBackground', '/assets/images/background-main_1920x1080.jpg');
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
		this.load.audio('mainMusic', '/assets/mp3/supreme_base01_main.mp3');
		this.load.audio('battleMusic', '/assets/mp3/supreme_base02_battle.mp3');
		this.load.audio('gameoverMusic', '/assets/mp3/supreme_base03_gameover.mp3');
		this.load.audio('winMusic', '/assets/mp3/supreme_base04_gamewin.mp3');
		this.load.audio('rapperSelected', '/assets/sounds/rapperSelected.wav');
		this.load.audio('soundButtonClick', '/assets/sounds/button_click.wav');
		// this.load.audio('rappersFallDawn', '/assets/sounds/rappersFallDawn.wav');
		this.load.audio('soundGameover', '/assets/sounds/gameover.mp3');
		this.load.audio('soundWin', '/assets/sounds/victory.wav');
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
		this.load.image('panelInAction1', '/assets/images/elements/navbar_down_inaction_left.png');
		this.load.image('panelInAction2', '/assets/images/elements/navbar_down_inaction_right.png');
		this.load.image('navbarPower', '/assets/images/elements/navbar_power.png');
		// ANIMS ##################################################################################
		// chenzen -> 1 #############
		// start ####################
		this.load.spritesheet('1_start', '/assets/anims/01_chenzen/Start/anim_chenzen_start.png', {
			frameWidth: 450,
			frameHeight: 450,
		});
		// attacks ##################
		this.load.spritesheet('1_atk_1', '/assets/anims/01_chenzen/Atk_1/anim_chenzen_atack_01.png', {
			frameWidth: 450,
			frameHeight: 450,
		});
		this.load.spritesheet('1_atk_2', '/assets/anims/01_chenzen/Atk_2/anim_chenzen_atack_02.png', {
			frameWidth: 450,
			frameHeight: 450,
		});
		this.load.spritesheet('1_atk_3', '/assets/anims/01_chenzen/Atk_3/anim_chenzen_atack_03.png', {
			frameWidth: 450,
			frameHeight: 450,
		});
		// deffense ####################
		this.load.spritesheet('1_def_1', '/assets/anims/01_chenzen/Defense/anim_chenzen_deffense_01.png', {
			frameWidth: 450,
			frameHeight: 450,
		});
		// hurt ########################
		this.load.spritesheet('1_hurt', '/assets/anims/01_chenzen/Hurt/anim_chenzen_hurt.png', {
			frameWidth: 450,
			frameHeight: 450,
		});

		// La D -> 2 #############
		// start ####################
		this.load.spritesheet('2_start', '/assets/anims/02_lad/Start/anim_lad_start.png', {
			frameWidth: 450,
			frameHeight: 450,
		});
		// attacks ##################
		this.load.spritesheet('2_atk_1', '/assets/anims/02_lad/Atk_1/anim_lad_atack_01.png', {
			frameWidth: 450,
			frameHeight: 450,
		});
		this.load.spritesheet('2_atk_2', '/assets/anims/02_lad/Atk_2/anim_lad_atack_02.png', {
			frameWidth: 450,
			frameHeight: 450,
		});
		this.load.spritesheet('2_atk_3', '/assets/anims/02_lad/Atk_3/anim_lad_atack_03.png', {
			frameWidth: 450,
			frameHeight: 450,
		});
		// deffense ####################
		this.load.spritesheet('2_def_1', '/assets/anims/02_lad/Defense/anim_lad_deffense_01.png', {
			frameWidth: 450,
			frameHeight: 450,
		});
		// FALTA hurt ########################
		this.load.spritesheet('2_hurt', '/assets/anims/02_lad/Hurt/anim_lad_hurt.png', {
			frameWidth: 450,
			frameHeight: 450,
		});

		// MANNY -> 3 #############
		// start ####################
		this.load.spritesheet('3_start', '/assets/anims/03_manny/Start/anim_manny_start.png', {
			frameWidth: 450,
			frameHeight: 450,
		});
		// attacks ##################
		this.load.spritesheet('3_atk_1', '/assets/anims/03_manny/Atk_1/anim_manny_atack_01.png', {
			frameWidth: 450,
			frameHeight: 450,
		});
		this.load.spritesheet('3_atk_1r', '/assets/anims/03_manny/Atk_1/anim_manny_atack_01_reverse.png', {
			frameWidth: 450,
			frameHeight: 450,
		});
		this.load.spritesheet('3_atk_2', '/assets/anims/03_manny/Atk_2/anim_manny_atack_02.png', {
			frameWidth: 450,
			frameHeight: 450,
		});
		this.load.spritesheet('3_atk_3', '/assets/anims/03_manny/Atk_3/anim_manny_atack_03.png', {
			frameWidth: 450,
			frameHeight: 450,
		});
		// deffense ####################
		this.load.spritesheet('3_def_1', '/assets/anims/03_manny/Defense/anim_manny_deffense_01.png', {
			frameWidth: 450,
			frameHeight: 450,
		});
		// FALTA hurt ########################
		this.load.spritesheet('3_hurt', '/assets/anims/03_manny/Hurt/anim_manny_hurt.png', {
			frameWidth: 450,
			frameHeight: 450,
		});

		// lempereur -> 4
		// start ####################
		this.load.spritesheet('4_start', '/assets/anims/04_lempereur/Start/anim_lempereur_start.png', {
			frameWidth: 450,
			frameHeight: 450,
		});
		// attacks ##################
		this.load.spritesheet('4_atk_1', '/assets/anims/04_lempereur/Atk_1/anim_lempereur_atack_01.png', {
			frameWidth: 450,
			frameHeight: 450,
		});
		this.load.spritesheet('4_atk_2', '/assets/anims/04_lempereur/Atk_2/anim_lempereur_atack_02.png', {
			frameWidth: 450,
			frameHeight: 450,
		});
		this.load.spritesheet('4_atk_3', '/assets/anims/04_lempereur/Atk_3/anim_lempereur_atack_03.png', {
			frameWidth: 450,
			frameHeight: 450,
		});
		// deffense ####################
		this.load.spritesheet('4_def_1', '/assets/anims/04_lempereur/Defense/anim_lempereur_deffense_01.png', {
			frameWidth: 450,
			frameHeight: 450,
		});
		// hurt ########################
		this.load.spritesheet('4_hurt', '/assets/anims/04_lempereur/Hurt/anim_lempereur_hurt.png', {
			frameWidth: 450,
			frameHeight: 450,
		});
		// projectiles
		this.load.image('lempereur_injure', '/assets/anims/projectiles/lempereur_injure.png');
		this.load.image('lempereur_sword', '/assets/anims/projectiles/lempereur_sword.png');
		this.load.image('manny_bird', '/assets/anims/projectiles/manny_bird.png');

		// FX ANIMNS SOUNDS
		// fx deffenese same for all
		this.load.audio('fx_all_deffense', '/assets/anims/sound_all_deffense.mp3');
		// 1 chenzen
		this.load.audio('fx_1_atk_1', '/assets/anims/01_chenzen/Atk_1/sound_chenzen_atack_01.mp3');
		this.load.audio('fx_1_atk_2', '/assets/anims/01_chenzen/Atk_2/sound_chenzen_atack_02.mp3');
		this.load.audio('fx_1_atk_3', '/assets/anims/01_chenzen/Atk_3/sound_chenzen_atack_03.mp3');
		this.load.audio('fx_1_start', '/assets/anims/01_chenzen/Start/sound_chenzen_start.mp3');
		// 2 lad
		this.load.audio('fx_2_atk_1', '/assets/anims/02_lad/Atk_1/sound_lad_atack_01.mp3');
		this.load.audio('fx_2_atk_2', '/assets/anims/02_lad/Atk_2/sound_lad_atack_02.mp3');
		this.load.audio('fx_2_atk_3', '/assets/anims/02_lad/Atk_3/sound_lad_atack_03.mp3');
		this.load.audio('fx_2_start', '/assets/anims/02_lad/Start/sound_lad_start.mp3');
		// 3 manny
		this.load.audio('fx_3_atk_1', '/assets/anims/03_manny/Atk_1/sound_manny_atack_01.mp3');
		this.load.audio('fx_3_atk_2', '/assets/anims/03_manny/Atk_2/sound_manny_atack_02.mp3');
		this.load.audio('fx_3_atk_3', '/assets/anims/03_manny/Atk_3/sound_manny_atack_03.mp3');
		this.load.audio('fx_3_start', '/assets/anims/03_manny/Start/sound_manny_start.mp3');

		this.load.audio('fx_4_atk_1', '/assets/anims/04_lempereur/Atk_1/sound_lempereur_atack_01.mp3');
		this.load.audio('fx_4_atk_2', '/assets/anims/04_lempereur/Atk_2/sound_lempereur_atack_02.mp3');
		this.load.audio('fx_4_atk_3', '/assets/anims/04_lempereur/Atk_3/sound_lempereur_atack_03.mp3');
		this.load.audio('fx_4_start', '/assets/anims/04_lempereur/Start/sound_lempereur_start.mp3');
		// buttons and elements of menu
		this.load.image('button', '/assets/images/elements/standard_button.png');
		this.load.image('buttonAttack', '/assets/images/elements/button_attack.png');
		this.load.image('buttonDefense', '/assets/images/elements/button_defense.png');
		this.load.image('buttonGiveup', '/assets/images/elements/button_giveup.png');
		// buttons attack
		this.load.image('btn_1_atk_a', '/assets/images/elements/button_1_attack_a.png');
		this.load.image('btn_1_atk_b', '/assets/images/elements/button_1_attack_b.png');
		this.load.image('btn_1_atk_c', '/assets/images/elements/button_1_attack_c.png');
		this.load.image('btn_1_def_a', '/assets/images/elements/button_1_deffense_a.png');
		this.load.image('btn_2_atk_a', '/assets/images/elements/button_2_attack_a.png');
		this.load.image('btn_2_atk_b', '/assets/images/elements/button_2_attack_b.png');
		this.load.image('btn_2_atk_c', '/assets/images/elements/button_2_attack_c.png');
		this.load.image('btn_2_def_a', '/assets/images/elements/button_2_deffense_a.png');
		this.load.image('btn_3_atk_a', '/assets/images/elements/button_3_attack_a.png');
		this.load.image('btn_3_atk_b', '/assets/images/elements/button_3_attack_b.png');
		this.load.image('btn_3_atk_c', '/assets/images/elements/button_3_attack_c.png');
		this.load.image('btn_3_def_a', '/assets/images/elements/button_3_deffense_a.png');
		this.load.image('btn_4_atk_a', '/assets/images/elements/button_4_attack_a.png');
		this.load.image('btn_4_atk_b', '/assets/images/elements/button_4_attack_b.png');
		this.load.image('btn_4_atk_c', '/assets/images/elements/button_4_attack_c.png');
		this.load.image('btn_4_def_a', '/assets/images/elements/button_4_deffense_a.png');
		this.load.image('buttonAttackBack', '/assets/images/elements/button_attack_back.png');

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
