/*eslint-env browser*/

// REWRITTEN TO TAKE ADVANTAGE OF CLOSURES
var createSlideshow = function () {
    "use strict";
    // PRIVATE VARIABLES AND FUNCTIONS
    var timer, play = true, nodes, img, speed,stopSlideShow, displayNextImage, setPlayText, setSpeedText;
    var speed = 2000;
    nodes = { image: null, caption: null };
    img = { cache: [], counter: 0 };
    
    stopSlideShow = function () {
        clearInterval(timer);
    };
    displayNextImage = function () {
        if (img.counter === img.cache.length) {
            img.counter = 0;
        } else {
            img.counter += 1;
        }
        var image = img.cache[img.counter];
        nodes.image.src = image.src;
        nodes.caption.innerHTML = image.title;
    };
    setPlayText = function (btn) {
        if (play) {
            btn.value = "Resume";
        } else {
            btn.value = "Pause";
        }
    };
    // SET SPEED TEXT
    setSpeedText = function (btn) {
        btn.value = "Speed " + speed + " ms/slide";
    };
    // PUBLIC METHODS THAT HAVE ACCESS TO PRIVATE VARIABLES AND FUNCTIONS
    return {
        loadImages: function (slides) {
            var image, i;
            for (i = 0; i < slides.length; i += 1) {
                image = new Image();
                image.src = slides[i].href;
                image.title = slides[i].title;
                img.cache.push(image);
            }
            //setSpeedText($("speed"));
            return this;
        },

        startSlideShow: function () {
            if (arguments.length === 2) {
                nodes.image = arguments[0];
                nodes.caption = arguments[1];
            }
            timer = setInterval(displayNextImage, this.getSpeed());
            return this;
        },
        createToggleHandler: function () {
            var me = this;
            // CLOSURE TO BE USED AS THE CLICK EVENT HANDLER
            return function () {
                // 'THIS' IS THE CLICKED BUTTON
                // 'ME' IS THE OBJECT LITERAL
                if (play) {
                    stopSlideShow();
                } else {
                    me.startSlideShow();
                }
                setPlayText(this);
                // TOGGLE PLAY 'FLAG'
                play = !play;
            };
        },
        // SPEED
        setSpeed: function () {
           
            var me = this;
            return function () {
                let setNewSpeed = window.prompt(" Current slide speed is " + speed + " ms." + " Set your desire speed here.");            
            
            if (setNewSpeed > 0) {
                speed = Number(setNewSpeed);
                setSpeedText(this);
                if (play) {
                    stopSlideShow();
                    
                } 
            };
            me.startSlideShow();
           
        };
                      
        },

        

        getSpeed: function () {
            return speed;
        },

        

    };
};

var $ = function (id) {
    "use strict";
    return window.document.getElementById(id);
};

// CREATE THE SLIDESHOW OBJECT
var slideshow = createSlideshow();

window.addEventListener("load", function () {
    "use strict";
    var slides = [
        {href: "images/backpack.jpg", title: "He backpacks in the Sierras often"},
        {href: "images/boat.jpg", title: "He loves his boat"},
        {href: "images/camaro.jpg", title: "He loves his Camaro more"},
        {href: "images/punk.jpg", title: "He used to be in a punk band and toured with No Doubt and Sublime"},
        {href: "images/race.jpg", title: "He's active and loves obstacle coarse racing"}
    ];
	// START THE SLIDESHOW
    slideshow.loadImages(slides).startSlideShow($("image"), $("caption"));
    // PAUSE THE SLIDESHOW
    $("play_pause").onclick = slideshow.createToggleHandler();

    // SPEED UP & DOWN SLIDESHOW
    $("speed").onclick = slideshow.setSpeed();
});