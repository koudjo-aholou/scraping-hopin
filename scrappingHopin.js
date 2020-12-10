
// Scrapping Hoping

// Scrapping the name and the job 
// /!\ You have to be on "People" not "Polls" or "Chat"
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
// Enjoy 

 /* Tips In Gsheet
 	Data > Split Text to columns
    Custom separator > ,
    Voilà ;)
 */


 // If you don't want to click on the button load more

 //STEP 1 : GET THE FULL LIST
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

//STEP 2 : Copy paste when you have all the list or a bug Hopin can lag
clearInterval(clickAuto);


// STEP 3 : SCRAP THE LIST
const scrapNameJob = document.querySelectorAll('.attendee-list-item_user-details__-i7aF');

const data = []; 
for(let i=0; i< scrapNameJob.length; i+=1){
  	const jobNameRaw = scrapNameJob[i].innerText; // "Koudjo\nA. @ Alumni Lion"
    const jobNameUpdate = jobNameRaw.replace(/\n|@/g,','); // "Koudjo,A. , Alumni Lion"
	data.push(jobNameUpdate); 
};
copy(data); // copy all the data in your clipboard

