const contact = document.querySelector(".contact");


export default class next_level extends Phaser.Scene {
    // constructeur de la classe
    constructor() {
      super({
        key: "next_level" 
      });
    }
    
  
                                /***********************************************************************/
                            /** récupère les données envoyée avec " next_level.start...." scene précédente
                             /***********************************************************************/
                            
   init(data)
    {this.données = data}



preload() {
  
  }


create(){

// création des layers
const carteDuNiveauNext_level = this.add.tilemap("carte_next_level");

const tileset = carteDuNiveauNext_level.addTilesetImage(
  "next_level",
  "Phaser_portofolio"
);  

// chargement des calques
const plateformesNext_level = carteDuNiveauNext_level.createLayer(
  "plateformesNext_level",
  tileset
);

const bg = carteDuNiveauNext_level.createLayer(
  "bg",
  tileset
);



                                /***********************************************************************/
                            /** set up commandes tactiles + écouteurs
                             /***********************************************************************/
                            



 this.commandes = this.physics.add.staticGroup();
  this.btn_gauche = this.commandes.create(860,560, "btn_fleche_gauche").setDepth(20).setScale(2);
 this.btn_droit = this.commandes.create(940,560, "btn_fleche_droite").setDepth(20).setScale(2);
 this.btn_haut = this.commandes.create(40,165, "btn_fleche_haut").setDepth(20).setScale(2);
 this.btn_espace = this.commandes.create(70,215, "btn_espace").setDepth(20).setScale(1.2);
 this.commandes.setVisible(false);





                if ((IS_TOUCH) == true) {
                  this.commandes.setVisible(true);
                  this.btn_droit.setInteractive();
                  this.btn_gauche.setInteractive();
                  this.btn_haut.setInteractive();
                  this.btn_espace.setInteractive();
                


                                              this.moveLeft=false;
                                              this.moveRight=false;
                                              this.moveJump=false;
                                              this.espaceOn=false;
                                                          this.btn_gauche.on("pointerdown", () => {
                                                            this.moveLeft = true;
                                                          });
                                                          this.btn_gauche.on("pointerup", () => {
                                                            this. moveLeft = false;
                                                            });


                                                            this.btn_droit.on("pointerdown", () => {
                                                              this.moveRight = true;
                                                                  });
                                                                  this.btn_droit.on("pointerup", () => {
                                                                    this.moveRight = false;
                                                                    });



                                                                    this.btn_haut.on("pointerdown", () => {
                                                                      this.moveJump = true;

                                                                      });
                                                                      this. btn_haut.on("pointerup", () => {
                                                                        this.moveJump = false;
                                                                        });


                                                                        this.btn_espace.on("pointerdown", () => {
                                                                          this.espaceOn = true;
                                                
                                                                        });
                                                                        this.btn_espace.on("pointerup", () => {
                                                                          this.espaceOn = false;
                                                                          });

                                                                        }

/*************************************
    *  //ajout affiches wanted
    *************************************/
this.add.image(this.game.renderer.width/1.4, this.game.renderer.height/1.85, "wantedMissions").setDepth(0);
 

 this.add.image(this.game.renderer.width/3.6, this.game.renderer.height/1.85, "wanted").setDepth(0);
  

/*************************************
    *  collisions
    *************************************/

plateformesNext_level.setCollisionByProperty({ estSolide: true }); 


/*************************************
    *  personnage
    *************************************/

// ajout personnage
this.player = this.physics.add.sprite(50, 592, "img_perso").setDepth(100);
this.player.refreshBody();



/*************************************
    *  popup "cliquables"
    *************************************/




let boxCliquables = this.add.image(500,325,"boxCliquables").setVisible(false);
  let BtnCliquables =  this.add.image(625,275,"BtnBienvenue").setVisible(false).setDepth(20);


BtnCliquables.setInteractive();

let bienvenuCLi = this.time.delayedCall(1500,
  function afficherCliquable() {
   boxCliquables.setVisible(true);
   BtnCliquables.setVisible(true).setDepth(20);
   
},
null, this);

BtnCliquables.on("pointerup", () => {
  boxCliquables.setVisible(false);
  BtnCliquables.setVisible(false);

 });

// ajout des interractions entre objets
this.physics.add.collider(this.player, plateformesNext_level);


// creation du clavier
this.clavier = this.input.keyboard.createCursorKeys();


/*************************************
    *  porte retour si ordinateur
    *************************************/

// creation de la porte vers main_scene

if(!IS_TOUCH){
this.portal = this.physics.add.staticSprite(50, 592, "portal").setDepth(1);
this.portal.active=true;

if(this.portal.active){
  this.portal.play("anim_portal");
}
}

/*************************************
    *  liens
    *************************************/
const button = this.add.image(850, 160, "lien").setInteractive();
this.pointExLink = this.add.image(0,0,"pointExc");
this.pointExLink.setVisible(false);

button.on("pointerover", () => {
  this.pointExLink.setVisible(true);
  this.pointExLink.x = button.x + 50;
  this.pointExLink.y = button.y;
});
  
                    //Cas ou la souris ne passe plus sur le bouton play
                    button.on("pointerout", () => {
                      this.pointExLink.setVisible(false);
                    });



                            button.on("pointerup", this.openExternalLink, this);






const contact = this.add.image(280,570, "contact").setInteractive();
this.pointExContact = this.add.image(0,0,"pointExc");
this.pointExContact.setVisible(false);



contact.on("pointerover", () => {
  this.pointExContact.setVisible(true);
  this.pointExContact.x = contact.x + 120;
  this.pointExContact.y = contact.y;
});
  
                    //Cas ou la souris ne passe plus sur le bouton play
                    contact.on("pointerout", () => {
                      this.pointExContact.setVisible(false);
                    });



                             contact.on("pointerup", this.openContactForm, this);

              }

update(){
  
  
                                /***********************************************************************/
                            /**  mouvements clavier
                             /***********************************************************************/
                            
  if (this.clavier.left.isDown) {
  this.player.setVelocityX(-160);
  this.player.anims.play("anim_tourne_gauche", true);
  
          } else if (this.clavier.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play("anim_tourne_droite", true);

                      } else {
                        this.player.setVelocityX(0);
                        this.player.anims.play("anim_face");
                      }

                                      if (this.clavier.up.isDown && this.player.body.blocked.down) {
                                        this.player.setVelocityY(-200);
                                      }


                                /***********************************************************************/
                            /**  mouvements tactiles
                             /***********************************************************************/
                            

if (IS_TOUCH==true){

  if (this.moveLeft) 
  {
    this.goLeft();

  } 
  
    else if (this.moveRight)

      {
        this.goRight();

      } else  
      
      {
        this.player.setVelocityX(0);
        this.player.anims.play("anim_face");
       }
                
        
        if (this.player.body.blocked.down)
            if (this.moveJump) {
              this.goJump();
            } else {
              this.moveJump=false;
            };

          }




                                /***********************************************************************/
                            /** porte retour 
                             /***********************************************************************/
                            


 if (this.clavier.space.isDown) {
    if (this.physics.overlap(this.player, this.portal))
      this.scene.switch("main_scene");
    }





  }


  /***********************************************************************/
                            /** fonctions mouvements 
                             /***********************************************************************/
      

      goLeft(){

        this.player.setVelocityX(-160);
        this.player.anims.play("anim_tourne_gauche", true);
      
      }
      
      goRight(){
      
        this.player.setVelocityX(160);
        this.player.anims.play("anim_tourne_droite", true);
      }

      goJump(){

        this.player.setVelocityY(-220);
      
      }
      


openExternalLink ()
    {
        const cv = 'CV';

        const url = `https://drive.google.com/file/d/1cFnbP9yn_50Zc5V36Lf1GeJyJqke0y3G/view?usp=drive_link{encodeURIComponent()}`;

        const s = window.open(url, '_blank');

        if (s && s.focus)
        {
            s.focus();
        }
        else if (!s)
        {
            window.location.href = url;
        }
    }


    openContactForm ()
    {

      
      
        const contactForm = 'ContactForm';

        const url = contact ;

        const w = window.open(url, '_blank');

        if (w && w.focus)
        {
            w.focus();
        }
        else if (!w)
        {
            window.location.href = url;
        }
    }
}
