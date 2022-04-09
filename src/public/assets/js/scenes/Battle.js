export class Battle extends Phaser.Scene {
	constructor() {
		super({ key: 'Battle' });
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

	init(data) {
		// recibiendo datos de Main
		this.rappers = ['', 'CHEN ZEN', 'LA D', 'MANNY', 'L´EMPEREUR'];
		this.actions = [
			[],
			['FRAPPE FANTÔME', 'POTION DE LEAN', 'POLÉMIQUE', 'MOI DÉFENSE'],
			['INJURE', 'NUAGE DE FUMÉE', 'SUPER LANCER', 'MOI DÉFENSE'],
			['OKAY', 'VODKA-CERISE', 'VOLE PETIT PÉLICAN', 'MOI DÉFENSE'],
			['CRI STRIDENT', 'LA VIE D´ARTISTE', 'PAINTBALL', 'MOI DÉFENSE'],
		];
		this.player1 = data.player1;
		this.player2 = data.player2;
		this.player1Name = this.rappers[data.player1];
		this.player2Name = this.rappers[data.player2];
		console.log('player 1: ' + this.player1 + ' Name: ' + this.player1Name);
		console.log('player 2: ' + this.player2 + ' Name: ' + this.player2Name);

		// #### rimes
		this.RIMES = [
			"Quand j'entends ta voix, ça me fait \n\nvoyager comme le rap. Ta voix est ma \n\nculture, tu m'as fait tomber amoureux",
			"Parce que tu es cette rime qui enlève \n\nles épines qui sont restées du \n\npassé, ta présence m'éclaire",
			"Tu es l'encre infinie avec laquelle je \n\nveux écrire Celle qui a fait battre à nouveau mon \n\ncœur",
			"Mes mains sont des rimes simples avec un flux \n\nqui glisse en toi Un je t'aime \n\nde déguisé en une simple caresse",
			"Tu es le papillon qui a traversé \n\nla vaste mer Et en se perchant sur mes \n\nlèvres tu m'as inspiré à rimer",
			"Si seulement ton regard me fait rougir et \n\nton sourire m'inspire plus que le regard de Lukie\n\n",
			"Aujourd'hui, je me sens comme un poète follement amoureux \n\nEt chaque rime qui parle d'amour, \n\nJe l'ai gardée pour toi",
			'Si je dessine un graffiti de ton nom sur \n\nle mur Avec ça je vois ton visage, tu\n\n a réussi à me rendre fou',
			"Je t'aime, mon amour, autant que j'aime le \n\nrap Tu es la chose la plus proche du \n\nsensation de rapper",
			'Parce que tu remplis mon cœur et mon âme de \n\nvie, tu es la plus belle \n\nphrase qui se démarque dans mes rimes',
			"Je t'aime, mon amour, autant que j'aime \n\nrapper. Tu es la chose la plus proche de \n\nressentir le rap",
			'Parce que tu remplis mon cœur et mon âme de \n\nvie, tu es la plus belle \n\nphrase qui se démarque dans mes rimes',
			"Quand tu n'es pas présent, je manque \n\nde motivation car tu es la raison \n\nde toute mon inspiration",
			"Si le rap est une erreur, je veux vivre \n\nmal Si t'aimer est une erreur pour \n\ntoi, je vis toujours mal",
			"Et j'ai deux amours, ne me rends pas jaloux Rap et toi mon amour mon plus \n\nbeau papillon",
			'Tu es entré dans ma tête comme une comptine \n\nTransformant chaque épine en fleur rouge \n\npétales',
			"Je pense à toi et seule la poésie sort \n\net c'est mon cœur qui crie que \n\ntu es ma joie",
			"Ne lâche jamais ma main car j'aime\n\n sentir ta peau et tes lèvres douces \n\nqui m'embrassent avec un goût de miel",
			"Tu es le fan numéro un de ce \n\nrappeur Et c'est pourquoi je te dédie cette \n\nlettre avec mes phrases",
			"Tu es la drogue qu'on ne peut pas laisser \n\nJe suis accro à ton amour parce que tu \n\naimes mon rap",
			"Je t'aime, mon amour, autant que j'aime le \n\nrap Tu es la chose la plus proche du \n\nsensation de rapper",
			'Parce que tu remplis mon cœur et mon âme de \n\nvie, tu es la plus belle \n\nphrase qui se démarque dans mes rimes',
			"Je t'aime, mon amour, autant que j'aime le \n\nrap Tu es la chose la plus proche du \n\nsensation de rapper",
			'Parce que tu remplis mon cœur et mon âme de \n\nvie, tu es la plus belle \n\nphrase qui se démarque dans mes rimes',
		];

		this.musicDelayPlayer1 = [0, 10000, 10000, 12000, 15000, 10000, 10000, 12000, 12000];
		this.musicDelaysEnemy = [0, 15000, 15000, 22000, 18000, 26000, 12000, 23000, 14000];
		this.end_frame_atk_1;
		this.end_frame_atk_2;
		this.end_frame_atk_3;
		// variables here
		this.habilities = ['hurl insults', 'xtreme velocity', 'super rhymes', ' high level rap', 'desmoralize'];
		this.habilitiesCoef = [2.5, 3.5, 4, 2.2, 3];
		this.MAX_ROUNDS_PER_GAME = 1;
		// player 1
		this.p1Power = 500; // esto podrá ser calculado en alpha version a partir de coeficientes, tipo de carta, número, etc
		this.p1Moral = 100;
		this.p1Hability = 1;
		this.p1Xp = 0;
		this.p1RoundsWinned = 0;
		this.habilityP1Used = false;

		// palyer 2
		this.p2Power = 500;
		this.p2Moral = 100;
		this.p2Hability = 3;
		this.p2Xp = 0;
		this.p2RoundsWinned = 0;
		this.habilityP2Used = false;

		this.turn = 0;
		this.scenePaused = false;

		this.timedEvent;

		// ######### SCORES
		this.p1PowerText;
		this.p2PowerText;
		this.p1TextAction;
		this.p2TextAction;
	}

	preload() {
		this.resize();
		window.addEventListener('resize', this.resize);
		console.log(`/assets/images/characters/${this.player1}.png`);
		this.sound.stopAll();
	}
	create() {
		// /* ##### sounds */
		this.soundAttack1 = this.sound.add('soundAttack1');
		this.soundAttack2 = this.sound.add('soundAttack2');
		this.soundAttack3 = this.sound.add('soundAttack3');
		this.soundAttack4 = this.sound.add('soundAttack4');
		this.soundDeffense1 = this.sound.add('soundDeffense1');
		this.soundDeffense2 = this.sound.add('soundDeffense2');
		this.soundDeffense3 = this.sound.add('soundDeffense3');
		this.soundDeffense4 = this.sound.add('soundDeffense4');
		this.soundAttackE1 = this.sound.add('soundAttackE1');
		this.soundAttackE2 = this.sound.add('soundAttackE2');
		this.soundAttackE3 = this.sound.add('soundAttackE3');
		this.soundAttackE4 = this.sound.add('soundAttackE4');
		this.soundDeffenseE1 = this.sound.add('soundDeffenseE1');
		this.soundDeffenseE2 = this.sound.add('soundDeffenseE2');
		this.soundDeffenseE3 = this.sound.add('soundDeffenseE3');
		this.soundDeffenseE4 = this.sound.add('soundDeffenseE4');
		this.soundButtonClick = this.sound.add('soundButtonClick');
		// menu sounds

		/* ##### backgrounds */
		this.background = this.add.image(0, 0, 'background');
		this.background.setOrigin(0, 0);
		// añadir plataforma con física y colisiones, pero sin gravedad e inamovible
		this.platform = this.physics.add.image(960, 736, 'platform').setImmovable();
		this.platform.body.allowGravity = false;

		/* ##### characters */
		this.playCharacter1 = this.physics.add.sprite(460, 100, `${this.player1}_atk_1`);
		this.playCharacter1.setBounce(0.2);
		this.playCharacter2 = this.physics.add.sprite(1360, 500, `${this.player2}_atk_1`);
		this.playCharacter2.setBounce(0.3);
		/** #### anims */
		/** 1_ChenZen */
		// fisica colisiones
		this.physics.add.collider(this.playCharacter1, this.platform); // ahora chocaran
		this.physics.add.collider(this.playCharacter2, this.platform); // ahora chocaran

		this.playCharacter1.flipX = true;

		// FX anims sounds
		this.fx_px_start = this.sound.add(`fx_${this.player1}_start`);
		this.fx_px_atk_1 = this.sound.add(`fx_${this.player1}_atk_1`);
		this.fx_px_atk_2 = this.sound.add(`fx_${this.player1}_atk_2`);
		this.fx_px_atk_3 = this.sound.add(`fx_${this.player1}_atk_3`);
		this.fx_px_deffense_1 = this.sound.add(`fx_all_deffense`);
		// ANIMS
		// #### player1_attack_1
		if (this.player1 == 1) {
			this.end_frame_start = 37;
			this.end_frame_atk_1 = 33;
			this.end_frame_atk_2 = 40;
			this.end_frame_atk_3 = 65;
			this.end_frame_def_1 = 13;
			this.end_frame_hurt = 11;
		} else if (this.player1 == 2) {
			this.end_frame_start = 66;
			this.end_frame_atk_1 = 53;
			this.end_frame_atk_2 = 50;
			this.end_frame_atk_3 = 51;
			this.end_frame_def_1 = 13;
			// this.end_frame_hurt = 11;
		} else if (this.player1 == 3) {
			this.end_frame_start = 36;
			this.end_frame_atk_1 = 19;
			this.end_frame_atk_2 = 44;
			this.end_frame_atk_3 = 40;
			this.end_frame_def_1 = 13;
			// this.end_frame_hurt = 11;
		} else if (this.player1 == 4) {
			this.end_frame_start = 43;
			this.end_frame_atk_1 = 39;
			this.end_frame_atk_2 = 46;
			this.end_frame_atk_3 = 43;
			this.end_frame_def_1 = 13;
			this.end_frame_hurt = 11;
		}
		// #### player1_start
		this.anims.create({
			key: 'player1_start',
			frameRate: 25,
			frames: this.anims.generateFrameNumbers(`${this.player1}_start`, { start: 0, end: this.end_frame_start }),
			repeat: 0,
		});
		// #### player1_attack_1 and player1-attack_1_reverse
		if (this.player1 == 3) {
			this.anims.create({
				key: 'player1_attack_1',
				frameRate: 25,
				frames: this.anims.generateFrameNumbers(`${this.player1}_atk_1r`, { start: 0, end: this.end_frame_atk_1 }),
				repeat: 0,
			});
		} else {
			this.anims.create({
				key: 'player1_attack_1',
				frameRate: 25,
				frames: this.anims.generateFrameNumbers(`${this.player1}_atk_1`, { start: 0, end: this.end_frame_atk_1 }),
				repeat: 0,
			});
		}

		// #### player1_attack_2
		this.anims.create({
			key: 'player1_attack_2',
			frameRate: 25,
			frames: this.anims.generateFrameNumbers(`${this.player1}_atk_2`, { start: 0, end: this.end_frame_atk_2 }),
			repeat: 0,
		});
		// #### player1_attack_3
		this.anims.create({
			key: 'player1_attack_3',
			frameRate: 25,
			frames: this.anims.generateFrameNumbers(`${this.player1}_atk_3`, { start: 0, end: this.end_frame_atk_3 }),
			repeat: 0,
		});
		// #### player1_deffense
		this.anims.create({
			key: 'player1_deffense_1',
			frameRate: 25,
			frames: this.anims.generateFrameNumbers(`${this.player1}_def_1`, { start: 0, end: this.end_frame_def_1 }),
			repeat: 0,
		});
		// #### player1_hurt
		// this.anims.create({
		// 	key: 'player1_hurt',
		// 	frameRate: 25,
		// 	frames: this.anims.generateFrameNumbers(`${this.player1}_hurt`, { start: 0, end: this.end_frame_hurt }),
		// 	repeat: 0,
		// });

		// SOUNDS
		this.playCharacter1.on('animationstart', (animation) => {
			console.log('animation start');
			// console.log(animation);
			if (animation.key == 'player1_start') {
				this.fx_px_start.play();
			} else if (animation.key == 'player1_attack_1' && this.player1 == 1) {
				this.playCharacter1.setVelocityX(600);
				this.fx_px_atk_1.play();
			} else if (animation.key == 'player1_attack_1' && this.player1 != 1) {
				this.fx_px_atk_1.play();
			} else if (animation.key == 'player1_attack_2') {
				this.fx_px_atk_2.play();
			} else if (animation.key == 'player1_attack_3') {
				this.fx_px_atk_3.play();
			} else if (animation.key == 'player1_deffense_1') {
				this.fx_px_deffense_1.play();
			}

			// play sound animation
		});
		this.playCharacter1.on('animationcomplete', (animation) => {
			console.log('animation finish');
			if (animation.key == 'player1_attack_1' && this.player1 == 1) {
				this.playCharacter1.setVelocityX(0);
				this.playCharacter1.setPosition(this.playCharacter1.x - 792, this.playCharacter1.y);
				// animation para volver a su sitio
				// this.playCharacter1.play('player1_attack_1_reverse');
			} else if (animation.key == 'player1_attack_1_reverse') {
				// y quitarle la velocidad
				this.playCharacter1.setVelocityX(0);
			}
			// this.enemy.play('lempereur_hurt');
		});

		// DEBUG ARRANCANDO ANIMACIONES
		this.playCharacter1.play('player1_start');
		// this.playCharacter2.play('player2_start');

		/** ##### others elements */
		this.micro1 = this.add.image(530, -500, 'micro1');
		this.micro2 = this.add.image(1300, -700, 'micro2');
		this.micro1.setDataEnabled();
		this.micro1.data.set('position', 'down');
		this.micro2.setDataEnabled();
		this.micro2.data.set('position', 'down');

		/** ###### progress bars top */
		this.navbarPowerP1 = this.add.image(360, 60, 'navbarPower'); //navbarPower
		this.navbarPowerP2 = this.add.image(1550, 60, 'navbarPower'); //navbarPower
		// NAMES rappers
		this.add.text(32, 32, this.player1Name, {
			fontSize: '20px',
			fill: '#000000',
			fontFamily: 'Public Pixel, verdana, arial, sans-serif',
		});
		this.add.text(1226, 32, this.player2Name, {
			fontSize: '20px',
			fill: '#000000',
			fontFamily: 'Public Pixel, verdana, arial, sans-serif',
		});
		// PROGRESS BARS
		this.p1PowerText = this.add.text(600, 65, '', {
			fontSize: '20px',
			fill: '#000',
			fontFamily: 'verdana, arial, sans-serif',
		});
		this.p2PowerText = this.add.text(1790, 65, '', {
			fontSize: '20px',
			fill: '#000',
			fontFamily: 'verdana, arial, sans-serif',
		});
		// the progress bar and update text of power/500
		this.progressbarsPowerMaker();

		/* ##### nav bar menu Down */
		this.navbarDown = this.add.image(960, 870, 'navbarDown'); //navbarPower
		// textos iniciales
		this.p1TextAction = this.add.text(550, 800, 'UHMM!', {
			fontSize: '20px',
			fill: '#000000',
			fontFamily: 'verdana, arial, sans-serif',
		});
		this.p2TextAction = this.add.text(980, 800, 'Cop Cop!', {
			fontSize: '20px',
			fill: '#000000',
			fontFamily: 'verdana, arial, sans-serif',
		});

		// MENUINIT P1 ######################################
		this.menuP1Init = this.add.container(0, 0);

		this.btnAttack = this.add.sprite(20, 792, 'buttonAttack').setOrigin(0, 0).setInteractive();
		this.btnDefense = this.add.sprite(20, 844, 'buttonDefense').setOrigin(0, 0).setInteractive();
		this.btnGiveup = this.add.sprite(20, 896, 'buttonGiveup').setOrigin(0, 0).setInteractive(); // .setInteractive(true)
		this.menuP1Init.add([this.btnAttack, this.btnDefense, this.btnGiveup]);

		this.menuP1Init.setVisible(false);
		let items = this.menuP1Init.list;
		items.map((item) => {
			item.on('pointerover', function (event) {
				// console.log('over');
				this.setTint(0xcacaca);
			});
			item.on('pointerout', function (event) {
				// console.log('out');
				this.setTint(0xffffff);
			});
		});

		this.btnAttack.on(
			'pointerup',
			function (pointer) {
				// DEBUG console.log(pointer);
				if (this.turn == 1) {
					this.soundButtonClick.play();
					// ######## click BUTTON ATTACK ######
					this.openMenuAttackP1();
				}
			},
			this
		);
		this.btnDefense.on(
			'pointerup',
			function (pointer) {
				// DEBUG console.log(pointer);
				if (this.turn == 1) {
					this.soundButtonClick.play();
					// ######## click BUTTON ATTACK ######
					this.openMenuDeffenseP1();
				}
			},
			this
		);
		this.btnGiveup.on(
			'pointerup',
			function (pointer) {
				// console.log(pointer);

				this.soundButtonClick.play();
				// ######## click BUTTON ATTACK ######
				this.scene.start('Main');
				// this.scene.stop('Battle');
			},
			this
		);
		// MENUATTACK P1 ####################################
		this.menuP1Attack = this.add.container(0, 0);

		this.btnAttackA = this.add.sprite(20, 792, 'buttonAttackA').setOrigin(0, 0).setInteractive();
		this.btnAttackB = this.add.sprite(268, 792, 'buttonAttackB').setOrigin(0, 0).setInteractive(); // .setInteractive(true)
		this.btnAttackC = this.add.sprite(20, 844, 'buttonAttackC').setOrigin(0, 0).setInteractive();

		// this.btnAttackD = this.add.sprite(268, 844, 'buttonAttackD').setOrigin(0, 0).setInteractive(); // .setInteractive(true)
		this.btnAttackBack = this.add.sprite(20, 896, 'buttonAttackBack').setOrigin(0, 0).setInteractive(); // .setInteractive(true)
		this.menuP1Attack.add([this.btnAttackA, this.btnAttackB, this.btnAttackC, this.btnAttackBack]);

		this.menuP1Attack.setVisible(false);
		let items2 = this.menuP1Attack.list;
		items2.map((item) => {
			item.on('pointerover', function (event) {
				// console.log('over');
				this.setTint(0xcacaca);
			});
			item.on('pointerout', function (event) {
				// console.log('out');
				this.setTint(0xffffff);
			});
		});

		this.btnAttackA.on(
			'pointerup',
			function (pointer) {
				// DEBUG console.log(pointer);
				if (this.turn == 1) {
					// this.panelLogoLeft.setVisible(true);
					this.soundButtonClick.play();
					// ######## click BUTTON ATTACK ######
					console.log('attack A');
					let delay = this.musicDelayPlayer1[1];
					this.attackP1Selected('A', delay);
				}
			},
			this
		);
		this.btnAttackB.on(
			'pointerup',
			function (pointer) {
				// DEBUG console.log(pointer);
				if (this.turn == 1) {
					// this.panelLogoLeft.setVisible(true);
					this.soundButtonClick.play();
					// ######## click BUTTON ATTACK ######
					console.log('attack B');
					let delay = this.musicDelayPlayer1[2];
					this.attackP1Selected('B', delay);
				}
			},
			this
		);
		this.btnAttackC.on(
			'pointerup',
			function (pointer) {
				// DEBUG console.log(pointer);
				if (this.turn == 1) {
					// this.panelLogoLeft.setVisible(true);
					this.soundButtonClick.play();
					// ######## click BUTTON ATTACK ######
					console.log('attack C');
					let delay = this.musicDelayPlayer1[3];
					this.attackP1Selected('C', delay);
				}
			},
			this
		);
		// this.btnAttackD.on(
		// 	'pointerup',
		// 	function (pointer) {
		// 		// DEBUG console.log(pointer);
		// 		if (this.turn == 1) {
		// 			this.soundButtonClick.play();
		// 			// ######## click BUTTON ATTACK ######
		// 			console.log('attack D');
		// 			let delay = this.musicDelayPlayer1[4];
		// 			this.attackP1Selected('D', delay);
		// 		}
		// 	},
		// 	this
		// );
		this.btnAttackBack.on(
			'pointerup',
			function (pointer) {
				if (this.turn == 1) {
					this.soundButtonClick.play();
					console.log('attack go back');
					this.menuP1Attack.setVisible(false);
					this.menuP1Deffense.setVisible(false);
					this.panelInactionLeft.setVisible(false);
					this.menuP1Init.setVisible(true);
				}
			},
			this
		);
		// MENUDEFENSE P1 ###################################
		this.menuP1Deffense = this.add.container(0, 0);

		this.btnDeffenseA = this.add.sprite(20, 792, 'buttonAttackA').setOrigin(0, 0).setInteractive();
		// this.btnDeffenseB = this.add.sprite(20, 844, 'buttonAttackB').setOrigin(0, 0).setInteractive();
		// this.btnDeffenseC = this.add.sprite(268, 792, 'buttonAttackC').setOrigin(0, 0).setInteractive(); // .setInteractive(true)
		// this.btnDeffenseD = this.add.sprite(268, 844, 'buttonAttackD').setOrigin(0, 0).setInteractive(); // .setInteractive(true)
		this.btnDeffenseBack = this.add.sprite(20, 896, 'buttonAttackBack').setOrigin(0, 0).setInteractive(); // .setInteractive(true)
		this.menuP1Deffense.add([
			this.btnDeffenseA,
			// this.btnDeffenseB,
			// this.btnDeffenseC,
			// this.btnDeffenseD,
			this.btnDeffenseBack,
		]);

		this.menuP1Deffense.setVisible(false);
		let items3 = this.menuP1Deffense.list;
		items3.map((item) => {
			item.on('pointerover', function (event) {
				// console.log('over');
				this.setTint(0xcacaca);
			});
			item.on('pointerout', function (event) {
				// console.log('out');
				this.setTint(0xffffff);
			});
		});

		this.btnDeffenseA.on(
			'pointerup',
			function (pointer) {
				// DEBUG console.log(pointer);
				if (this.turn == 1) {
					// this.panelLogoLeft.setVisible(true);
					this.soundButtonClick.play();
					// ######## click BUTTON ATTACK ######
					console.log('deffense A');
					let delay = this.musicDelayPlayer1[5];
					this.deffenseP1Selected('A', delay);
				}
			},
			this
		);
		// this.btnDeffenseB.on(
		// 	'pointerup',
		// 	function (pointer) {
		// 		// DEBUG console.log(pointer);
		// 		if (this.turn == 1) {
		// 			this.soundButtonClick.play();
		// 			// ######## click BUTTON ATTACK ######
		// 			console.log('deffense B');
		// 			let delay = this.musicDelayPlayer1[6];
		// 			this.deffenseP1Selected('B', delay);
		// 		}
		// 	},
		// 	this
		// );
		// this.btnDeffenseC.on(
		// 	'pointerup',
		// 	function (pointer) {
		// 		// DEBUG console.log(pointer);
		// 		if (this.turn == 1) {
		// 			this.soundButtonClick.play();
		// 			// ######## click BUTTON ATTACK ######
		// 			console.log('deffense C');
		// 			let delay = this.musicDelayPlayer1[7];
		// 			this.deffenseP1Selected('C', delay);
		// 		}
		// 	},
		// 	this
		// );
		// this.btnDeffenseD.on(
		// 	'pointerup',
		// 	function (pointer) {
		// 		// DEBUG console.log(pointer);
		// 		if (this.turn == 1) {
		// 			this.soundButtonClick.play();
		// 			// ######## click BUTTON ATTACK ######
		// 			console.log('deffense D');
		// 			let delay = this.musicDelayPlayer1[8];
		// 			this.deffenseP1Selected('D', delay);
		// 		}
		// 	},
		// 	this
		// );
		this.btnDeffenseBack.on(
			'pointerup',
			function (pointer) {
				if (this.turn == 1) {
					this.soundButtonClick.play();
					console.log('attack go back');
					this.menuP1Attack.setVisible(false);
					this.menuP1Deffense.setVisible(false);
					this.menuP1Init.setVisible(true);
				}
			},
			this
		);
		// MENU ENENMY ##########################################################
		this.menuP2 = this.add.group();
		this.button4 = this.add.sprite(1400, 792, 'buttonAttack').setOrigin(0, 0);
		this.button5 = this.add.sprite(1400, 844, 'buttonDefense').setOrigin(0, 0);

		this.menuP2.add(this.button4);
		this.menuP2.add(this.button5);
		// MENU ENENMY ##########################################################
		// PANELS TURN1 TURN2
		this.panelLogoLeft = this.add.image(480, 870, 'panelTurn2').setVisible(false);
		this.panelLogoRight = this.add.image(1440, 870, 'panelTurn1').setVisible(false);
		this.panelInactionLeft = this.add.image(480, 870, 'panelInAction1').setVisible(false);
		this.panelInactionRight = this.add.image(480, 870, 'panelInAction2').setVisible(false);
		// PANELS TURN1 TURN2

		// TODO after clicking a button start
		this.beginRound();
	}

	update() {
		if (this.micro1.data.get('position') == 'down' && this.micro1.y < 0) {
			this.micro1.y += 3;
		}
		if (this.micro1.data.get('position') == 'up' && this.micro1.y > -500) {
			this.micro1.y -= 5;
		}
		if (this.micro2.data.get('position') == 'down' && this.micro2.y < 200) {
			this.micro2.y += 5;
		}
		if (this.micro2.data.get('position') == 'up' && this.micro2.y > -700) {
			this.micro2.y -= 7;
		}
	}
	// BATTLE MENUS ######################
	progressbarsPowerMaker() {
		const maxPower = 500; // rapper max power
		const maxSizeBar = 550; // bar max size
		this.progressBars = this.add.graphics();
		this.progressBars.clear();
		// progress bar 1
		this.progressBars.fillStyle(0x2d2d2d);
		this.progressBars.fillRect(32, 60, maxSizeBar, 35);

		this.progressBars.fillStyle(0x2dff2d);
		this.progressBars.fillRect(32, 60, (maxSizeBar * this.p1Power) / maxPower, 35);

		// progress bar 2
		this.progressBars.fillStyle(0x2d2d2d);
		this.progressBars.fillRect(1226, 60, maxSizeBar, 35);

		this.progressBars.fillStyle(0x2dff2d);
		this.progressBars.fillRect(1226, 60, (maxSizeBar * this.p2Power) / maxPower, 35);

		// update text sibling
		this.p1PowerText.setText(Math.ceil(this.p1Power) + '/500');
		this.p2PowerText.setText(Math.ceil(this.p2Power) + '/500');
	}
	TextAction(text1 = '', text2 = '') {
		// SHOULD BE panel turn1 y panel turn2 off, and menuP1 active
		this.p1TextAction.setText(text1);
		// darle un tiempo
		this.p2TextAction.setText(text2);
		// TODO sonido risa, burla,...
	}
	showMenuPx(turn) {
		console.log('in show menu p1: ', turn);
		if (turn == 1) {
			console.log('p1 visible: true | p2 visible: false');
			this.menuP1Init.setVisible(true);
			this.menuP1Attack.setVisible(false);
			this.menuP1Deffense.setVisible(false);
			this.panelLogoLeft.setVisible(false);
			this.panelInactionLeft.setVisible(false);
			this.panelLogoRight.setVisible(true);
		} else {
			console.log('p2 visible: true | p1 visible: false');
			this.menuP1Init.setVisible(false);
			this.menuP1Attack.setVisible(false);
			this.menuP1Deffense.setVisible(false);
			this.panelLogoRight.setVisible(false);
			this.panelInactionRight.setVisible(false);
			this.panelLogoLeft.setVisible(true);
		}
	}
	openMenuAttackP1() {
		// MENU changue ###############
		this.menuP1Init.setVisible(false);
		this.menuP1Deffense.setVisible(false);
		this.panelInactionLeft.setVisible(false);
		this.menuP1Attack.setVisible(true);
		// MENU changue ###############
		// this.textsMaker();
	}
	openMenuDeffenseP1() {
		// MENU changue ###############
		this.menuP1Init.setVisible(false);
		this.menuP1Attack.setVisible(false);
		this.panelInactionLeft.setVisible(false);
		this.menuP1Deffense.setVisible(true);
		// MENU changue ###############
	}
	closeAllMenuP1() {
		console.log('####### CLOSE ALL MENUS P1 #####');
		this.menuP1Init.setVisible(false);
		this.menuP1Attack.setVisible(false);
		this.menuP1Deffense.setVisible(false);
		this.panelInactionLeft.setVisible(false);
	}
	// BATTLE SYSTEM ############
	beginRound() {
		// TODO some music effect before start the round
		console.log('in Begin Round');
		this.turn = 1;
		this.p1TextAction.setText('I´m ready...');
		this.p2TextAction.setText('You´re dead, motherfucker!');

		this.changueTurn(1, 1000);
	}
	changueTurn(turnPlayer, delay) {
		console.log('in changueTurn: ' + turnPlayer);
		// TODO play some sound effect here, like go
		this.turn = turnPlayer;
		if (turnPlayer == 2) {
			this.closeAllMenuP1();
			this.timedEvent = this.time.addEvent({
				delay: delay,
				callback: () => {
					this.micro1.data.set('position', 'up');
					this.micro2.data.set('position', 'down');
				},
			});
			this.showMenuPx(this.turn);
			this.turnP2();
		} else if (turnPlayer == 1) {
			this.timedEvent = this.time.addEvent({
				delay: delay,
				callback: () => {
					this.micro1.data.set('position', 'down');
					this.micro2.data.set('position', 'up');
				},
			});
			this.showMenuPx(this.turn);
		} else {
			console.log('TURNO 0');
		}
	}
	nextRound() {
		console.log('Next Round');
		this.micro1.data.set('position', 'down');
		this.micro2.data.set('position', 'up');
		this.p2Power = 500;
		this.p1Power = 500;

		// TODO click button start to continue
		// repintar los progressbar
		this.progressbarsPowerMaker();
		// LLAMAR A beginRound
		this.beginRound();
	}
	turnP2() {
		console.log('turno 2');
		// randomixe attack or defense
		let attacktype = Phaser.Math.Between(1, 8);
		let delay = this.musicDelaysEnemy[attacktype];
		this.optionP2Selected(attacktype, delay);
	}
	deffenseP1Selected(deffensetype, delay) {
		this.playCharacter1.play('player1_deffense_1');
		if (deffensetype == 'A') {
			this.soundDeffense1.play();
			// defense
			this.TextAction('you will see now, eat dicks!', "I'm shaking...");
			// TODO Calculate some recovery
		}
		if (deffensetype == 'B') {
			this.soundDeffense2.play();
			// defense
			this.TextAction('LETS GO REALLY RAPPPPP!', 'UHMM...');
			// TODO Calculate some recovery
		}
		if (deffensetype == 'C') {
			this.soundDeffense3.play();
			// defense
			this.TextAction('LETS GO REALLY RAPPPPP!', 'UHMM...');
			// TODO Calculate some recovery
		}
		if (deffensetype == 'D') {
			this.soundDeffense4.play();
			// defense
			this.TextAction('LETS GO REALLY RAPPPPP!', 'UHMM...');
			// TODO Calculate some recovery
		}
		this.panelInactionLeft.setVisible(true);
		this.timedEvent = this.time.addEvent({
			delay: delay,
			callback: () => {
				this.checkSatusGame(1);
			},
		});
	}
	attackP1Selected(attackType, delay) {
		// TYPE ATTACK 1
		if (attackType == 'A') {
			this.playCharacter1.play('player1_attack_1');
			this.soundAttack1.play();
			// lanzamiento de rimas
			let attackRime = this.RIMES[Phaser.Math.Between(0, 23)];

			// EAXMPLE 'When I hear your voice, it makes \n\nme travel like rap. Your voice is my\n\nculture, you have made me fall in love',
			this.TextAction(attackRime, '');
			// TODO logica de ataque

			let p1PowerAttack = (this.p1Power / 10) * (this.p1Moral / 100) * Phaser.Math.Between(1, 5); // máximo 50
			console.log('attack: ' + p1PowerAttack);
			this.p2Defense = ((this.p2Moral / 100 + this.p2Power / 100) / 2) * Phaser.Math.Between(1, 50); // numero entre 1 y 50
			console.log('defense: ' + this.p2Defense);
			this.totalAttack = p1PowerAttack - this.p2Defense;
			console.log('p1 restará ' + this.totalAttack + ' power a p2');
			this.p2Power -= this.totalAttack;
			// this.p2Power = 0; // DEBUG
			console.log('p2 Power: ' + this.p2Power);
			if (this.p2Power >= 0) {
				this.p2PowerText.setText(this.p2Power + '/500');
			} else {
				this.p2PowerText.setText('0/500');
				this.p2Power = 0;
			}
			this.progressbarsPowerMaker();
		} else if (attackType == 'B') {
			this.playCharacter1.play('player1_attack_2');
			this.soundAttack2.play();
			// lanzamiento de rimas
			let attackRime = this.RIMES[Phaser.Math.Between(0, 24)];

			// EAXMPLE 'When I hear your voice, it makes \n\nme travel like rap. Your voice is my\n\nculture, you have made me fall in love',
			this.TextAction(attackRime, '');
			// TODO logica de ataque

			let p1PowerAttack = (this.p1Power / 10) * (this.p1Moral / 100) * Phaser.Math.Between(1, 5); // máximo 50
			console.log('attack: ' + p1PowerAttack);
			this.p2Defense = ((this.p2Moral / 100 + this.p2Power / 100) / 2) * Phaser.Math.Between(1, 50); // numero entre 1 y 50
			console.log('defense: ' + this.p2Defense);
			if (p1PowerAttack > this.p2Defense) this.totalAttack = p1PowerAttack - this.p2Defense;
			else this.totalAttack = 50;
			console.log('p1 restará ' + this.totalAttack + ' power a p2');
			this.p2Power -= this.totalAttack;
			// this.p2Power = 0; // DEBUG
			console.log('p2 Power: ' + this.p2Power);
			if (this.p2Power >= 0) {
				this.p2PowerText.setText(this.p2Power + '/500');
			} else {
				this.p2PowerText.setText('0/500');
				this.p2Power = 0;
			}
			this.progressbarsPowerMaker();
			// ....
		} else if (attackType == 'C') {
			this.playCharacter1.play('player1_attack_3');
			this.soundAttack3.play();
			// lanzamiento de rimas
			let attackRime = this.RIMES[Phaser.Math.Between(0, 24)];

			// EAXMPLE 'When I hear your voice, it makes \n\nme travel like rap. Your voice is my\n\nculture, you have made me fall in love',
			this.TextAction(attackRime, '');
			// TODO logica de ataque

			let p1PowerAttack = (this.p1Power / 10) * (this.p1Moral / 100) * Phaser.Math.Between(1, 5); // máximo 50
			console.log('attack: ' + p1PowerAttack);
			this.p2Defense = ((this.p2Moral / 100 + this.p2Power / 100) / 2) * Phaser.Math.Between(1, 50); // numero entre 1 y 50
			console.log('defense: ' + this.p2Defense);
			if (p1PowerAttack > this.p2Defense) this.totalAttack = p1PowerAttack - this.p2Defense;
			else this.totalAttack = 50;
			console.log('p1 restará ' + this.totalAttack + ' power a p2');
			this.p2Power -= this.totalAttack;
			// this.p2Power = 0; // DEBUG
			console.log('p2 Power: ' + this.p2Power);
			if (this.p2Power >= 0) {
				this.p2PowerText.setText(this.p2Power + '/500');
			} else {
				this.p2PowerText.setText('0/500');
				this.p2Power = 0;
			}
			this.progressbarsPowerMaker();
			// ....
		} else if (attackType == 'D') {
			this.soundAttack4.play();
			// lanzamiento de rimas
			let attackRime = this.RIMES[Phaser.Math.Between(0, 24)];

			// EAXMPLE 'When I hear your voice, it makes \n\nme travel like rap. Your voice is my\n\nculture, you have made me fall in love',
			this.TextAction(attackRime, '');
			// TODO logica de ataque

			let p1PowerAttack = (this.p1Power / 10) * (this.p1Moral / 100) * Phaser.Math.Between(1, 5); // máximo 50
			console.log('attack: ' + p1PowerAttack);
			this.p2Defense = ((this.p2Moral / 100 + this.p2Power / 100) / 2) * Phaser.Math.Between(1, 50); // numero entre 1 y 50
			console.log('defense: ' + this.p2Defense);
			if (p1PowerAttack > this.p2Defense) this.totalAttack = p1PowerAttack - this.p2Defense;
			else this.totalAttack = 50;
			console.log('p1 restará ' + this.totalAttack + ' power a p2');
			this.p2Power -= this.totalAttack;
			// this.p2Power = 0; // DEBUG
			console.log('p2 Power: ' + this.p2Power);
			if (this.p2Power >= 0) {
				this.p2PowerText.setText(this.p2Power + '/500');
			} else {
				this.p2PowerText.setText('0/500');
				this.p2Power = 0;
			}
			this.progressbarsPowerMaker();
			// ....
		}
		this.panelInactionLeft.setVisible(true);
		this.timedEvent = this.time.addEvent({
			delay: delay + 1000,
			callback: () => {
				this.checkSatusGame(1);
			},
		});
	}
	optionP2Selected(attacktype, delay) {
		let soundtrack;
		if (attacktype == 1) {
			console.log('Enemy Attack 1');
			this.soundAttackE1.play();
			this.paintButton(attacktype);
			// lanzamiento de rimas
			let attackRime = this.RIMES[Phaser.Math.Between(0, 23)];

			// EAXMPLE 'When I hear your voice, it makes \n\nme travel like rap. Your voice is my\n\nculture, you have made me fall in love',
			this.TextAction('', attackRime);

			this.calculateAttackP2toP1();
		} else if (attacktype == 2) {
			console.log('Enemy Attack 2');
			this.soundAttackE2.play();
			this.paintButton(attacktype);
			// lanzamiento de rimas
			let attackRime = this.RIMES[Phaser.Math.Between(0, 23)];

			// EAXMPLE 'When I hear your voice, it makes \n\nme travel like rap. Your voice is my\n\nculture, you have made me fall in love',
			this.TextAction('', attackRime);

			this.calculateAttackP2toP1();
		} else if (attacktype == 3) {
			console.log('Enemy Attack 3');
			this.soundAttackE3.play();
			this.paintButton(attacktype);
			// lanzamiento de rimas
			let attackRime = this.RIMES[Phaser.Math.Between(0, 23)];

			// EAXMPLE 'When I hear your voice, it makes \n\nme travel like rap. Your voice is my\n\nculture, you have made me fall in love',
			this.TextAction('', attackRime);

			this.calculateAttackP2toP1();
		} else if (attacktype == 4) {
			console.log('Enemy Attack 4');
			this.soundAttackE4.play();
			this.paintButton(attacktype);
			// lanzamiento de rimas
			let attackRime = this.RIMES[Phaser.Math.Between(0, 23)];

			// EAXMPLE 'When I hear your voice, it makes \n\nme travel like rap. Your voice is my\n\nculture, you have made me fall in love',
			this.TextAction('', attackRime);

			this.calculateAttackP2toP1();
		} else if (attacktype > 4) {
			console.log('Enemy deffense');
			soundtrack = `soundDeffenseE${Phaser.Math.Between(1, 4)}`;
			switch (soundtrack) {
				case 'soundDeffenseE1':
					this.soundDeffenseE1.play();
					break;
				case 'soundDeffenseE2':
					this.soundDeffenseE2.play();
					break;
				case 'soundDeffenseE3':
					this.soundDeffenseE3.play();
					break;
				case 'soundDeffenseE4':
					this.soundDeffenseE4.play();
					break;
			}
			this.paintButton(attacktype);
			this.TextAction('', 'EH EH EH EH EH EH ....');
			this.calculateDeffenseP2();
		}
		this.timedEvent = this.time.addEvent({
			delay: delay + 1000,
			callback: () => {
				this.repaintButton();
				this.checkSatusGame(2);
			},
		});
	}
	paintButton(attacktype) {
		if (attacktype > 0 && attacktype < 5) {
			this.button4.setTint(0xcaffca);
		} else {
			this.button5.setTint(0xcaffca);
		}
	}
	repaintButton() {
		this.button4.setTint(0xffffff);
		this.button5.setTint(0xffffff);
	}
	calculateAttackP2toP1() {
		let p2PowerAttack = (this.p2Power / 10) * (this.p2Moral / 100) * Phaser.Math.Between(1, 5); // máximo 50
		console.log('attack: ' + p2PowerAttack);
		this.p1Defense = ((this.p1Moral / 100 + this.p1Power / 100) / 2) * Phaser.Math.Between(1, 50); // numero entre 1 y 50
		console.log('defense: ' + this.p1Defense);
		if (p2PowerAttack > this.p1Defense) this.totalAttack = p2PowerAttack - this.p1Defense;
		else this.totalAttack = 100;
		console.log('p2 restará ' + this.totalAttack + ' power a p1');
		this.p1Power -= this.totalAttack;
		// this.p2Power = 0; // DEBUG
		console.log('p1 Power: ' + this.p1Power);
		if (this.p1Power >= 0) {
			this.p1PowerText.setText(this.p1Power + '/500');
		} else {
			this.p1PowerText.setText('0/500');
			this.p1Power = 0;
		}
		this.progressbarsPowerMaker();
	}
	calculateDeffenseP2() {
		this.p2Power += 100;
		if (this.p2Power >= 500) {
			this.p2PowerText.setText('500/500');
			this.p2Power = 500;
		} else {
			this.p1PowerText.setText(this.p2Power + '/500');
		}
		this.progressbarsPowerMaker();
	}
	checkSatusGame(turnPlayer) {
		let newTurn;
		let delay = 1000;
		turnPlayer == 1 ? (newTurn = 2) : (newTurn = 1);
		if (!this.scenePaused) {
			// comprobaciones
			if (this.p1Power <= 0) {
				// TODO aumentar experiencia player2
				this.p2RoundsWinned++;
				// WARNING TODO control de rounds
				if (this.p2RoundsWinned >= this.MAX_ROUNDS_PER_GAME) {
					console.log('game over, ganador p2');
					this.timedEvent = this.time.addEvent({
						delay: delay,
						callback: () => {
							this.sound.stopAll();
							this.gameOver(false);
						},
					});
				} else {
					this.timedEvent = this.time.addEvent({
						delay: delay,
						callback: () => {
							this.sound.stopAll();
							this.nextRound();
						},
					});
				}
			}
			if (this.p2Power <= 0) {
				// TODO aumentar experiencia player1
				this.p1RoundsWinned++;
				if (this.p1RoundsWinned >= this.MAX_ROUNDS_PER_GAME) {
					console.log('ganaste ganador p1');
					this.p1Xp++;
					this.timedEvent = this.time.addEvent({
						delay: delay,
						callback: () => {
							this.sound.stopAll();
							this.gameOver(true);
						},
					});
				} else {
					this.timedEvent = this.time.addEvent({
						delay: delay,
						callback: () => {
							this.sound.stopAll();
							this.nextRound();
						},
					});
				}
			}
			// cambiar turno
			this.changueTurn(newTurn, 1000);
		} else {
			console.log('Scene Paused: ' + this.scenePaused);
		}
	}
	gameOver(winner = false) {
		// MOSTRAR TESTOS DE GANADOR O PERDEDOR ANTES DE IR A LA ESCENA
		if (winner == true || winner == false) {
			this.scene.start('Win', { player1: this.player1, player1Xp: this.p1Xp });
		} else {
			this.scene.start('Gameover', { player1: this.player1, player1Xp: this.p1Xp });
		}
	}
}
