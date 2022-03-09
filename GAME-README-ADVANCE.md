# Efectos básicos

## scalingeffect

update() {
if (this.element.scaleX < 2){// crecimiento hasta llegar al doble de su tamaño
this.element.scaleX += .05;
this.element.scaleY += .05;
}
}

# efectos de cámara //https://phaser.io/examples/v3/category/camera

    create ()
    {
       ...

        this.cameras.main.setViewport(5, 5, 390, 290);

        this.fadeCamera = this.cameras.add(405, 5, 390, 290);
        this.flashCamera = this.cameras.add(5, 305, 390, 290);
        this.shakeCamera = this.cameras.add(405, 305, 390, 290);

        this.fadeCamera.fade(2000);

        this.flashCamera.flash(1000);
    }

    update ()
    {
        // flashCamera.flash(750);
        this.shakeCamera.shake(1000, 0.025);

        if (this.fadeCamera.fadeEffect.alpha >= 1)
        {
            this.fadeCamera.fadeEffect.alpha = 0;
            this.fadeCamera.fade(2000);
        }
    }

## fadein fadeout camera

        this.tweens.add({
            targets: image,
            x: 100,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
            duration: 3000
        }); // ???

        this.cameras.main.once('camerafadeincomplete', function (camera) {
            camera.fadeOut(6000);
        });

        this.cameras.main.fadeIn(6000);

## scale manager

https://labs.phaser.io/edit.html?src=src/scalemanager/resize%20and%20fit.js&v=3.55.2

# orientation mobile //https://phaser.io/examples/v3/view/scalemanager/orientation-check

function create ()
{
ship = this.add.image(0, 0, 'pic').setOrigin(0);

    text = this.add.text(320, 128, 'Please set your\nphone to landscape', { font: '48px Courier', fill: '#00ff00', align: 'center' }).setOrigin(0.5);

    checkOriention(this.scale.orientation);

    this.scale.on('orientationchange', checkOriention, this);

}

function checkOriention (orientation)
{
if (orientation === Phaser.Scale.PORTRAIT)
{
ship.alpha = 0.2;
text.setVisible(true);
}
else if (orientation === Phaser.Scale.LANDSCAPE)
{
ship.alpha = 1;
text.setVisible(false);
}
}
