'use strict';

const allHornedAnimals = [];

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
  $('#clone').attr('id', this.keyword);
  $('#clone').attr('id', this.horns);

  // Building the Dropdown Menu Selection
  $('#dropdownOptions').append('<option id="dropdown-items"></option>');
  $('#dropdown-items').text(this.keyword);
  $('#dropdown-items').find('alt').attr('alt', this.description);
  $('#dropdown-items').attr('id', this.title);
  // $('')
}

HornedAnimal.getHornedAnimalData = function() {
  $.get('data/page_1.json', 'json').then( page_1 => {
    page_1.forEach(hornedAnimal => new HornedAnimal(hornedAnimal));
    allHornedAnimals.forEach(hornedAnimal => hornedAnimal.render());
  });
};

HornedAnimal.getHornedAnimalData();

$('#dropdownOptions').change(function() {
  let $selectedItem = $(this).val();
  $('img').hide();
  $('h2').hide();
  $(`${$selectedItem}`).show();
});

$(document).ready(function() {
  $('.tab-content').hide();
});

// const testHornedAnimal = new HornedAnimal({});
// testHornedAnimal.render();
