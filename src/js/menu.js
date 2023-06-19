


export default class menu extends Phaser.Scene {
    constructor() {
      super({ key: "menu" });
    }

    
    
    preload() { 
      
       
          
          }
  
    create() {


  // Par défaut le point d'ancrage d'une image est le centre de cette derniere
 
    this.bg = this.physics.add.staticSprite(this.game.renderer.width/2, this.game.renderer.height/2, "fond_menu").setDepth(0);
    this.add.image(this.game.renderer.width/2, this.game.renderer.height/3, "imageLogo").setDepth(0);
   // this.add.image(this.game.renderer.width/2, this.game.renderer.height/1.40,"imageCommandes");


 // a implémenter plus tard ( spritesheet trop lourd pour s'afficher sur mobile)
                  /*  this.bg.bouge = true;
                    this.anims.create({
                      key: "fond_menu",
                      frames: this.anims.generateFrameNumbers("fond_menu", { start: 0, end: 3 }),
                      frameRate: 1,
                      repeat: -1
                    });
                  
                    if (this.bg.bouge == true) {
                      this.bg.play("fond_menu");
                    }
                */




    //ajout bouton lancement ( où se fait la detection " touch")
    this.bouton_play = this.add.image(this.game.renderer.width/2, this.game.renderer.height*0.6, "imageBoutonPlay").setDepth(1);
    
    // on ajout le sprite du personnage qui sera affiché sur le menu 
    this.hoverSprite = this.add.sprite(100,100,"gouteSolo");
    // on le grandit
     this.hoverSprite.setScale(2);
    //  le met invisible par défaut
    this.hoverSprite.setVisible(false);

     
      //on rend le bouton interratif
      this.bouton_play.setInteractive();



      //Cas ou la souris passe sur le bouton play
      this.bouton_play.on("pointerover", () => {
        this.hoverSprite.setVisible(true);
        this.hoverSprite.x = this.bouton_play.x - this.bouton_play.width;
        this.hoverSprite.y = this.bouton_play.y
        });


      
                    //Cas ou la souris ne passe plus sur le bouton play
                    this.bouton_play.on("pointerout", () => {
                      this.hoverSprite.setVisible(false);
                    });
                
                
                                //Cas ou la sourris clique sur le bouton play :
                                // on lance le niveau principal
                                this.bouton_play.on("pointerup", () => {
                                  this.scene.start("main_scene");
                                });
    }

 

  } 

  