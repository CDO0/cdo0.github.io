


const données = document.querySelector(".données"); // recuperation de la variable touch pour determiner si tactile



 let BtnBienvenue;
 let boxBienvenue;
 let boxBienvenueTouch;
 let bienvenuTime;
 let bienvenueTouch;
 let rappel;
 let boxrappelCommandes;
 let boxrappelCommandesTouch;

 let BtnRappel;
 let BtnBackground;
 let BtnCompetences;
 let BtnFormation;
 let BtnPortfolio;
 let BtnProjets;
 
 let tween_grotte; 
 let tween_rocheQuiMonte
 
 let levier;
 let levier_grotte;
 let levier_portal;

 let groupe_vague;
 let groupe_point;
 let point_background;
 let point_formation;
 let point_cePortoflio;
 let point_projets;
 let point_competences;
 
 let txt_background;
 let txt_formation;
 let txt_cePortfolio;
 let txt_projets;
 let txt_competences;
 
 let pointExc;
 let pointExc_grass;
 let pointExc_portal;
 let pointExc_portal_portal;
 let grass;
 let grass2;
 





 export default class main_scene extends Phaser.Scene {
    constructor() {
      super({ key: "main_scene" });
    }

  
 /**********************************************************************************************************************************************************************************************/
 /** FONCTION PRELOAD / La fonction preload est appelée une et une seule fois,lors du chargement de la scene dans le jeu.
 /***********************************************************************************************************************************************************************************************/
 
  preload() {
    };
  
  
 
 /**********************************************************************************************************************************************************************************************/
 /** FONCTION CREATE 
 /**********************************************************************************************************************************************************************************************/
 
 /* La fonction create est appelée lors du lancement de la scene
  * si on relance la scene, elle sera appelée a nouveau
  * on y trouve toutes les instructions permettant de créer la scene
  * placement des peronnages, des sprites, des platesformes, création des animations
  * ainsi que toutes les instructions permettant de planifier des evenements
  */


  create() {
   /*************************************
    *  CREATION DU MONDE  *
    *************************************/
   
 
 
   // chargement de la carte
 const carteDuNiveau = this.add.tilemap("carte");
 
 // chargement du jeu de tuiles
 const tileset = carteDuNiveau.addTilesetImage(
           "portofolio",
           "Phaser_portofolio"
         );  
 
 
 // chargement du calque calque_background
 const calque_background = carteDuNiveau.createLayer(
   "calque_background",
   tileset
 );
 
 
 
 // chargement du calque calque_background_2
 const calque_background_2 = carteDuNiveau.createLayer(
   "calque_background2",
   tileset
 );
 
 // chargement du calque calque_plateformes
 const calque_plateformes = carteDuNiveau.createLayer(
   "calque_plateformes",
   tileset
 );  
 




  /***********************************************************************/
 /** Commandes tactiles + ecouteurs 
 /***********************************************************************/

 this.commandes = this.physics.add.staticGroup();
 this.btn_gauche = this.commandes.create(855,580, "btn_fleche_gauche").setDepth(15).setScale(2.5);
 this.btn_droit = this.commandes.create(945,580, "btn_fleche_droite").setDepth(15).setScale(2.5);
 this.btn_haut = this.commandes.create(40,300, "btn_fleche_haut").setDepth(15).setScale(2.5);
 this.btn_espace = this.commandes.create(75,365, "btn_espace").setDepth(15).setScale(1.3);
 this.commandes.setVisible(false);


            if ((IS_TOUCH ) == true) {
              this.commandes.setVisible(true);
              this.btn_gauche.setInteractive();
              this.btn_droit.setInteractive();
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
                                          this.moveLeft = false;
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
                                                    this.btn_haut.on("pointerup", () => {
                                                      this.moveJump = false;
                                                      });


                                                      this.btn_espace.on("pointerdown", () => {
                                                        this.espaceOn = true;
                              
                                                      });
                                                      this.btn_espace.on("pointerup", () => {
                                                        this.espaceOn = false;
                                                        });
                                                      }

 /***********************
    *  CREATION DU CLAVIER *
    ************************/
   // ceci permet de creer un clavier et de mapper des touches, connaitre l'état des touches
   this.clavier = this.input.keyboard.createCursorKeys();
        


  /***********************************************************************/
 /** Ajout de la plateforme mobile + Mise en place de l'animation de la plateforme mobile + Ajout levier 
 /***********************************************************************/
 
let plateforme_mobile = this.physics.add.sprite(848,400,"plateforme_roche");
 plateforme_mobile.body.allowGravity = false;
 plateforme_mobile.body.immovable = true;
 

        tween_rocheQuiMonte = this.tweens.add({
          targets: [plateforme_mobile],  // on applique le tween sur platefprme_mobile
          paused: true, // de base le tween est en pause
          ease: "Linear",  // concerne la vitesse de mouvement : linéaire ici 
          duration: 5000,  // durée de l'animation pour descendre
          yoyo: true,   // mode yoyo : une fois terminé on "rembobine" le déplacement 
          y: "-=65",   // on va déplacer la plateforme de 300 pixel vers le haut par rapport a sa position
          delay: 0,     // délai avant le début du tween une fois ce dernier activé
          hold: 4000,   // délai avant le yoyo : temps qeu al plate-forme reste en haut
          repeatDelay: 3000, // deléi avant la répétition : temps que la plate-forme reste en bas
          repeat:-1 // répétition infinie 
        });
 

                levier = this.physics.add.staticSprite(945, 465, "img_levier"); 
                levier.active = false; 

                          /***********************************************************************/
                          /**point exclamation levier plateforme
                           /***********************************************************************/
                          pointExc =  this.physics.add.staticSprite(0,0,"pointExc");
                          grass = this.physics.add.staticSprite(752,378, "grass");
                          pointExc.x = levier.x;
                          pointExc.y = levier.y - levier.height;
                          pointExc.visible = false;



 /***********************************************************************/
 /** Ajout de la plateforme mobile grotte + Mise en place de l'animation de la plateforme mobile + Ajout levier 
 /***********************************************************************/

 let plateforme_mobile_grotte = this.physics.add.sprite(288,608,"plateforme_grotte");
  plateforme_mobile_grotte.body.allowGravity = false;
  plateforme_mobile_grotte.body.immovable = true;

            tween_grotte = this.tweens.add({
              targets: [plateforme_mobile_grotte],  
              paused: true, // de base le tween est en pause
              ease: "Linear",  // concerne la vitesse de mouvement
              duration: 5000,  // durée de l'animation
              yoyo: false,   // mode yoyo : une fois terminé on "rembobine" le déplacement 
              y: "-=64",   // deplacement de x pixels rapport a sa position
              delay: 0,     // délai avant le début du tween une fois ce dernier activé
              hold: 4000,   // délai avant le yoyo 
              repeatDelay: 3000, // delai avant la répétition 
              repeat: false // répétition infinie 
            });


                    levier_grotte = this.physics.add.staticSprite(590, 600, "img_levier_grotte"); 
                    levier_grotte.active = false; 



                              /***********************************************/
                              /** point exclamation plateformegrotte 
                              /**********************************************/

                              grass2 = this.physics.add.staticSprite(530,600, "grass");
                              pointExc_grass =  this.physics.add.staticSprite(0,0,"pointExc");
                              pointExc_grass.x = levier_grotte.x;
                              pointExc_grass.y = levier_grotte.y - levier_grotte.height-20;




/***********************************************************************/
 /** Ajout portes des niveaux + texte correspondant + levier portal
 /***********************************************************************/


  
 
        this.portal = this.physics.add.staticSprite(950, 240, "portal");   
        

                pointExc_portal_portal =  this.physics.add.staticSprite(0,0,"pointExc");
                pointExc_portal_portal.x = this.portal.x;
                pointExc_portal_portal.y = this.portal.y - this.portal.height;
                pointExc_portal_portal.visible = false;


                      levier_portal = this.physics.add.staticSprite(420, 440, "img_levier_grotte"); 
                      levier_portal.active = false; 


                                /***********************************************************************/
                                /**point exclamation levier portal
                                /***********************************************************************/
                                pointExc_portal =  this.physics.add.staticSprite(0,0,"pointExc");
                                pointExc_portal.x = levier_portal.x;
                                pointExc_portal.y = levier_portal.y - levier_portal.height*2;
                                pointExc_portal.visible = false;
 



 /****************************
    *  CREATION vague  *
    ****************************/

 groupe_vague = this.physics.add.staticGroup();
 this.vague_ref = groupe_vague.create(720,565, "wave");
 
 this.vague2 = groupe_vague.create(0,0,"wave");
 this.vague2.x = this.vague_ref.x + this.vague_ref.width;
 this.vague2.y = this.vague_ref.y;
 this.vague3 = groupe_vague.create(0,0, "wave");
 this.vague3.x = this.vague2.x + this.vague2.width;
 this.vague3.y = this.vague_ref.y;
 this.vague4 = groupe_vague.create(0,0, "wave");
 this.vague4.x = this.vague3.x + this.vague3.width;
 this.vague4.y = this.vague_ref.y;
 this.vague5 = groupe_vague.create(0,0,"wave");
 this.vague5.x = this.vague4.x + this.vague4.width;
 this.vague5.y = this.vague_ref.y;
 this.vague6 = groupe_vague.create(0,0, "wave");
 this.vague6.x = this.vague5.x + this.vague5.width;
 this.vague6.y = this.vague_ref.y;
 this.vague7 = groupe_vague.create(0,0, "wave");
 this.vague7.x = this.vague6.x + this.vague6.width;
 this.vague7.y = this.vague_ref.y;
 
groupe_vague.bouge = true;



/***********************************************************************/
 /** Ajout des points d'interet + texte correspondant
 /***********************************************************************/
//
 groupe_point = this.physics.add.staticGroup();
 point_background = groupe_point.create(480,560, "img_point");
 point_formation = groupe_point.create(600,370, "img_point");
 point_projets = groupe_point.create(610,240, "img_point");
 point_cePortoflio = groupe_point.create(75,235, "img_point");
 point_competences = groupe_point.create(480,300, "img_point");
 groupe_point.tourne= true;
 
            txt_background = this.add.text(0,0, 'Parcours', {fontSize: '20px', fill: '#fff' });
            txt_background.x = (point_background.x - point_background.width) - 20;
            txt_background.y = (point_background.y - point_background.width) ;

            txt_formation = this.add.text(0,0, 'Formation', {fontSize: '20px', fill: '#fff' });
            txt_formation.x = (point_formation.x - point_formation.width) - 20;
            txt_formation.y = (point_formation.y - point_formation.width) ;

            txt_cePortfolio = this.add.text(0,0, 'Portfolio', {fontSize: '20px', fill: '#fff' });
            txt_cePortfolio.x = (point_cePortoflio.x - point_cePortoflio.width) - 25;
            txt_cePortfolio.y = (point_cePortoflio.y - point_cePortoflio.width) ;

            txt_projets = this.add.text(0,0, 'Projets', {fontSize: '20px', fill: '#fff' });
            txt_projets.x = (point_projets.x - point_projets.width) ;
            txt_projets.y = (point_projets.y - point_projets.width) ;

            txt_competences = this.add.text(0,0, 'Compétences', {fontSize: '20px', fill: '#fff' });
            txt_competences.x = (point_competences.x - point_competences.width) -25 ;
            txt_competences.y = (point_competences.y - point_competences.width) ;

 
   /****************************
    *  CREATION DU PERSONNAGE  *
    ****************************/
 
   // On créer un nouveau personnage : player
   
   this.player = this.physics.add.sprite(100, 420, "img_perso");



   boxBienvenue = this.add.image(500,325,"boxBienvenue").setVisible(false);
   let boxBienvenuePasse=false;

   boxBienvenueTouch = this.add.image(500,325,"boxBienvenueTouch").setVisible(false);
   BtnBienvenue =  this.add.image(770,205,"BtnBienvenue").setVisible(false).setDepth(20);
   let boxBienvenueTouchPasse=false;         

   boxrappelCommandesTouch = this.add.image(500,325,"rappelCommandesTouch").setVisible(false);
   boxrappelCommandes = this.add.image(500,325,"rappelCommandes").setVisible(false);
   BtnRappel =  this.add.image(770,205,"BtnBienvenue").setVisible(false).setDepth(20);


   BtnBienvenue.setInteractive(); 
   BtnRappel.setInteractive();



   if(!IS_TOUCH){
    bienvenuTime = this.time.delayedCall(1500,
           function afficherBienvenue() {
            boxBienvenue.setVisible(true);
            BtnBienvenue.setVisible(true).setDepth(20);
            
         },
         null, this);
        }


         if(IS_TOUCH){
          bienvenueTouch = this.time.delayedCall(2000,
            function afficherBienvenue() {
             boxBienvenueTouch.setVisible(true);
             BtnBienvenue.setVisible(true).setDepth(20);
         });
        }


          BtnBienvenue.on("pointerup", () => {
          boxBienvenue.setVisible(false);
          boxBienvenuePasse=true;
          boxBienvenueTouchPasse=true;
          boxBienvenueTouch.setVisible(false);
          BtnBienvenue.setVisible(false);

              if(boxBienvenuePasse==true) 
                if (!IS_TOUCH){
           
                rappel = this.time.delayedCall(1000,
                  function afficherRappel() {
                boxrappelCommandes.setVisible(true);
                BtnRappel.setVisible(true);
               },
               null, this);
              }


              if(boxBienvenueTouchPasse==true)
                if (IS_TOUCH){
           
                rappel = this.time.delayedCall(1000,
                  function afficherRappelTouch() {
                boxrappelCommandesTouch.setVisible(true);
                BtnRappel.setVisible(true);
               },
               null, this);
              }

         });

 
         BtnRappel.on("pointerup", () => {
          boxrappelCommandes.setVisible(false);
          boxrappelCommandesTouch.setVisible(false);
          BtnRappel.setVisible(false);

         });
          
      





   //  propriétées physiques de l'objet player :
   this.player.setBounce(0.2); // on donne un petit coefficient de rebond
   this.player.setCollideWorldBounds(true); // le player se cognera contre les bords du monde
 

   /************************************************
     *  GESTION DES ANIMATIONS - créées dans preload *
   / ************************************************/
   // on crée les animations à partir des spritesheet
   // chaque animation est une succession de frame à vitesse de défilement défini
   // une animation doit avoir un nom. Quand on voudra la jouer sur un sprite, on utilisera la méthode play()
 

   if (groupe_point.tourne == true) {
     groupe_point.playAnimation("anim_point");
   }


   if (groupe_vague.bouge == true) {
    groupe_vague.playAnimation("anim_wave");
   }
   

  
    /*****************************/
     /** Ajout des fenetres popup + boutons*
     /****************************/

            this.point_background = this.add.image(500,320, "backbox_background").setDepth(30);
            this.point_background.visible = false;
            BtnBackground =  this.add.image(720,50,"BtnBienvenue").setVisible(false).setDepth(31);
            BtnBackground.setInteractive();

            BtnBackground.on("pointerup" , () => {
              this.point_background.setVisible(false);
              BtnBackground.setVisible(false);

            })
          
            this.point_formation = this.add.image(500,320, "backbox_formation").setDepth(30);
            this.point_formation.visible = false;
            BtnFormation = this.add.image(720,50,"BtnBienvenue").setVisible(false).setDepth(31);
            BtnFormation.setInteractive();

            BtnFormation.on("pointerup" , () => {
              this.point_formation.setVisible(false);
              BtnFormation.setVisible(false);

            })

            this.point_cePortoflio = this.add.image(500,320, "backbox_cePortfolio").setDepth(30);
            this.point_cePortoflio.visible = false;
            BtnPortfolio =  this.add.image(720,50,"BtnBienvenue").setVisible(false).setDepth(31);
            BtnPortfolio.setInteractive();

            BtnPortfolio.on("pointerup" , () => {
              this.point_cePortoflio.setVisible(false);
              BtnPortfolio.setVisible(false);

            })

            this.point_projets = this.add.image(500,320, "backbox_projets").setDepth(30);
            this.point_projets.visible = false;
            BtnProjets =  this.add.image(720,50,"BtnBienvenue").setVisible(false).setDepth(31);
            BtnProjets.setInteractive();

            BtnProjets.on("pointerup" , () => {
              this.point_projets.setVisible(false);
              BtnProjets.setVisible(false);

            })

            this.point_competences = this.add.image(500,320, "backbox_competences").setDepth(30);
            this.point_competences.visible = false;
            BtnCompetences =  this.add.image(720,50,"BtnBienvenue").setVisible(false).setDepth(31);
            BtnCompetences.setInteractive();

            BtnCompetences.on("pointerup" , () => {
              this.point_competences.setVisible(false);
              BtnCompetences.setVisible(false);

            })



   /*****************************************************
    *  GESTION DES INTERATIONS ENTRE  GROUPES ET ELEMENTS *
    ******************************************************/


 // ajout d'une collision entre le joueur et le calque plateformes
//  définition des tuiles de plateformes qui sont solides
 // utilisation de la propriété estSolide
 calque_plateformes.setCollisionByProperty({ estSolide: true }); 
 



 this.physics.add.collider(this.player, calque_plateformes); 
 this.physics.add.collider(this.player, plateforme_mobile);
 this.physics.add.collider(this.player, plateforme_mobile_grotte); 
 
 

 /***********************************************************************/
 /** écouteur sur bords du monde pour mort du player *
 /***********************************************************************/

 //on acvite l'écouteur sur les collisions avec le monde
 this.player.body.onWorldBounds = true; 
 
 // on met en place l'écouteur sur les bornes du monde
 this. player.body.world.on(
   "worldbounds", // evenement surveillé
   function (body, up, down, left, right) {
     // on verifie si la hitbox qui est rentrée en collision est celle du player,
     // que la collision a eu lieu sur le bord inférieur du player
     // si OK alors colore le joueur en rouge et relance la scene pour spawn le player

     if (body.gameObject === this.player && down == true) {
      
      this.player.setTint(0xff0000);
        let timerRestart = this.time.delayedCall(300, //delai avant restart de la scène
         function recommencerNiveau() {
           this.scene.restart();
         },
         null, this);
     } 
       
   },
   this
 ); 


 /***********************************************************************/
 /** création d'un objet pour dessiner(debug hitboxs) *
 /***********************************************************************/
 
 /*const debugGraphics = this.add.graphics().setAlpha(0.75);
 calque_plateformes.renderDebug(debugGraphics, {
   tileColor: null, // couleur des tuiles snas collision
   collidingTileColor: new Phaser.Display.Color(243, 134, 0, 255), // couleur des tuiles en conlision
   faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
 }); */
 
 
 }
 
 /*******************************************************************************************************************************************************************************************/
 /** FONCTION UPDATE (actualisé60xParSecondes)
 /*********************************************************************************************************************************************************************************************/
 
  update() {
   
 
   /***********************************************************************/
 /** mouvements joueur  *
 /***********************************************************************/
   
 /****************/
 /** mouvements  clavier *
 /***************/
 
   if (this.clavier.left.isDown) {
    this.goLeft();
     
        } else if (this.clavier.right.isDown) {
          this.goRight();
        
              } else {
                this.player.setVelocityX(0);
                this.player.anims.play("anim_face");
              }
            
  if (this.clavier.up.isDown && this.player.body.blocked.down)
        {
      this.goJump();
        }
      

/****************/
 /** mouvements  tactile *
 /***************/

          if (IS_TOUCH){

                  if (this.moveLeft) 
                  {
                    this.goLeft();
                  } 
                  
                    else if (this.moveRight)

                      {
                        this.goRight();

                      } else {
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
 /** activation des leviers *
 /***********************************************************************/


 /************************************/
 /** levier + point exclamation portal *
 /************************************/
      if ( this.physics.overlap(this.player, levier_portal) == true) {
        pointExc_portal.setVisible(true);
        pointExc_portal_portal.setVisible(true);
      }else{
        pointExc_portal.setVisible(false);
      }

      if (this.physics.overlap(this.player, levier_portal) == true) {
        
          levier_portal.active = true; 
          levier_portal.flipX = true; 
          this.portal.anims.play("anim_portal");

        }


                /***********************************************/
                /** levier + point exclamation plateforme roche *
                 /**********************************************/

                      if ( this.physics.overlap(this.player, grass) == true) {
                        pointExc.setVisible(true);
                      }else{
                        pointExc.setVisible(false);
                      }

                      if 
                      (this.physics.overlap(this.player, levier) == true) { 
                      if  (levier.active == false) {
                        levier.active = true; // on active le levier 
                        levier.flipX = true; // on tourne l'image du levier
                        tween_rocheQuiMonte.resume();  // on relance le tween
                      }
                    }
    

                                          /*********************************************/
                                          /** levier + point exclamation plateforme sol
                                          /********************************************/

                                              if ( this.physics.overlap(this.player, grass2) == true) {
                                                pointExc_grass.setVisible(true);
                                                  }else{
                                                    pointExc_grass.setVisible(false);
                                                  }

                                              if ( this.physics.overlap(this.player, levier_grotte) == true) {
                                                
                                                
                                                  levier_grotte.active = true;  
                                                  levier_grotte.flipX = true; 
                                                  tween_grotte.resume();  
                                                }
                                          




       /***********************************************************************/
 /** interraction avec les portes
 /***********************************************************************/
     

                      /**************/
              /** au clavier
               /********************/
                 


                  if ((this.clavier.space.isDown) === true) {
                    if (this.physics.overlap(this.player, this.portal)) this.scene.switch("next_level", {tactile : données});
                  }



                                /**************/
                            /** au tactile
                            /********************/


                            this.btn_espace.on("pointerdown", () => {
                                  if (this.physics.overlap(this.player, this.portal)) this.scene.start("next_level", {tactile : données});
                                });




     /***********************************************************************/
 /** affichage des fenetres clavier *
 /***********************************************************************/

          if((this.clavier.space.isDown) == true && 
           this.physics.overlap(this.player, point_background) == true ) {
            this.point_background.setVisible(true);
            BtnBackground.setVisible(true);
           
            
              }else if((this.clavier.space.isDown) == true && 
              this.physics.overlap(this.player, point_formation) === true ) {
                this.point_formation.setVisible(true);
                  BtnFormation.setVisible(true);
           
                  }else if((this.clavier.space.isDown) === true && 
                  this.physics.overlap(this.player, point_cePortoflio) === true ) {
                    this.point_cePortoflio.setVisible(true);
                    BtnPortfolio.setVisible(true);

                        }else if((this.clavier.space.isDown) === true && 
                        this.physics.overlap(this.player, point_projets) === true ) {
                          this.point_projets.setVisible(true);
                          BtnProjets.setVisible(true);


                                  }else if((this.clavier.space.isDown) === true && 
                                  this.physics.overlap(this.player, point_competences) === true ) {
                                    this.point_competences.setVisible(true);
                                    BtnCompetences.setVisible(true);
                                  }
  /***********************************************************************/
 /** Affichage des fenêtres tactiles
 /***********************************************************************/
if (IS_TOUCH) {
 if((this.espaceOn) === true && 
 this.physics.overlap(this.player, point_background) == true ) {
  this.point_background.visible = true;
  BtnBackground.setVisible(true);
 
  
    }else if((this.espaceOn) === true && 
    this.physics.overlap(this.player, point_formation) == true ) {
      this.point_formation.visible = true;
      BtnFormation.setVisible(true);
 
        }else if((this.espaceOn) === true && 
        this.physics.overlap(this.player, point_cePortoflio) == true ) {
          this.point_cePortoflio.visible = true;
          BtnPortfolio.setVisible(true);

              }else if((this.espaceOn) === true && 
              this.physics.overlap(this.player, point_projets) == true ) {
                this.point_projets.visible = true;
                BtnProjets.setVisible(true);

                  }else if((this.espaceOn) === true && 
                  this.physics.overlap(this.player, point_competences) == true ) {
                    this.point_competences.visible = true;
                    BtnCompetences.setVisible(true);
                      

                  }
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


 }
 
 
