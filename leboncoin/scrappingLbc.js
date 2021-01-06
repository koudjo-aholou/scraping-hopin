(function () {
  function selecteurVoirNumero() {
   const boutonVoirNumero = document.querySelector(
     "[data-qa-id='adview_button_phone_contact']",
   );
   if (boutonVoirNumero) {
     return clickSurBoutonVoirTel(boutonVoirNumero);
   }
   return null;
 }
 function selecteurVoirPlusDesc(){
   const boutonVoirPlus = document.querySelector(
    "[data-qa-id='adview_description_container'] button",
  );
  if (boutonVoirPlus) {
    return clickSurBoutonVoirTel(boutonVoirPlus);
  }
  return null
 }

 function clickSurBoutonVoirTel(selector) {
   function simulateClick(elem) {
     // Create our event (with options)
     const evt = new MouseEvent('click', {
       bubbles: true,
       cancelable: true,
       view: window,
     });
     // If cancelled, don't dispatch our event
     const canceled = !elem.dispatchEvent(evt);
   }
   simulateClick(selector);
 }

 function mergeDataAnnonceScrapperEtListe(object, tableau, index) {
   const tableauMaj = [...tableau];
   tableauMaj[index] = object;
   return tableauMaj;
 }
 

<!-- Annonces --------------->;

 function scrappingCriteresAnnonce() {
     const result = document
         .querySelector("[data-qa-id='criteria_container']")
         .innerText.split('\n')
         .join('');
     return result;
 }

 function getValueOfNull(obj, prop) {
     return obj == null ? undefined : obj[prop];
 }

 function formatageCriteresAnnonce(criteresRaw) {
     const regexTypeVente = '(?<=Type de vente)(.*)(?=Type de bien)';
     const regexType = '(?<=Type de bien)(.*)(?=Surface)';
     const regexSurface = '(?<=Surface)(.*)(?=m²)';
     const regexPiece = '(?<=Pièces)(.*)(?=Classe énergie)';
     const regexId = '(?<=Référence)(.*)(?=$)';
     const criteresAnnonce = {
         typeDeVente: getValueOfNull(criteresRaw.match(regexTypeVente), [0]),
         typeDeBien: getValueOfNull(criteresRaw.match(regexType), [0]),
         nbPieces: getValueOfNull(criteresRaw.match(regexPiece), [0]),
         surface: getValueOfNull(criteresRaw.match(regexSurface), [0]),
         id: getValueOfNull(criteresRaw.match(regexId), [0]),
     };
     return criteresAnnonce;
 }

 function scrappingDateAnnonce() {
     const dateString = document.querySelector("[data-qa-id='adview_date']")
         .innerText;
     return dateString;
 }

 function scrappingDescriptionAnnonce() {
     const description = document.querySelector('span._1fFkI').innerText;
     return description;
 }

 function scrappingImagesAnnonce() {
     let images = [];
     const imagesNode = document.querySelectorAll('img._1cnjm');
     imagesNode.forEach((img) => images.push({url:img.src}));
     images = Array.from(new Set(images));
     return images;
 }

 function filtrerImageUrl(data) {
     const imagesArray = data.flatMap((img) => (img.url.includes('ad-large') || img.url.includes('ad-image') ? img : [] ));
     return imagesArray;
 }

 function scrappingNomVendeurParticulier() {
     let nomVendeurParticulier = document.querySelector('div.styles_name__3U6lU');
     nomVendeurParticulier = getValueOfNull(nomVendeurParticulier, 'innerText');
     return nomVendeurParticulier;
 }

 function scrappingNomVendeurProfessionnel() {
     let nomVendeurPro = document.querySelector('[data-qa-id=storebox_title]');
     nomVendeurPro = getValueOfNull(nomVendeurPro, 'innerText');
     if (nomVendeurPro === undefined) {
        // let nomContact = document.querySelector('[data-qa-id=adview_contact_container] div div h1');
         let nomContact = document.querySelector('[data-qa-id=adview_contact_container] div:nth-child(2)');
         nomContact = getValueOfNull(nomContact, 'innerText');
         nomContact = nomContact.split('\n')[0];
         return nomContact;
     }
     return nomVendeurPro;
 }

 function scrappingUrlBoutiqueVendeur() {
    // let urlBoutiqueVendeur = document.querySelector('div.styles_header__1hEVe a');
     let urlBoutiqueVendeur =  document.querySelector('[data-qa-id=adview_contact_container] div:nth-child(2) a')
     urlBoutiqueVendeur = getValueOfNull(urlBoutiqueVendeur, 'href');
     return urlBoutiqueVendeur;
 }

 function scrappingNumeroTelAnnonce() {
     let numeroTel = document.querySelector(
         "[data-qa-id='adview_number_phone_contact']",
     );
     numeroTel = getValueOfNull(numeroTel, 'innerText');
     return numeroTel;
 }
 function scrappingPrixAnnonce(){
  let prix = document.querySelector("[data-qa-id='adview_price']");
  prix = getValueOfNull(prix, 'textContent');
  return prix;
}
 function scrappingTitreAnnonce(){
  let titre = document.querySelector("h1[data-qa-id='adview_title']");
  titre = getValueOfNull(titre, 'textContent');
  return titre;
}
  function scrappingLocalisation(){
    let localisation = document.querySelectorAll('div h2 span')[1];
    !localisation ? localisation = document.querySelector(
      "div:nth-of-type(6) h2"
    ) : '';
    localisation = getValueOfNull(localisation, 'textContent');
    return localisation;
  }
selecteurVoirNumero();
selecteurVoirPlusDesc();

const prix = scrappingPrixAnnonce();
const titre = scrappingTitreAnnonce();
const url = window.location.href;
const criteresDataRaw = scrappingCriteresAnnonce();
const criteresAnnonce = formatageCriteresAnnonce(criteresDataRaw);
const {id, typeDeVente, typeDeBien, surface, nbPieces} = criteresAnnonce;
const dateAnnonce = scrappingDateAnnonce();
const descriptionAnnonce = scrappingDescriptionAnnonce();
let imagesAnnonce = scrappingImagesAnnonce();
imagesAnnonce = filtrerImageUrl(imagesAnnonce);
const nomVendeurParticulierAnnonce = scrappingNomVendeurParticulier();
const nomVendeurProfessionnelAnnonce = scrappingNomVendeurProfessionnel();
const urlBoutiqueVendeurAnnonce = scrappingUrlBoutiqueVendeur();
const localisationAnnonce = scrappingLocalisation();

const numeroTelAnnonce = scrappingNumeroTelAnnonce();
const result = {
    prix,
    titre,
    url,
    typeDeBien,
    nbPieces,
    surface,
    id,
    dateAnnonce,
    descriptionAnnonce,
    nomVendeurParticulierAnnonce,
    nomVendeurProfessionnelAnnonce,
    urlBoutiqueVendeurAnnonce,
    numeroTelAnnonce,
    vacanceLocMois: 1,
    pourcentageNotaire: 8,
    prixAssuranceLogement: 20,
    txChargeRecuperable: 0.6,
    nbAnne: 25,
    tauxInteretAnnuel : 1.5,
    negociation: 1,
    localisationAnnonce,
    images: imagesAnnonce,
    statusPriseDeContact: 'New'
};

function createPayloadEntr(args){
    const payloadEntr = {
      fields:{
        ...args
      }
    }
    saveData(payloadEntr)
}


 function saveData(data){
  fetch("https://api.airtable.com/v0/app6EThUKez5PsR8U/biens_immo_toulouse", {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer key7QN2byGjIgVNR5'
  },
  body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  }

 createPayloadEntr(result)
})();