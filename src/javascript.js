// All written by Caedan — involved lots of research, much trial and error, and great loss of hair, but no 'copying and pasting' :)

// ================================
// ================================
// GENERAL FUNCTIONS
// ================================
// ================================

//  Function that returns an array of classes by passing a class name
function getClassList(classKey) {
	return document.getElementsByClassName(classKey);
}

// Returns the user to the top of the page
function scrollToTop() {
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	});
}

// Scrolls to a particular section based on an elements ID (to be passed into function)
function scrollToSection(elementID) {
	document.getElementById(elementID).scrollIntoView({
		behavior: 'smooth'
	});
}

// List of functions to be run on each scroll
function scrollRoutine() {
	parallaxRoutine()
	toggleTopButtonVisibility();
}

// ================================
// 'Back to top' button visiblity
// ================================

// Determines — based on scroll distance down page — whether or not the 'back to top' button should be visible and adjusts it accordingly
// Classes are used so as to allow for a transition (may remove in favor of some vanilla JS to handle the transitions in the future)
// TODO need to split into two functions, one to assign the class, and the other to detect which class should be applied
function toggleTopButtonVisibility() {
	if (window.scrollY > window.innerHeight / 2) {
		backToTopButton.classList.add("show");
		backToTopButton.classList.remove("hide");
	} else {
		backToTopButton.classList.remove("show");
		backToTopButton.classList.add("hide");
	}
}

// ================================
// Parallax functions
// ================================

//  A routine that runs to update all elements of class 'parallax' with their new background image positions based on how far down the page the user has scrolled
function parallaxRoutine() {
	// console.log(ParallaxList);
	// only runs at certain width — primarily because my parallax function in it's current iteration doesn't look great on tall skinny display sizes :p
	for (element of ParallaxList) {
		if (window.innerWidth > 1200) {
			parallaxAdjust(element, 3);
		} else {
			element.style.backgroundPosition = 'center';
		}
	}
}

// Determines the appropriate background position based on the target element, rate, and the user's scroll position on the page
function parallaxAdjust(element, rate) {
	const givenPosition = element.getBoundingClientRect().y / rate;
	element.style.backgroundPositionY = (`${givenPosition}px`);
}

// Fakes a 'fixed' background to overcome iOS not doing background-attachment: fixed correctly
function backgroundPsuedoFixed(element) {
	element.style.backgroundPositionY = window.scrollY;
}

// ================================
// ON PAGE LOAD BELOW
// ================================

// Sets the button with the ID 'topButton' to a variable for use later
const backToTopButton = document.getElementById('topButton');

//  Makes a list of all elements that are of class 'parallax'
//  used to perform background image adjustments to create the parallax effect
const ParallaxList = getClassList('parallax');

// runs the parallax routine initially because the initial background image position is 'no offset', failure to run this function at least once on page load means that the images will appear to 'jump' to their 'parallax' positions the moment the user scrolls
parallaxRoutine();

// Event Listener that triggers the scrollRoutine function every time the user scrolls
window.addEventListener("scroll", scrollRoutine);

// backToTopButton.addEventListener("mouseenter", (e) => console.log("enter" + e.clientX));

// const card3d = document.getElementById('card3d');

// function getInnerCoords(element, x, y) {
// 	console.log(element);
// 	console.log("x" + x + "y" + y);
// 	console.log("offsetleft: " + element.offsetLeft);
// 	console.log("offsettop: " + element.offsettop);
// 	console.log("scroll: " + window.scrollY);
// 	console.log("clientHeight: "+ element.clientHeight);
// 	console.log("get inner is working");
// }

// card3d.addEventListener("mouseenter", (e) => {
// 	const targetID = e.explicitOriginalTarget;
// 	targetID.addEventListener("mousemove", (e) =>{
// 		console.log(e);
// 		getInnerCoords(targetID, e.clientX, e.clientY);
// 	});
// 	// console.log(e.explicitOriginalTarget);
// 	// card3d.style.color = "red";
// 	// card3d.style.transform = "scale(1.05) rotate3d(1, 1, 0, 20deg)";
// 	// console.log(getInnerCoords(e));
// });

// card3d.addEventListener("mouseleave", (e) => {
// 	card3d.style.transform = null;
// 	card3d.style.color = "black";

// });