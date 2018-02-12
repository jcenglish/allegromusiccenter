
// FIX: CSS FAILOVER IF JAVASCRIPT IS DISABLED... use <noscript> tag in <head> 
// with .no-script displaying nav with CSS
$(document).ready(function () {
    $(window).on("resize", function () {
        closeNav();
        checkSmall();
        moveSearch();
    });
    moveSearch();
    toggleSubNav();
    toggleNav();
});

// CACHED SELECTORS_____________________________________________________________
var $nav = $("#nav-primary");
var $level1 = $("#nav-level-1");
var $level2 = $level1.find(".nav-level-2");
var $level3 = $nav.find(".nav-level-3");
var $overlaySm = $("#overlay-small");
var $overlayLg = $("#overlay-large");
var $navOpen = $("#nav-open");
var $navClose = $("#nav-close");
var $hasNavSub = $level1.find(".has-nav-sub");
var $navSubPip = $level1.find(".icon-triangle-up");
var $navSub = $level1.find(".nav-sub");
var $headerSearch = $("header").find(".search");
var $navEcomm = $("#nav-ecomm");
var $navBack = $("#nav-back");

//// VARIABLES____________________________________________________________________
//var breakpoint = 1001;
var small;

function checkSmall() {
    //var width = window.innerWidth;
    //return width < breakpoint;
    if ($navOpen.is(":visible")) {
        small = 1;
    }
    else {
        small = 0;
    }
}

function isSmall() {
    checkSmall();
    return small;
}

function moveSearch() {
    if (isSmall()) {
        $headerSearch.insertAfter($navEcomm);
    }
    else {
        $headerSearch.insertBefore($navEcomm);
    }
}

function toggleNav() {
    $navOpen.add($navClose).add($overlaySm).add($navBack).on("click", function () {

        $this = $(this);
        if ($this.is($navBack)) {
            //close 3rd and 2nd lvl sub navs
            $level1.add($level2).add($level1.children(".nav-item")).removeClass("display-none");
            $level2.add($level3).removeClass("display-block");
            $level1.find(".has-nav-sub").removeClass("inverted-colors");
            $level1.addClass("display-block");
            $level1.find(".icon-chevron-right").css({opacity: 1});
            $level1.find(".icon-chevron-down").css({opacity: 0});
        }
        if ($this.is($navOpen)) {
            $nav.animate({left: "0"}, 300);
            $overlaySm.show();
        }
        if ($this.is($navClose) || $this.is($overlaySm)) {
            $nav.animate({left: "-300"}, 300);
            $overlaySm.hide();
        }
    });
}

function toggleSubNav() {
    $hasNavSub.add($overlayLg).on("click", function () {
        $this = $(this);

        if ($this.is($overlayLg)) {
            closeNav();
            $overlayLg.hide();
        }

        else {
            // Show subnav if not visible
            if (!$this.next().hasClass("visible") && !$this.next().hasClass("display-block")) {
                //If toggling level 2
                if ($this.next().hasClass("nav-level-2")) {
                    if (isSmall()) {
                        $this.next().addClass("display-block");
                        //hide other subnavs
                        $this.parent().siblings().children(".nav-sub").removeClass("display-block");
                        $this.parent().siblings().find(".nav-level-3").removeClass("display-block");

                        if ($this.next().find(".nav-level-3").length > 0) {
                            $this.addClass("inverted-colors");
                            $this.children(".icon-chevron-right").css({opacity: 0});
                            //hide siblings
                            $this.parent().siblings().removeClass("display-block").addClass("display-none");
                        }

                        toggleChevron();
                    }

                    if (!isSmall()) {
                        $this.find(".icon-triangle-up").addClass("visible");
                        $this.next().offset({left: 0});
                        $this.next().addClass("visible");
                        $this.parent().siblings().find(".icon-triangle-up").removeClass("visible");
                        $this.parent().siblings().children().removeClass("visible");
                        $overlayLg.show();

                        if ($this.next().find(".nav-level-3").length === 0) {
                            $level3.removeClass("visible");
                        }
                    }
                }

                //if toggling level 3
                if ($this.next().hasClass("nav-level-3")) {
                    if (!isSmall()) {
                        // position this nibling same x-coord
                        var $pos = $this.offset();
                        $this.next().children().offset({left: $pos.left});
                        $this.next().addClass("visible");
                        //hide other subnavs
                        $this.parent().siblings().children(".nav-sub").removeClass("visible");
                        $this.parent().siblings().find(".nav-level-3").removeClass("visible");
                    }
                    if (isSmall()) {
                        $this.next().addClass("display-block");
                        //hide other subnavs
                        $this.parent().siblings().children(".nav-sub").removeClass("display-block");
                        $this.parent().siblings().find(".nav-level-3").removeClass("display-block");
                        //reset other subnavs chevrons
                        $this.parent().siblings().find(".icon-chevron-right").css({opacity: 1});
                        $this.parent().siblings().find(".icon-chevron-down").css({opacity: 0});
                        toggleChevron();
                    }

                }

            }
            // Else, hide it
            else {
                if ($this.next().hasClass("nav-level-2")) {
                    if (!isSmall()) {
                        $navSubPip.removeClass("visible");
                        $this.next().find(".nav-sub").removeClass("visible");
                        $level3.removeClass("visible");
                    }
                    if (isSmall()) {
                        $this.next().find(".nav-sub").removeClass("display-block");
                        $this.parent().siblings().addClass("display-block");
                        $overlayLg.hide();
                    }
                }
                if ($this.next().hasClass("nav-sub")) {
                    if (!isSmall()) {
                        $this.next().removeClass("visible");
                        $overlayLg.hide();
                    }
                    if (isSmall()) {
                        $this.next().removeClass("display-block");
                        $this.removeClass("inverted-colors");
                        $this.parent().siblings().removeClass("display-none");
                        $this.children(".icon-chevron-right").css({opacity: 1});
                        $this.children(".icon-chevron-down").css({opacity: 0});
                    }
                }
            }
        }
    });
}

function initNav() {
    $overlayLg.add($overlaySm).hide();
    if (isSmall()) {
        //reset nav to initial state
        $level1.add($level2).add($level1.children(".nav-item")).removeClass("display-none");
        $level1.find(".has-nav-sub").removeClass("inverted-colors");
        $level1.addClass("display-block");
        $level1.find(".icon-chevron-right").css({opacity: 1});
        $level1.find(".icon-chevron-down").css({opacity: 0});

        //remove large media query classes
        $level1.add($level2).add($level3).removeClass("visible hidden");
    }
    else {
        //reset nav to initial state
        $level1.add($level2).add($level3).removeClass("hidden visible");
        $level1.addClass("visible");

        //Remove small media query classes
        $level1.add($level2).add($level1.children(".nav-item")).add($level3).removeClass("display-none display-block");
        $level1.find(".has-nav-sub").removeClass("inverted-colors");
    }
}

function closeNav() {
    initNav();
    if (!isSmall()) {
        $level2.add($level3).add($navSubPip).removeClass("visible");
        $overlayLg.hide();
    }
    if (isSmall()) {
        $level2.add($level3).removeClass("display-block");
        $overlaySm.hide();
        $nav.css({left: "-300px"});
    }

}

function toggleChevron() {
    if ($this.next().hasClass("nav-level-3") || $this.next().find(".nav-level-3").length === 0) {
        $this.find(".icon-chevron-right").animate({opacity: 0}, "fast", function () {
            $this.find(".icon-chevron-down").animate({opacity: 1}, "fast");
        });
    }
}

//------------------------------------------------------------------------------

jQuery.fn.visible = function () {
    return this.css('visibility', 'visible');
};

jQuery.fn.invisible = function () {
    return this.css('visibility', 'hidden');
};

jQuery.fn.visibilityToggle = function () {
    return this.css('visibility', function (i, visibility) {
        return (visibility === 'visible') ? 'hidden' : 'visible';
    });
};
