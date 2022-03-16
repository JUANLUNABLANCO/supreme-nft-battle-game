export class Win extends Phaser.Scene {
	constructor() {
		super({ key: 'Win' });
	}
	init(data) {
		this.player1 = data.player1;
		this.player1Xp = data.player1Xp;
	}
	preload() {
		console.log('WIN PLAYER 1');
	}
	create() {
		this.platform = this.physics.add.image(960, 736, 'platform').setImmovable();
		this.gameoverImage = this.add.image(960, 540, 'win');

		this.platform.body.allowGravity = false;
		this.playCard1 = this.physics.add.image(1100, 100, `playCharacter1_${this.player1}`);
		this.playCard1.setBounce(0.4);
		this.physics.add.collider(this.playCard1, this.platform);
		this.textsMaker();
	}
	textsMaker() {
		this.p2XpText = this.add.text(1050, 730, `CryptoXP: ${this.player1Xp}`, {
			fontSize: '20px',
			fill: '#fff',
			fontFamily: 'verdana, arial, sans-serif',
		});
	}
}
