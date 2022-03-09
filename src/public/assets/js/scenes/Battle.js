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
			'If only your look makes me blush and \n\nyour smile inspires me more than lukie look',
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
		this.scenePaused = true;

		this.timedEvent;

		// ######### SCORES
		this.p1PowerText;
		this.p2PowerText;
		this.p1TextAction;
		this.p2TextAction;
	}

	preload() {
		console.log(`/assets/images/characters/${this.player1}.png`);
		this.load.image('background', '/assets/images/background_1920x1080.jpg');
		// this.load.image('gameover', '/assets/images/gameover_1920x1080.jpg');
		this.load.image('platform', '/assets/images/platform_1920x28.png');
		// nuevos personajes
		this.load.image('playCharacter1', `/assets/images/charactersP1/${this.player1}.png`);
		this.load.image('playCharacter2', `/assets/images/charactersP2/${this.player2}.png`);

		this.load.image('micro1', '/assets/images/microphone01.png');
		this.load.image('micro2', '/assets/images/microphone02.png');
		this.load.image('navbarDown', '/assets/images/elements/navbar_down.png');
		this.load.image('navbarPower', '/assets/images/elements/navbar_power.png');

		// buttons and elements of menu
		this.load.image('button', '/assets/images/elements/standard_button.png');
		this.load.image('buttonAttack', '/assets/images/elements/button_attack.png');
		this.load.image('buttonDefense', '/assets/images/elements/button_defense.png');
		this.load.image('buttonGiveup', '/assets/images/elements/button_giveup.png');
		// sounds
		this.load.audio('soundAttack1', '/assets/sounds/supreme_attack_1.mp3');
		this.load.audio('soundAttack2', '/assets/sounds/supreme_attack_2.mp3');
		this.load.audio('soundAttack3', '/assets/sounds/supreme_attack_3.mp3');
		this.load.audio('soundDefense1', '/assets/sounds/supreme_defense_1.mp3');
		this.load.audio('soundDefense2', '/assets/sounds/supreme_defense_2.mp3');
		this.load.audio('soundDefense3', '/assets/sounds/supreme_defense_3.mp3');
		this.load.audio('soundHability1', '/assets/sounds/supreme_hability_1.mp3');
		this.load.audio('soundHability2', '/assets/sounds/supreme_hability_2.mp3');
		this.load.audio('buttonOver', '/assets/sounds/button_over.mp3');
	}
	create() {
		// /* ##### sounds */
		this.soundAttack1 = this.sound.add('soundAttack1');
		this.soundAttack2 = this.sound.add('soundAttack2');
		this.soundAttack3 = this.sound.add('soundAttack3');
		this.soundDefense1 = this.sound.add('soundDefense1');
		this.soundDefense2 = this.sound.add('soundDefense2');
		this.soundDefense3 = this.sound.add('soundDefense3');
		this.soundHability1 = this.sound.add('soundHability1');
		this.soundHability1 = this.sound.add('soundHability2');
		this.buttonOver = this.sound.add('buttonOver');
		// menu sounds

		/* ##### backgrounds */
		this.background = this.add.image(0, 0, 'background');
		this.background.setOrigin(0, 0);
		// añadir plataforma con física y colisiones, pero sin gravedad e inamovible
		this.platform = this.physics.add.image(960, 736, 'platform').setImmovable();
		this.platform.body.allowGravity = false;

		/* ##### characters */
		// añadir cartas con física y colisiones, gravedad y movimiento
		this.playCharacter1 = this.physics.add.image(460, 100, 'playCharacter1');
		this.playCharacter1.setBounce(0.2);
		// this.playCharacter1.body.allowGravity = false;
		this.playCharacter2 = this.physics.add.image(1360, 100, 'playCharacter2');
		this.playCharacter2.setBounce(0.3);
		// this.playCharacter2.body.allowGravity = false;

		/** ##### others elements */
		this.micro1 = this.add.image(530, 0, 'micro1');
		this.micro2 = this.add.image(1300, 200, 'micro2');
		this.micro1.setVisible(false);
		this.micro2.setVisible(false);

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

		// menu p1 createMenu()
		this.menuP1 = this.add.group(); // 800, 550
		this.button1 = this.add.sprite(20, 792, 'buttonAttack').setOrigin(0, 0).setInteractive();
		this.button2 = this.add.sprite(20, 844, 'buttonDefense').setOrigin(0, 0).setInteractive();
		this.button3 = this.add.sprite(20, 896, 'buttonGiveup').setOrigin(0, 0).setInteractive(); // .setInteractive(true)

		this.menuP1.add(this.button1);
		this.menuP1.add(this.button2);
		this.menuP1.add(this.button3);

		// menu not interactive P2
		this.menuP2 = this.add.group();
		this.button4 = this.add.sprite(1400, 792, 'buttonAttack').setOrigin(0, 0);
		this.button5 = this.add.sprite(1400, 844, 'buttonDefense').setOrigin(0, 0);
		// this.button6 = this.add.sprite(1400, 896, 'buttonGiveup').setOrigin(0, 0).setInteractive();

		this.menuP1.add(this.button4);
		this.menuP1.add(this.button5);
		// this.menuP1.add(this.button6);

		// ocultar menu de momento
		// this.menuP1.setVisible(false);
		Phaser.Actions.Call(this.menuP1.getChildren(), function (item) {
			// item.setVisible(false); // no funciona
			console.log('get children ' + item.texture.key); // button
			item.on('pointerover', function (event) {
				// console.log('over');
				this.setTint(0xcacaca);
			});
			item.on('pointerout', function (event) {
				// console.log('out');
				this.setTint(0xffffff);
				// this.buttonOver.stop();
			});
		});
		this.button1.on('pointerdown', function (event) {
			// this.buttonOver.play();
		});
		this.button1.on(
			'pointerup',
			function (pointer) {
				console.log(pointer);
				// this.buttonOver.stop();
				// actions click BUTTON ATTACK
			},
			this
		);
		// this.button1.on('pointerover', function(event){
		// 	this.setTint(0xf2f2f2);
		// });

		// TODO after clicking a button start
		this.beginRound();
	}

	update() {
		if (!this.scenePaused) {
			if (this.turn == 1) {
				// menu, controles y acciones

				// this.defenseP1();
				// this.attackP1();
				// this.gameOver(true);

				// comprobaciones
				if (this.p1Power <= 0) {
					// TODO aumentar experiencia player2
					this.p2RoundsWinned++;
					if (this.p2RoundsWinned >= 3) {
						console.log('game over, ganador p2');
						this.gameOver(false);
					} else {
						nextRound();
					}
				}
				if (this.p2Power <= 0) {
					// TODO aumentar experiencia player1
					this.p1RoundsWinned++;
					if (this.p1RoundsWinned >= 3) {
						console.log('ganaste ganador p1');
						this.gameOver(true);
					} else {
						nextRound();
					}
				}
			} else {
				// TODO attackP2();
			}
		}
	}
	progressbarsPowerMaker() {
		// progress bar 1
		const maxPower = 500; // rapper max power
		const maxSizeBar = 550; // bar max size
		this.progressBars = this.add.graphics();
		this.progressBars.clear();

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
		this.p1PowerText.setText(this.p1Power + '/500');
		this.p2PowerText.setText(this.p1Power + '/500');
	}

	TextAction(text1 = '', text2 = '') {
		this.p1TextAction.setText(text1);
		this.p2TextAction.setText(text2);
		// TODO sonido risa, burla,...
	}

	beginRound() {
		// TODO some music effect before start the round
		console.log('in Begin Round');
		this.turn = 1;
		this.p1TextAction.setText('I´m ready...');
		this.p2TextAction.setText('You´re dead, motherfucker!');

		this.changueTurn(1, 2000);
	}
	changueTurn(rapper, delay) {
		console.log('in changueTurn');
		// TODO play some sound effect here, like go
		this.turn = rapper;
		if (rapper == 2) {
			this.timedEvent = this.time.addEvent({
				delay: delay,
				callback: () => {
					this.micro1.setVisible(false);
					this.micro2.setVisible(true);
				},
			});
			this.turnP2();
		} else {
			this.timedEvent = this.time.addEvent({
				delay: delay,
				callback: () => {
					this.micro1.setVisible(true);
					this.micro2.setVisible(false);
				},
			});
			this.showMenuP1();
		}
	}
	showMenuP1() {
		console.log('in show menu p1');
		this.menuP1.setVisible(true);
	}
	nextRound() {
		console.log('Next Round');
		this.micro1.setVisible(true);
		this.micro2.setVisible(true);
		this.p2Power = 500;
		this.p1Power = 500;

		// TODO click button start to continue
	}

	defenseP1() {
		this.soundDefense1.play();
		// defense
		this.TextAction('you will see now, eat dicks!', "I'm shaking...");

		// TODO logica de defensa
		// actionsDefense('p1');

		// TODO setTiemout 5000
		this.changueTurn(2, 5500);
	}
	attackP1() {
		this.soundAttack1.play();
		// attack
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
		this.p2PowerText.setText('POWER: ' + this.p2Power + '/100');
		// this.textsMaker();
		this.changueTurn(2, 7000);
	}
	defenseP2() {
		// TODO defense p2 logic
		// this.textsMaker();
		this.changueTurn(1);
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
		this.turn = 1;
		this.micro1.setVisible(true);
		this.micro2.setVisible(false);
	}

	gameOver(winner = false) {
		if (winner == true) {
			this.scene.start('Win', { player1: this.player1, player1Xp: this.p1Xp });
		} else {
			this.scene.start('Gameover', { player1: this.player1, player1Xp: this.p1Xp });
		}
	}
}
