
/***********************************************************************/
/** VARIABLES GLOBALES
 /***********************************************************************/
 

let loaded;

let clavier; 
 let player; 
 let commandes;
        let btn_droit;
        let btn_gauche;
        let btn_haut;
        let btn_espace;

let moveRight;
let moveLeft;
let moveJump;
let espaceOn;
       
let portal;

export default class preload_page extends Phaser.Scene {
    // constructeur de la classe
    constructor() {
      super({
        key: "preload_page" 
      });
    }




preload() {

    
    
    let progressBar = this.add.graphics();
    let progressBox = this.add.graphics();
    progressBox.fillStyle(0xffffff, 0.2);
    progressBox.fillRect(330, 290, 320, 50);

    let width = this.cameras.main.width;
    let height = this.cameras.main.height;
    let loadingText = this.make.text({
    x: width / 2 - 15,
    y: height / 2 - 50,
    text: 'Chargement...',
    style: {
        font: '20px monospace',
        fill: '#55b4ff'
    }
});
loadingText.setOrigin(0.5, 0.5);

let percentText = this.make.text({
    x: width / 2 -15,
    y: height / 2 - 10,
    text: '0%',
    style: {
        font: '18px monospace',
        fill: '#55b4ff'
    }
});
percentText.setOrigin(0.5, 0.5);


let assetText = this.make.text({
    x: width / 2,
    y: height / 2 + 50,
    text: '',
    style: {
        font: '18px monospace',
        fill: '#55b4ff'
    }
});
assetText.setOrigin(0.5, 0.5);






    this.load.on('progress', function (value) {
        console.log(value);
        percentText.setText(parseInt(value * 100) + '%');
        progressBar.clear();
        progressBar.fillStyle(0xffffff, 1);
        progressBar.fillRect(340, 300, 300 * value, 30);
    });


                
    this.load.on('fileprogress', function (file) {
        console.log(file.src);
        assetText.setText('Loading asset: ' + file.src);
    });





    




//menu
    this.load.image("fond_menu", "/src/assets/fond_menu.png");
    this.load.image("imageLogo", "/src/assets/logo.png");
    this.load.image("imageBoutonPlay", "/src/assets/jouerBtn.png");
    this.load.image("imageCommandes", "src/assets/commandes.png");
    this.load.image("gouteSolo", "/src/assets/gouteSolo.png");




//extra ressources pour esthétique 
this.load.image("image", "/src/assets/image.png");
    for (var i = 0; i < 500; i++) {
        this.load.image("image"+i, "/src/assets/image.png");
    }



//main_scene
     
    // chargement tuiles de jeu
    this.load.image("Phaser_portofolio", "/src/assets/tuilesJeu.png");
  
    // chargement de la carte
    this.load.tilemapTiledJSON("carte", "/src/assets/map2.json");
    
    this.load.image("ressource", "/src/assets/ressource.png");
    for (var i = 0; i < 500; i++) {
        this.load.image("ressource"+i, "/src/assets/ressource.png");
    }


    //chargement des plateformes movibles
    this.load.image("plateforme_roche", "/src/assets/plat_roche.png");
    this.load.image("plateforme_grotte", "/src/assets/pilier.png");
    
   
    //chargement du spritesheet point
    this.load.spritesheet("img_point", "/src/assets/img_point.png", {
       frameWidth: 32,
       frameHeight: 32
     });
   



//extra ressources pour esthétique 
     this.load.image("grass", "/src/assets/grass.png");
    for (var i = 0; i < 500; i++) {
        this.load.image("grass"+i, "/src/assets/grass.png");
    }




   
     // cgargement images popup
     this.load.image("backbox_background", "/src/assets/boxBackground.png");
     this.load.image("backbox_formation", "/src/assets/boxFormation.png");
     this.load.image("backbox_projets", "/src/assets/boxProjets.png");
     this.load.image("backbox_cePortfolio", "/src/assets/boxThisWT.png");
     this.load.image("backbox_competences", "/src/assets/boxCompetences.png");
    
    this.load.image("boxBienvenue", "/src/assets/bienvenue.png");
    this.load.image("rappelCommandes", "/src/assets/rappelCommandes.png");
    this.load.image("rappelCommandesTouch", "/src/assets/rappelCommandesTouch.png");
    this.load.image("boxBienvenueTouch", "/src/assets/bienvenueTouch.png");
    this.load.image("BtnBienvenue", "/src/assets/btnBienvenue.png");

//extra ressources pour esthétique 
     this.load.image("image", "/src/assets/image.png");
    for (var i = 0; i < 500; i++) {
        this.load.image("image"+i, "/src/assets/image.png");
    }



    // chargement des leviers
    this.load.image("img_levier", "/src/assets/levier_champBig.png");
    this.load.image("img_levier_grotte", "/src/assets/levier_champSmall.png");
    
    // chargement du personnage
      this.load.spritesheet("img_perso", "/src/assets/goute.png", {
        frameWidth: 32,
        frameHeight: 26
      });
   
      //chargement des portes
      this.load.image("img_porte_menu", "/src/assets/menu_door.png");
      this.load.spritesheet("portal","/src/assets/portal.png", {
       frameWidth: 32,
       frameHeight: 32
      });
   
      this.load.spritesheet("wave", "/src/assets/wave.png", {
        frameWidth: 32,
        frameHeight: 32
      });
   
      //chargement points excalamation + activateur 
      this.load.image("pointExc", "/src/assets/pointExc.png");
      
      



     
      //extra ressources pour esthétique 
      for (var i = 0; i < 500; i++) {
          this.load.image("ressource"+i, "/src/assets/ressource.png");
      }
      
      

      this.load.image("btn_fleche_gauche", "/src/assets/fleche_gauche.png");
     this.load.image("btn_fleche_droite", "/src/assets/fleche_droite.png");
     this.load.image("btn_fleche_haut", "/src/assets/fleche_haut.png");
     this.load.image("btn_espace", "/src/assets/espace.png");



//next_level




// next_level
  // chargement du tilemap propre à la scene
  // tuiles de jeu sont déja chargées dans main_scene
  this.load.tilemapTiledJSON("carte_next_level", "/src/assets/next_level.json");
  
  //chargement image pour lien
  this.load.image("lien", "/src/assets/cv_mini.png");
  this.load.image("contact", "/src/assets/contactez.png");


  //chargement images "wanted"
  this.load.image("wantedMissions", "/src/assets/wantedMissions.png");
  this.load.image("wanted", "/src/assets/wantedStage.png");
  this.load.image("boxCliquables", "/src/assets/boxCliquables.png");



  let loadedText = this.make.text({
    x: width / 2 - 10,
    y: height / 2 - 50,
    text: 'Chargement terminé !',
    style: {
        font: '20px monospace',
        fill: '#55b4ff'
    },
});
loadedText.setOrigin(0.5, 0.5);
loadedText.setVisible(false);




  loaded = false;

    this.load.on('complete', function () {
        console.log('complete');
       
        loadingText.destroy();
        loadedText.setVisible(true);
       

        loaded = true;
         
    });

  

}
     
 
     
    
   








create(){



//animations
this.anims.create({
    key: "anim_face",
    frames: [{ key: "img_perso", frame: 4 }],
    frameRate: 20
  });

  this.anims.create({
   key: "anim_tourne_gauche", // key est le nom de l'animation : doit etre unique pour la scene.
   frames: this.anims.generateFrameNumbers("img_perso", { start: 0, end: 3 }), // on prend toutes les frames de img perso numerotées de 0 à 3
   frameRate: 10, // vitesse de défilement des frames
   repeat: -1 // nombre de répétitions de l'animation. -1 = infini
 });

 
  this.anims.create({
    key: "anim_tourne_droite",
    frames: this.anims.generateFrameNumbers("img_perso", { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });

  
  this.anims.create({
    key: "anim_point",
    frames: this.anims.generateFrameNumbers("img_point", { start: 0, end: 8 }),
    frameRate: 8,
    repeat: -1
  });

  this.anims.create({
    key: "anim_portal",
    frames: this.anims.generateFrameNames("portal", {start: 0, end:16 }),
    frameRate:10,
    repeat: -1
   });


this.anims.create({
    key:"anim_wave",
    frames: this.anims.generateFrameNumbers("wave", {start:0, end:8}),
    frameRate: 2,
    repeat: -1
});



   









    if(loaded == true){
        
        let timerRestart1 = this.time.delayedCall(800,
        function lancerJeu(){
            this.Isloaded();
        },
    null,this);
        }

  


}








Isloaded(){
    this.scene.start("menu");
};

}





