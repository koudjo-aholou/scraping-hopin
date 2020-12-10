
// Scrapping Hoping

// Scrapping the name and the job 
// /!\ You have to be on "People" not "Polls" or "Chat"

// Open the console on 
  // firefox Ctrl + Maj + K ( Cmd + Option + K sous OS X)
  // Chrome Command+Option+J (Mac) or Control+Shift+J (Windows, Linux, Chrome OS)

//COPY PASTE START
(function(){
  const scrapNameJob = document.querySelectorAll('.attendee-list-item_user-details__-i7aF');

  const data = []; 
  for(let i=0; i< scrapNameJob.length; i+=1){
      const jobNameRaw = scrapNameJob[i].innerText; // "Koudjo\nA. @ Alumni Lion"
      const jobNameUpdate = jobNameRaw.replace(/\n|@/g,','); // "Koudjo,A. , Alumni Lion"
    data.push(jobNameUpdate); 
  };
  copy(data); // copy all the data in your clipboard
})();
// COPY PASTE END

// Enjoy 

 /* Tips In Gsheet
 	Data > Split Text to columns
    Custom separator > ,
    Voilà ;)
 */

// --------------SCRIPT 2-------------------------------
 // If you don't want to click on the button load more

 //STEP 1 COPY PASTE : GET THE FULL LIST
 function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}
const clickAuto = setInterval(function(){
  eventFire(document.querySelector('.button_button-unstyled__2sZU2.people-list_load-more__2dx_z'), 'click');
}, 3000);

//STEP 2  COPY PASTE: Copy paste when you have all the list or a bug Hopin can lag
clearInterval(clickAuto);


// STEP 3 COPY PASTE : SCRAP THE LIST
const scrapNameJob = document.querySelectorAll('.attendee-list-item_user-details__-i7aF');

const data = []; 
for(let i=0; i< scrapNameJob.length; i+=1){
  	const jobNameRaw = scrapNameJob[i].innerText; // "Koudjo\nA. @ Alumni Lion"
    const jobNameUpdate = jobNameRaw.replace(/\n|@/g,','); // "Koudjo,A. , Alumni Lion"
	data.push(jobNameUpdate); 
};
copy(data); // copy all the data in your clipboard

