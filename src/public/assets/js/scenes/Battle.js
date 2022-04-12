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
			[],
			[
				"CHEN ZEN entre dans l'arène",
				"CHEN ZEN lance une frappe fantôme:\n\n-tu ne l'as pas vu venir!",
				'CHEN ZEN boit la popo. Ça a un \n\nvieux goût de Dafalgan',
				"CHEN ZEN fracasse l'argent de la \n\npolémique",
				'CHEN ZEN se protège',
			],
			[
				'LA D vient pour tout casser',
				"LA D pousse un cri strident:\n\n- C'est insupportable!",
				"LA D bouge ses locks pour\n\ncélébrer la vie d'artiste",
				'LA D rafale au paintball',
				'LA D se protège, fais belek',
			],
			[
				'MANNY débarque en pleine \n\nkiffance',
				'Okay!',
				'MANNY boit la vodka cerise \n\nau goulot',
				'Vas-y petit pélican!',
				'MANNY se protège: \n\n- Gamberge!',
			],
			[
				"L'EMPEREUR rentre dans \n\ncette lutte",
				"L'EMPEREUR accable l'ennemi\n\nd'injures",
				"L'EMPEREUR tire une latte\n\npuis disparaît dans un nuage de fumée",
				"L'EMPEREUR lance un jouet,\n\nen plein dans le mile!",
				"L'EMPEREUR se protège, sortez\n\ncouverts",
			],
		];

		// DELAY ANIMATIONS ##########################################
		// hacerlo por repero, cada animacion dura diferente
		this.actionDelayPlayer1 = [3000, 2000, 2000, 2000, 2000, 2000];
		this.actionDelayPlayer2 = [6000, 2000, 2000, 2000, 2000, 2000];
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
		// ######### END FRAMES FOR ANIMS
		this.endFrames = [
			// endFrames[`${this.player1}`].start
			{},
			{ start: 37, atk_1: 33, atk_2: 40, atk_3: 65, def_1: 13, hurt: 11 },
			{ start: 66, atk_1: 53, atk_2: 50, atk_3: 51, def_1: 13, hurt: 13 },
			{ start: 36, atk_1: 19, atk_2: 44, atk_3: 40, def_1: 13, hurt: 13 },
			{ start: 43, atk_1: 39, atk_2: 46, atk_3: 43, def_1: 13, hurt: 11 },
		];

		// INITIALIZATION OF VARIABLES ########################
		this.playCharacter1 = null;
		this.playCharacter2 = null;
		// fx sounds
		this.fx_p1_start = this.sound.add(`fx_${this.player1}_start`);
		this.fx_p1_atk_1 = this.sound.add(`fx_${this.player1}_atk_1`);
		this.fx_p1_atk_2 = this.sound.add(`fx_${this.player1}_atk_2`);
		this.fx_p1_atk_3 = this.sound.add(`fx_${this.player1}_atk_3`);
		this.fx_p1_deffense_1 = this.sound.add(`fx_all_deffense`);
		this.fx_p2_start = this.sound.add(`fx_${this.player2}_start`);
		this.fx_p2_atk_1 = this.sound.add(`fx_${this.player2}_atk_1`);
		this.fx_p2_atk_2 = this.sound.add(`fx_${this.player2}_atk_2`);
		this.fx_p2_atk_3 = this.sound.add(`fx_${this.player2}_atk_3`);
		this.fx_p2_deffense_1 = this.sound.add(`fx_all_deffense`);
	}

	preload() {
		this.resize();
		window.addEventListener('resize', this.resize);
		console.log(`/assets/images/characters/${this.player1}.png`);
		console.log(`/assets/images/characters/${this.player2}.png`);
		this.sound.stopAll();
		this.battleMusic = this.sound.add('battleMusic');
	}
	create() {
		// /* ##### sounds */
		setTimeout(() => {
			this.battleMusic.play({ loop: true, volume: 0.2 });
		}, 1000);
		this.battleMusic.pauseOnBlur = false;
		this.soundButtonClick = this.sound.add('soundButtonClick');
		// menu sounds

		/* ##### backgrounds */
		this.background = this.add.image(0, 0, 'background');
		this.background.setOrigin(0, 0);
		// añadir plataforma con física y colisiones, pero sin gravedad e inamovible
		this.platform = this.physics.add.image(960, 736, 'platform').setImmovable();
		this.platform.body.allowGravity = false;

		/* ##### characters */
		this.playCharacter1 = this.physics.add.sprite(460, 100, `${this.player1}_start`);
		this.playCharacter1.setBounce(0.2);
		this.playCharacter1.flipX = true;
		this.playCharacter2 = this.physics.add.sprite(1360, 100, `${this.player2}_start`);
		this.playCharacter2.setBounce(0.3);
		// fisica colisiones
		this.physics.add.collider(this.playCharacter1, this.platform); // ahora chocaran
		this.physics.add.collider(this.playCharacter2, this.platform); // ahora chocaran
		// projectiles
		// manny
		if (this.player1 == 3) {
			this.manny1_bird = this.physics.add.image(910, 500, 'manny_bird').setVisible(false);
			this.physics.add.collider(this.manny1_bird, this.platform);
		}
		if (this.player2 == 3) {
			this.manny2_bird = this.physics.add.image(685, 500, 'manny_bird').setVisible(false);
			this.manny2_bird.flipX = true;
			this.physics.add.collider(this.manny2_bird, this.platform);
		}
		// alcapote
		if (this.player1 == 4) {
			this.lempereur1_injure = this.physics.add.image(950, 500, 'lempereur_injure').setVisible(false);
			this.physics.add.collider(this.lempereur1_injure, this.platform);
			this.lempereur1_sword = this.physics.add.image(910, 500, 'lempereur_sword').setVisible(false);
			this.physics.add.collider(this.lempereur1_sword, this.platform);
		}
		if (this.player2 == 4) {
			this.lempereur2_injure = this.physics.add.image(1080, 500, 'lempereur_injure').setVisible(false);
			this.lempereur2_injure.flipX = true;
			this.physics.add.collider(this.lempereur2_injure, this.platform);
			this.lempereur2_sword = this.physics.add.image(1080, 500, 'lempereur_sword').setVisible(false);
			this.lempereur2_sword.flipX = true;
			this.physics.add.collider(this.lempereur2_sword, this.platform);
		}

		// CHARGING ANIMATIONS AND PLAYING ANIMATION START ##########
		this.createAnims();
		this.startAnims();

		// AMBIENT ###########
		this.createMicros();

		this.createProgressBars();

		this.createMenuInitP1();

		this.createMenuAttackP1();

		this.createMenuDeffenseP1();
		// enemy menu
		this.createMenuEnemy();

		// BEGINROUND  ############
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
	// BATTLE LOAD ANIMS
	createAnims() {
		// #### player1_start
		console.log('IN ANIM CREATE: p1', this.player1);
		console.log('IN ANIM CREATE: p2', this.player2);
		// this.anims.destroy();
		this.anims.create({
			key: 'player1_start',
			frameRate: 25,
			frames: this.anims.generateFrameNumbers(`${this.player1}_start`, {
				start: 0,
				end: this.endFrames[`${this.player1}`].start,
			}),
			repeat: 0,
		});
		// #### player1_attack_1 and player1-attack_1_reverse
		if (this.player1 == 3) {
			this.anims.create({
				key: 'player1_attack_1',
				frameRate: 25,
				frames: this.anims.generateFrameNumbers(`${this.player1}_atk_1r`, {
					start: 0,
					end: this.endFrames[`${this.player1}`].atk_1,
				}),
				repeat: 0,
			});
		} else {
			this.anims.create({
				key: 'player1_attack_1',
				frameRate: 25,
				frames: this.anims.generateFrameNumbers(`${this.player1}_atk_1`, {
					start: 0,
					end: this.endFrames[`${this.player1}`].atk_1,
				}),
				repeat: 0,
			});
		}

		// #### player1_attack_2
		this.anims.create({
			key: 'player1_attack_2',
			frameRate: 25,
			frames: this.anims.generateFrameNumbers(`${this.player1}_atk_2`, {
				start: 0,
				end: this.endFrames[`${this.player1}`].atk_2,
			}),
			repeat: 0,
		});
		// #### player1_attack_3
		this.anims.create({
			key: 'player1_attack_3',
			frameRate: 25,
			frames: this.anims.generateFrameNumbers(`${this.player1}_atk_3`, {
				start: 0,
				end: this.endFrames[`${this.player1}`].atk_3,
			}),
			repeat: 0,
		});
		// #### player1_deffense
		this.anims.create({
			key: 'player1_deffense_1',
			frameRate: 25,
			frames: this.anims.generateFrameNumbers(`${this.player1}_def_1`, {
				start: 0,
				end: this.endFrames[`${this.player1}`].def_1,
			}),
			repeat: 0,
		});
		// #### player1_hurt
		this.anims.create({
			key: 'player1_hurt',
			frameRate: 25,
			frames: this.anims.generateFrameNumbers(`${this.player1}_hurt`, {
				start: 0,
				end: this.endFrames[`${this.player1}`].hurt,
			}),
			repeat: 0,
		});

		// #### player2_start
		this.anims.create({
			key: 'player2_start',
			frameRate: 25,
			frames: this.anims.generateFrameNumbers(`${this.player2}_start`, {
				start: 0,
				end: this.endFrames[`${this.player2}`].start,
			}),
			repeat: 0,
		});
		// #### player2_attack_1 and player1-attack_1_reverse
		if (this.player2 == 3) {
			this.anims.create({
				key: 'player2_attack_1',
				frameRate: 25,
				frames: this.anims.generateFrameNumbers(`${this.player2}_atk_1r`, {
					start: 0,
					end: this.endFrames[`${this.player2}`].atk_1,
				}),
				repeat: 0,
			});
		} else {
			this.anims.create({
				key: 'player2_attack_1',
				frameRate: 25,
				frames: this.anims.generateFrameNumbers(`${this.player2}_atk_1`, {
					start: 0,
					end: this.endFrames[`${this.player2}`].atk_1,
				}),
				repeat: 0,
			});
		}

		// #### player2_attack_2
		this.anims.create({
			key: 'player2_attack_2',
			frameRate: 25,
			frames: this.anims.generateFrameNumbers(`${this.player2}_atk_2`, {
				start: 0,
				end: this.endFrames[`${this.player2}`].atk_2,
			}),
			repeat: 0,
		});
		// #### player2_attack_3
		this.anims.create({
			key: 'player2_attack_3',
			frameRate: 25,
			frames: this.anims.generateFrameNumbers(`${this.player2}_atk_3`, {
				start: 0,
				end: this.endFrames[`${this.player2}`].atk_3,
			}),
			repeat: 0,
		});
		// #### player2_deffense
		this.anims.create({
			key: 'player2_deffense_1',
			frameRate: 25,
			frames: this.anims.generateFrameNumbers(`${this.player2}_def_1`, {
				start: 0,
				end: this.endFrames[`${this.player2}`].def_1,
			}),
			repeat: 0,
		});
		// #### player2_hurt
		this.anims.create({
			key: 'player2_hurt',
			frameRate: 25,
			frames: this.anims.generateFrameNumbers(`${this.player2}_hurt`, {
				start: 0,
				end: this.endFrames[`${this.player2}`].hurt,
			}),
			repeat: 0,
		});

		// PLAYER 1 ANIMATIONS START
		this.playCharacter1.on('animationstart', (animation) => {
			console.log('animation start P1');
			// console.log(animation);
			if (animation.key == 'player1_start') {
				this.fx_p1_start.play();
			} else if (animation.key == 'player1_attack_1') {
				this.fx_p1_atk_1.play();
				// CHENZEN 'FRAPPE FANTOME'
				if (this.player1 == 1) {
					this.playCharacter1.setVelocityX(600);
				}
				// ALCAPOTE 'INJURE' _injure
				if (this.player1 == 4) {
					this.timedEvent = this.time.addEvent({
						delay: 300,
						callback: () => {
							this.lempereur1_injure.setVisible(true);
							this.lempereur1_injure.setVelocityX(800);
						},
					});
				}
			} else if (animation.key == 'player1_attack_2') {
				this.fx_p1_atk_2.play();
			} else if (animation.key == 'player1_attack_3') {
				this.fx_p1_atk_3.play();
				// MANNY 'VOLE PELICAN' _bird
				if (this.player1 == 3) {
					this.timedEvent = this.time.addEvent({
						delay: 800,
						callback: () => {
							this.manny1_bird.setVisible(true);
							this.manny1_bird.setVelocityX(800);
						},
					});
				}
				// ALCAPOTE 'SUPER LANCER' _sword
				if (this.player1 == 4) {
					this.timedEvent = this.time.addEvent({
						delay: 1000,
						callback: () => {
							this.lempereur1_sword.setVisible(true);
							this.lempereur1_sword.setVelocityX(1000);
						},
					});
				}
			} else if (animation.key == 'player1_deffense_1') {
				this.fx_p1_deffense_1.play();
			}

			// play sound animation
		});
		// PLAYER 1 ANIMATIONS COMPLETE
		this.playCharacter1.on('animationcomplete', (animation) => {
			console.log('animation finish P1');
			if (animation.key == 'player1_attack_1') {
				// CHENZEN 'FRAPPE FANTOME'
				if (this.player1 == 1) {
					this.playCharacter1.setVelocityX(0);
					this.playCharacter1.setPosition(460, this.playCharacter1.y);
				}
				// ALCAPOTE 'INJURE' _injure
				if (this.player1 == 4) {
					this.lempereur1_injure.setVelocityX(0);
					this.lempereur1_injure.setPosition(950, 500);
					this.lempereur1_injure.setVisible(false);
				}
			}
			// if (animation.key == 'player1_attack_1_reverse') {
			// 	// y quitarle la velocidad
			// 	this.playCharacter1.setVelocityX(0);
			// }
			if (animation.key == 'player1_attack_3') {
				// MANNY 'VOLE PELICAN' _bird
				if (this.player1 == 3) {
					this.manny1_bird.setVisible(false);
					this.manny1_bird.setVelocityX(0);
					this.manny1_bird.setPosition(910, 500);
					this.playCharacter2.play('player2_hurt');
				}
				// ALCAPOTE 'SUPER LANCER' _sword
				if (this.player1 == 4) {
					this.lempereur1_sword.setVelocityX(0);
					this.lempereur1_sword.setPosition(910, 500);
					this.lempereur1_sword.setVisible(false);
					this.playCharacter2.play('player2_hurt');
				}
				// arranca hurt animation player2
			}
			// this.enemy.play('lempereur_hurt');
		});

		// PLAYER 2 ANIMATIONS START ############################
		this.playCharacter2.on('animationstart', (animation) => {
			console.log('animation start P2');
			// console.log(animation);
			if (animation.key == 'player2_start') {
				this.fx_p2_start.play();
			} else if (animation.key == 'player2_attack_1') {
				this.fx_p2_atk_1.play();
				// CHENZEN 'FRAPPE FANTOME'
				if (this.player2 == 1) {
					this.playCharacter2.setVelocityX(-600);
					this.fx_p2_atk_1.play();
				}
				// ALCAPOTE 'INJURE' _injure
				if (this.player2 == 4) {
					this.timedEvent = this.time.addEvent({
						delay: 300,
						callback: () => {
							this.lempereur2_injure.setVisible(true);
							this.lempereur2_injure.setVelocityX(-800);
						},
					});
				}
			} else if (animation.key == 'player2_attack_2') {
				this.fx_p2_atk_2.play();
			} else if (animation.key == 'player2_attack_3') {
				this.fx_p2_atk_3.play();
				// MANNY 'VOLE PELICAN' _bird
				if (this.player2 == 3) {
					this.timedEvent = this.time.addEvent({
						delay: 800,
						callback: () => {
							this.manny2_bird.setVisible(true);
							this.manny2_bird.setVelocityX(-800);
						},
					});
				}
				// ALCAPOTE 'SUPER LANCER' _sword
				if (this.player2 == 4) {
					this.timedEvent = this.time.addEvent({
						delay: 1000,
						callback: () => {
							this.lempereur2_sword.setVisible(true);
							this.lempereur2_sword.setVelocityX(-1100);
						},
					});
				}
			} else if (animation.key == 'player2_deffense_1') {
				this.fx_p2_deffense_1.play();
			}

			// play sound animation
		});
		// PLAYER 2 ANIMATIONS COMPLETE ################################
		this.playCharacter2.on('animationcomplete', (animation) => {
			console.log('animation finish P2');
			if (animation.key == 'player2_attack_1') {
				if (this.player2 == 1) {
					this.playCharacter2.setVelocityX(0);
					this.playCharacter2.setPosition(1360, this.playCharacter2.y);
				}
				if (this.player2 == 4) {
					this.lempereur2_injure.setVisible(false);
					this.lempereur2_injure.setVelocityX(0);
					this.lempereur2_injure.setPosition(980, 500);
				}
			}
			// else if (animation.key == 'player2_attack_1_reverse') {
			// 	// y quitarle la velocidad
			// 	this.playCharacter2.setVelocityX(0);
			// }
			if (animation.key == 'player2_attack_3') {
				if (this.player2 == 3) {
					this.manny2_bird.setVisible(false);
					this.manny2_bird.setVelocityX(0);
					this.manny2_bird.setPosition(910, 500);
					this.playCharacter1.play('player1_hurt');
				}
				if (this.player2 == 4) {
					this.lempereur2_sword.setVelocityX(0);
					this.lempereur2_sword.setPosition(880, 500);
					this.lempereur2_sword.setVisible(false);
					this.playCharacter1.play('player1_hurt');
				}
				// arranca hurt animation player2
			}
			// this.enemy.play('lempereur_hurt');
		});
	}
	startAnims() {
		// DEBUG ARRANCANDO ANIMACIONES
		this.timedEvent = this.time.addEvent({
			delay: 3000,
			callback: () => {
				this.playCharacter1.play('player1_start');
			},
		});
		this.timedEvent = this.time.addEvent({
			delay: 6000,
			callback: () => {
				this.playCharacter2.play('player2_start');
			},
		});
	}
	createMicros() {
		/** ##### others elements */
		this.micro1 = this.add.image(700, -500, 'micro1');
		this.micro2 = this.add.image(1200, -700, 'micro2');
		this.micro1.setDataEnabled();
		this.micro1.data.set('position', 'down');
		this.micro2.setDataEnabled();
		this.micro2.data.set('position', 'down');
	}
	createProgressBars() {
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
	}
	createMenuInitP1() {
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
				this.soundButtonClick.play();
				// ######## click BUTTON ATTACK ######
				this.scene.start('Main');
				// this.scene.stop('Battle');
			},
			this
		);
		// MENUINIT P1 ######################################
	}
	createMenuAttackP1() {
		// MENUATTACK P1 ####################################
		this.menuP1Attack = this.add.container(0, 0);

		this.btnAttackA = this.add.sprite(20, 792, `btn_${this.player1}_atk_a`).setOrigin(0, 0).setInteractive();
		this.btnAttackB = this.add.sprite(268, 792, `btn_${this.player1}_atk_b`).setOrigin(0, 0).setInteractive(); // .setInteractive(true)
		this.btnAttackC = this.add.sprite(20, 844, `btn_${this.player1}_atk_c`).setOrigin(0, 0).setInteractive();
		// texto de los botones

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
					let delay = this.actionDelayPlayer1[1];
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
					let delay = this.actionDelayPlayer1[2];
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
					let delay = this.actionDelayPlayer1[3];
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
		// 			let delay = this.actionDelayPlayer1[4];
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
		// MENUATTACK P1 ####################################
	}
	createMenuDeffenseP1() {
		// MENUDEFENSE P1 ###################################
		this.menuP1Deffense = this.add.container(0, 0);

		this.btnDeffenseA = this.add.sprite(20, 792, `btn_${this.player1}_def_a`).setOrigin(0, 0).setInteractive();
		// this.btnDeffenseB = this.add.sprite(20, 844, 'buttonAttackB').setOrigin(0, 0).setInteractive();
		// this.btnDeffenseC = this.add.sprite(268, 792, 'buttonAttackC').setOrigin(0, 0).setInteractive(); // .setInteractive(true)
		// this.btnDeffenseD = this.add.sprite(268, 844, 'buttonAttackD').setOrigin(0, 0).setInteractive(); // .setInteractive(true)
		// texto de los botones

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
					let delay = this.actionDelayPlayer1[4];
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
		// 			let delay = this.actionDelayPlayer1[6];
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
		// 			let delay = this.actionDelayPlayer1[7];
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
		// 			let delay = this.actionDelayPlayer1[8];
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
		// MENUDEFENSE P1 ###################################
	}
	createMenuEnemy() {
		// MENU ENENMY ##########################################################
		this.menuP2 = this.add.group();
		this.btn_p2_attack = this.add.sprite(1400, 792, 'buttonAttack').setOrigin(0, 0);
		this.btn_p2_deffense = this.add.sprite(1400, 844, 'buttonDefense').setOrigin(0, 0);

		this.menuP2.add(this.btn_p2_attack);
		this.menuP2.add(this.btn_p2_deffense);
		// MENU ENENMY ##########################################################
		// PANELS TURN1 TURN2
		this.panelLogoLeft = this.add.image(480, 870, 'panelTurn2').setVisible(false);
		this.panelLogoRight = this.add.image(1440, 870, 'panelTurn1').setVisible(false);
		this.panelInactionLeft = this.add.image(480, 870, 'panelInAction1').setVisible(false);
		this.panelInactionRight = this.add.image(480, 870, 'panelInAction2').setVisible(false);
		// PANELS TURN1 TURN2
		// MENU ENENMY ##########################################################
	}
	// BATTLE MENUS ######################
	progressbarsPowerMaker() {
		const maxPower = 500; // rapper max power
		const maxSizeBar = 550; // bar max size
		if (this.p1Power > 500) this.p1Power = 500;
		if (this.p2Power > 500) this.p2Power = 500;
		if (this.p1Power < 0) this.p1Power = 0;
		if (this.p2Power < 0) this.p2Power = 0;
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
		let actionRimeP1 = this.RIMES[this.player1][0]; // Chenzen = 1,  1*2 = 2
		let actionRimeP2 = this.RIMES[this.player2][0]; // Chenzen = 1,  1*2 = 2
		this.p1TextAction.setText(actionRimeP1);
		this.p2TextAction.setText(actionRimeP2);

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
		let attacktype = Phaser.Math.Between(1, 4);
		let delay = this.actionDelayPlayer2[attacktype];
		this.optionP2Selected(attacktype, delay);
	}
	deffenseP1Selected(deffensetype, delay) {
		if (deffensetype == 'A') {
			// por ahora solo hay un tipo 'A'
			this.playCharacter1.play('player1_deffense_1');
			let actionText = this.RIMES[this.player1][4];
			this.TextAction(actionText, '');
		}
		this.p1Power += 50;
		// this.p2Power = 0; // DEBUG
		console.log('p1 Power: ' + this.p1Power);
		if (this.p1Power > 500) this.p1Power = 500;
		if (this.p1Power < 0) this.p1Power = 0;
		// this.p1PowerText.setText(this.p1Power + '/500');
		this.progressbarsPowerMaker();
		// delay

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
		let actionText;
		if (attackType == 'A') {
			this.playCharacter1.play('player1_attack_1');
			actionText = this.RIMES[this.player1][1]; // Chenzen = 1,  1*2 = 2
		} else if (attackType == 'B') {
			this.playCharacter1.play('player1_attack_2');
			actionText = this.RIMES[this.player1][2]; // Chenzen = 1,  1*2 = 2
		} else if (attackType == 'C') {
			this.playCharacter1.play('player1_attack_3');
			actionText = this.RIMES[this.player1][3]; // Chenzen = 1,  1*2 = 2
		}
		this.TextAction(actionText, '');
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
		if (this.p2Power > 500) this.p2Power = 500;
		if (this.p2Power < 0) this.p2Power = 0;
		// this.p2PowerText.setText(this.p2Power + '/500');
		this.progressbarsPowerMaker();
		// delay
		this.panelInactionLeft.setVisible(true);
		this.timedEvent = this.time.addEvent({
			delay: delay + 1000,
			callback: () => {
				this.checkSatusGame(1);
			},
		});
	}
	optionP2Selected(attacktype, delay) {
		// texto de action
		let actionText;
		if (attacktype == 1) {
			console.log('Enemy Attack 1');
			this.playCharacter2.play('player2_attack_1');
			this.paintButton(attacktype);
			this.calculateAttackP2toP1();
			actionText = this.RIMES[this.player2][1]; // Chenzen = 1,  1*2 = 2
		} else if (attacktype == 2) {
			console.log('Enemy Attack 2');
			this.playCharacter2.play('player2_attack_2');
			this.paintButton(attacktype);
			this.calculateAttackP2toP1();
			actionText = this.RIMES[this.player2][2]; // Chenzen = 1,  1*2 = 2
		} else if (attacktype == 3) {
			console.log('Enemy Attack 3');
			this.playCharacter2.play('player2_attack_3');
			this.paintButton(attacktype);
			this.calculateAttackP2toP1();
			actionText = this.RIMES[this.player2][3]; // Chenzen = 1,  1*2 = 2
		} else if (attacktype == 4) {
			console.log('Enemy deffense');
			this.playCharacter2.play('player2_deffense_1');
			this.paintButton(attacktype);
			this.calculateDeffenseP2();
			actionText = this.RIMES[this.player2][4]; // Chenzen = 1,  1*2 = 2
		}
		this.TextAction('', actionText);

		this.timedEvent = this.time.addEvent({
			delay: delay + 1000,
			callback: () => {
				this.repaintButton();
				this.checkSatusGame(2);
			},
		});
	}
	paintButton(attacktype) {
		if (attacktype > 0 && attacktype < 4) {
			this.btn_p2_attack.setTint(0xcaffca);
		} else {
			this.btn_p2_deffense.setTint(0xcaffca);
		}
	}
	repaintButton() {
		this.btn_p2_attack.setTint(0xffffff);
		this.btn_p2_deffense.setTint(0xffffff);
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
		if (this.p1Power > 500) this.p1Power = 500;
		if (this.p1Power < 0) this.p1Power = 0;
		this.p1PowerText.setText(this.p1Power + '/500');

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
		if (winner == true) {
			this.scene.start('Win', { player1: this.player1, player1Xp: this.p1Xp });
		} else {
			this.scene.start('Gameover', { player1: this.player1, player1Xp: this.p1Xp });
		}
	}
}
