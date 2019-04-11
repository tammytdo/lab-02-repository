'use strict';

const allHornedAnimals = [];
const hornedAnimalKeywordArray = [];

function HornedAnimal(hornedAnimal) {
  this.image_url = hornedAnimal.image_url;
  this.title = hornedAnimal.title;
  this.description = hornedAnimal.description;
  this.keyword = hornedAnimal.keyword;
  this.horns = hornedAnimal.horns;
  allHornedAnimals.push(this);
}

HornedAnimal.prototype.render = function() {
  const hornedAnimalSectionHTML = $('#hornedAnimal-template').html();

  $('main').append('<section id="clone"></section>');
  $('#clone').html(hornedAnimalSectionHTML);

  $('#clone').find('h2').text(this.title);
  $('#clone').find('img').attr('src', this.image_url);
  $('#clone').find('alt').attr('alt', this.description);
  $('#clone').attr('class', this.keyword);
  $('#clone').attr('id', this.title);

  hornedAnimalKeywordArray.push(this.keyword);


}
  // Building the Dropdown Menu Selection. W/ a set.

function addKeywordToDropdown(arr) {
  let uniqArr = new Set(arr);
  uniqArr.forEach(element => {
    $('#dropdownOptions').append('<option id="dropdown-items"></option>');
    $('#dropdown-items').text(element);
    $('#dropdown-items').attr('id', element);
  });
};


HornedAnimal.getHornedAnimalData = function() {
  $.get('data/page_1.json', 'json').then( page_1 => {
    page_1.forEach(hornedAnimal => new HornedAnimal(hornedAnimal));
    allHornedAnimals.forEach(hornedAnimal => hornedAnimal.render());
    addKeywordToDropdown(hornedAnimalKeywordArray);
  });
};

HornedAnimal.getHornedAnimalData();

$('#dropdownOptions').change(function() {
  let $selectedItem = $(this).val();
  $('section').hide();

  $(`.${$selectedItem}`).show();

  //Remove unique values
  // let uniqueAnimals = new Set(this.keyword);
  //console.log('my' , uniqueAnimals);

// Example: 
// let array_withDups = [1,2,2,3,3,3,4]
// let set2 = new Set(array_withDups)
});

$(document).ready(function() {
  $('.tab-content').hide();
});

// const testHornedAnimal = new HornedAnimal({});
// testHornedAnimal.render();
