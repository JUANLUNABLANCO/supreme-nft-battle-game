export class Battle extends Phaser.Scene {
	constructor() {
		super({ key: 'Battle' });
	}

	init(data) {
		// recibiendo datos de Main
		this.rappers = ['', 'CRYPTOALONZO', 'CRYPTOALRIMA', 'CRYPTOGAZO', 'CRYPTOBIGFLO_OLI'];
		this.player1 = data.player1;
		this.player2 = data.player2;
		this.player1Name = this.rappers[data.player1];
		this.player2Name = this.rappers[data.player2];
		console.log('player 1: ' + this.player1 + ' Name: ' + this.player1Name);
		console.log('player 2: ' + this.player2 + ' Name: ' + this.player2Name);

		// #### rimes
		this.RIMES = [
			'When I hear your voice, it makes me \n\ntravel like rap. Your voice is my culture, \n\nyou have made me fall in love',
			'Because you are that rhyme that removes \n\nthe thorns that have remained from \n\nthe past, your presence enlightens me',
			'You are the infinite ink with which I \n\nwant to write The one that made my \n\nheart beat again',
			'My hands are simple rhymes with a flow \n\nthat slides in you An I love you \n\ndisguised in a simple caress',
			'You are the butterfly that has crossed \n\nthe wide sea And by perching on my lips\n\nyou inspired me to rhyme',
			'If only your look makes me blush and \n\nyour smile inspires me more than lukie\n\n look',
			'Today I feel like a poet madly in love \n\nAnd every rhyme that is about love, \n\nI have saved it for you',
			'If I draw a graffiti of your name on \n\nthe wall With that I see your face, you\n\n managed to drive me crazy',
			'I love you, my love, as much as I love \n\nrap You are the closest thing to the \n\nfeeling of rapping',
			'Because you fill my heart and soul with\n\n life, you are the most beautiful \n\nphrase that stands out in my rhymes',
			'I love you, my love, as much as I love \n\nrapping. You are the closest thing to \n\nfeeling rapping',
			'Because you fill my heart and soul with \n\nlife, you are the most beautiful \n\nphrase that stands out in my rhymes',
			'When you are not present I lack motivation \n\nBecause you are the reason for \n\nall my inspiration',
			'If rap is a mistake I want to live wrong \n\nIf loving you is a mistake for \n\nyou I always live wrong',
			'And I have two loves, don´t make me \n\njealous Rap and you my love my most \n\nbeautiful butterfly',
			'You entered my head like a love rhyme \n\nTurning each thorn into red flower \n\npetals',
			'I think of you and only poetry comes \n\nout and it is my heart that shouts that \n\nyou are my joy',
			'Never let go of my hand because I love\n\n to feel your skin and your soft lips \n\nthat kiss me with a taste of honey',
			'You are the number one fan of this rapper \n\nAnd that´s why I dedicate this \n\nletter to you with my phrases',
			'You are the drug that cannot be left \n\nI am addicted to your love because you \n\nare like my rap',
			'I love you, my love, as much as I love \n\nrap You are the closest thing to the \n\nfeeling of rapping',
			'Because you fill my heart and soul with \n\nlife, you are the most beautiful phrase \n\nthat stands out in my rhymes',
			'I love you, my love, as much as I love \n\nrap You are the closest thing to the \n\nfeeling of rapping',
			'Because you fill my heart and soul with \n\nlife, you are the most beautiful phrase \n\nthat stands out in my rhymes',
		];

		// variables here
		this.habilities = ['hurl insults', 'xtreme velocity', 'super rhymes', ' high level rap', 'desmoralize'];
		this.habilitiesCoef = [2.5, 3.5, 4, 2.2, 3];
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
		console.log(`/assets/images/characters/${this.player1}.png`);
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
		this.soundButtonClick = this.sound.add('soundButtonClick');
		// menu sounds

		/* ##### backgrounds */
		this.background = this.add.image(0, 0, 'background');
		this.background.setOrigin(0, 0);
		// añadir plataforma con física y colisiones, pero sin gravedad e inamovible
		this.platform = this.physics.add.image(960, 736, 'platform').setImmovable();
		this.platform.body.allowGravity = false;

		/* ##### characters */
		// añadir cartas con física y colisiones, gravedad y movimiento
		this.playCharacter1 = this.physics.add.image(460, 100, `playCharacter1_${this.player1}`);
		this.playCharacter1.setBounce(0.2);
		// this.playCharacter1.body.allowGravity = false;
		this.playCharacter2 = this.physics.add.image(1360, 100, `playCharacter1_${this.player2}`);
		this.playCharacter2.setBounce(0.3);
		this.playCharacter2.flipX = true;
		// this.playCharacter2.body.allowGravity = false;

		/** ##### others elements */
		this.micro1 = this.add.image(530, -500, 'micro1');
		this.micro2 = this.add.image(1300, -700, 'micro2');
		this.micro1.setDataEnabled();
		this.micro1.data.set('position', 'down');
		this.micro2.setDataEnabled();
		this.micro2.data.set('position', 'down');

		// fisica colisiones
		this.physics.add.collider(this.playCharacter1, this.platform); // ahora chocaran
		this.physics.add.collider(this.playCharacter2, this.platform); // ahora chocaran

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
		this.btnAttackB = this.add.sprite(20, 844, 'buttonAttackB').setOrigin(0, 0).setInteractive();
		this.btnAttackC = this.add.sprite(268, 792, 'buttonAttackC').setOrigin(0, 0).setInteractive(); // .setInteractive(true)
		this.btnAttackD = this.add.sprite(268, 844, 'buttonAttackD').setOrigin(0, 0).setInteractive(); // .setInteractive(true)
		this.btnAttackBack = this.add.sprite(20, 896, 'buttonAttackBack').setOrigin(0, 0).setInteractive(); // .setInteractive(true)
		this.menuP1Attack.add([this.btnAttackA, this.btnAttackB, this.btnAttackC, this.btnAttackD, this.btnAttackBack]);

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
					this.soundButtonClick.play();
					// ######## click BUTTON ATTACK ######
					console.log('attack A');
					this.attackP1Selected('A', 6000);
				}
			},
			this
		);
		this.btnAttackB.on(
			'pointerup',
			function (pointer) {
				// DEBUG console.log(pointer);
				if (this.turn == 1) {
					this.soundButtonClick.play();
					// ######## click BUTTON ATTACK ######
					console.log('attack B');
					this.attackP1Selected('B', 5000);
				}
			},
			this
		);
		this.btnAttackC.on(
			'pointerup',
			function (pointer) {
				// DEBUG console.log(pointer);
				if (this.turn == 1) {
					this.soundButtonClick.play();
					// ######## click BUTTON ATTACK ######
					console.log('attack C');
					this.attackP1Selected('C', 7000);
				}
			},
			this
		);
		this.btnAttackD.on(
			'pointerup',
			function (pointer) {
				// DEBUG console.log(pointer);
				if (this.turn == 1) {
					this.soundButtonClick.play();
					// ######## click BUTTON ATTACK ######
					console.log('attack D');
					this.attackP1Selected('D', 10000);
				}
			},
			this
		);
		this.btnAttackBack.on(
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
		this.menuP1Deffense = this.add.container(0, 0);

		this.btnDeffenseA = this.add.sprite(20, 792, 'buttonAttackA').setOrigin(0, 0).setInteractive();
		this.btnDeffenseB = this.add.sprite(20, 844, 'buttonAttackB').setOrigin(0, 0).setInteractive();
		this.btnDeffenseC = this.add.sprite(268, 792, 'buttonAttackC').setOrigin(0, 0).setInteractive(); // .setInteractive(true)
		this.btnDeffenseD = this.add.sprite(268, 844, 'buttonAttackD').setOrigin(0, 0).setInteractive(); // .setInteractive(true)
		this.btnDeffenseBack = this.add.sprite(20, 896, 'buttonAttackBack').setOrigin(0, 0).setInteractive(); // .setInteractive(true)
		this.menuP1Deffense.add([
			this.btnDeffenseA,
			this.btnDeffenseB,
			this.btnDeffenseC,
			this.btnDeffenseD,
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
					this.soundButtonClick.play();
					// ######## click BUTTON ATTACK ######
					console.log('deffense A');
					this.deffenseP1Selected('A', 6000);
				}
			},
			this
		);
		this.btnDeffenseB.on(
			'pointerup',
			function (pointer) {
				// DEBUG console.log(pointer);
				if (this.turn == 1) {
					this.soundButtonClick.play();
					// ######## click BUTTON ATTACK ######
					console.log('deffense B');
					this.deffenseP1Selected('B', 6000);
				}
			},
			this
		);
		this.btnDeffenseC.on(
			'pointerup',
			function (pointer) {
				// DEBUG console.log(pointer);
				if (this.turn == 1) {
					this.soundButtonClick.play();
					// ######## click BUTTON ATTACK ######
					console.log('deffense C');
					this.deffenseP1Selected('C', 7000);
				}
			},
			this
		);
		this.btnDeffenseD.on(
			'pointerup',
			function (pointer) {
				// DEBUG console.log(pointer);
				if (this.turn == 1) {
					this.soundButtonClick.play();
					// ######## click BUTTON ATTACK ######
					console.log('deffense D');
					this.deffenseP1Selected('D', 8000);
				}
			},
			this
		);
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
		// progress bar 1
		const maxPower = 500; // rapper max power
		const maxSizeBar = 550; // bar max size
		this.progressBars = this.add.graphics();
		this.progressBars.clear();

		this.progressBars.fillStyle(0x2d2d2d);
		this.progressBars.fillRect(32, 60, maxSizeBar, 35);

		// this.progressBars.fillStyle(0xffffff);
		// this.progressBars.fillRect(32, 60, maxSizeBar, 35);
		this.progressBars.fillStyle(0x2dff2d);
		this.progressBars.fillRect(32, 60, (maxSizeBar * this.p1Power) / maxPower, 35);
		// progress bar 2
		this.progressBars.fillStyle(0x2d2d2d);
		this.progressBars.fillRect(1226, 60, maxSizeBar, 35);

		// this.progressBars.fillStyle(0xffffff);
		// this.progressBars.fillRect(1226, 60, maxSizeBar, 35);
		this.progressBars.fillStyle(0x2dff2d);
		this.progressBars.fillRect(1226, 60, (maxSizeBar * this.p2Power) / maxPower, 35);

		// update text sibling
		this.p1PowerText.setText(this.p1Power + '/500');
		this.p2PowerText.setText(this.p2Power + '/500');
	}
	/**
	 * @dev modifica los textos del jugador 1 y el dos puedes darle una animación o un setimeOut al 2
	 * @param {*} text1
	 * @param {*} text2
	 *
	 */
	TextAction(text1 = '', text2 = '') {
		// SHOULD BE panel turn1 y panel turn2 off, and menuP1 active
		this.p1TextAction.setText(text1);
		// darle un tiempo
		this.p2TextAction.setText(text2);
		// TODO sonido risa, burla,...
	}
	showMenuP1(ver) {
		console.log('in show menu p1: ', ver);
		if (ver == true) {
			console.log('visible: true | interactive: true');
			this.menuP1Init.setVisible(ver);
			// this.menuP1Attack.setVisible(false);
			// this.menuP1Deffense.setVisible(false);
			this.panelLogoLeft.setVisible(false);
			this.panelLogoRight.setVisible(true);
		} else {
			console.log('visible: false | interactive: true');
			this.menuP1Init.setVisible(false);
			// this.menuP1Attack.setVisible(false);
			// this.menuP1Deffense.setVisible(false);
			this.panelLogoRight.setVisible(false);
			this.panelLogoLeft.setVisible(true);
		}
	}
	openMenuAttackP1() {
		// MENU changue ###############
		this.menuP1Init.setVisible(false);
		this.menuP1Deffense.setVisible(false);
		this.menuP1Attack.setVisible(true);
		// MENU changue ###############
		// this.textsMaker();
	}
	openMenuDeffenseP1() {
		// MENU changue ###############
		this.menuP1Init.setVisible(false);
		this.menuP1Attack.setVisible(false);
		this.menuP1Deffense.setVisible(true);
		// MENU changue ###############
	}
	// BATTLE SYSTEM ############
	beginRound() {
		// TODO some music effect before start the round
		console.log('in Begin Round');
		this.turn = 1;
		this.p1TextAction.setText('I´m ready...');
		this.p2TextAction.setText('You´re dead, motherfucker!');

		this.changueTurn(1, 4000);
	}
	changueTurn(turnPlayer, delay) {
		console.log('in changueTurn: ' + turnPlayer);
		// TODO play some sound effect here, like go
		this.turn = turnPlayer;
		if (turnPlayer == 2) {
			this.timedEvent = this.time.addEvent({
				delay: delay,
				callback: () => {
					this.micro1.data.set('position', 'up');
					this.micro2.data.set('position', 'down');
				},
			});
			this.showMenuP1(false);
			this.turnP2();
		} else if (turnPlayer == 1) {
			this.timedEvent = this.time.addEvent({
				delay: delay,
				callback: () => {
					this.micro1.data.set('position', 'down');
					this.micro2.data.set('position', 'up');
				},
			});
			this.showMenuP1(true);
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
	}

	deffenseP1Selected(deffensetype, delay) {
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
			this.soundAttack1.play();
			// lanzamiento de rimas
			let attackRime = this.RIMES[Phaser.Math.Between(0, 24)];

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
		this.timedEvent = this.time.addEvent({
			delay: delay + 5000,
			callback: () => {
				this.checkSatusGame(1);
			},
		});
	}

	defenseP2() {
		// TODO defense p2 logic
		// this.textsMaker();
		this.checkSatusGame(2); // player2 check
	}
	attackP2() {
		// attacks p2
		// this.p1PowerAttack = (((this.p1Power / 10) * this.p1Moral) / 100) * this.habilitiesCoef[this.p1Hability];
		// console.log('attack: ' + this.p1PowerAttack);
		// this.p2Defense = (this.p2Moral / 100) * this.habilitiesCoef[this.p1Hability];
		// console.log('defense: ' + this.p2Defense);
		// this.totalAttack = this.p1PowerAttack - this.p2Defense;
		// console.log(this.totalAttack);
		// this.p2Power -= this.totalAttack;
		// this.p2PowerText.setText('POWER: ' + this.p2Power + '/100');
		// this.textsMaker();
		this.soundAttack4.play();
		// lanzamiento de rimas
		let attackRime = this.RIMES[Phaser.Math.Between(0, 24)];

		// EAXMPLE 'When I hear your voice, it makes \n\nme travel like rap. Your voice is my\n\nculture, you have made me fall in love',
		this.TextAction(attackRime, '');

		this.timedEvent = this.time.addEvent({
			delay: delay + 5000,
			callback: () => {
				console.log('Enemy attacking Player1!');
				this.p2PowerAttack = (((this.p2Power / 10) * this.p2Moral) / 100) * this.habilitiesCoef[this.p2Hability];
				console.log('attack: ' + this.p2PowerAttack);
				this.p1Defense = (this.p2Moral / 100) * this.habilitiesCoef[this.p2Hability];
				console.log('defense: ' + this.p1Defense);
				this.totalAttack = this.p2PowerAttack - this.p1Defense;
				console.log(this.totalAttack);
				this.p1Power -= this.totalAttack;
				this.p1PowerText.setText('POWER: ' + this.p1Power + '/100');
				this.textsMaker();
				this.checkSatusGame(1);
			},
		});
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
				if (this.p2RoundsWinned >= 1) {
					console.log('game over, ganador p2');
					this.timedEvent = this.time.addEvent({
						delay: delay,
						callback: () => {
							this.gameOver(false);
						},
					});
				} else {
					this.timedEvent = this.time.addEvent({
						delay: delay,
						callback: () => {
							this.nextRound();
						},
					});
				}
			}
			if (this.p2Power <= 0) {
				// TODO aumentar experiencia player1
				this.p1RoundsWinned++;
				if (this.p1RoundsWinned >= 1) {
					console.log('ganaste ganador p1');
					this.p1Xp++;
					this.timedEvent = this.time.addEvent({
						delay: delay,
						callback: () => {
							this.gameOver(false);
						},
					});
				} else {
					this.timedEvent = this.time.addEvent({
						delay: delay,
						callback: () => {
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
